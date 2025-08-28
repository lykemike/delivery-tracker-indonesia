import { NextResponse } from "next/server";

interface Province {
  id: string;
  name: string;
}

interface Regency {
  id: string;
  province_id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
  province: string;
  postalCode: string;
  provinceId: string;
}

export async function GET() {
  try {
    // fetch all provinces
    const provinces: Province[] = await fetch(
      "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json"
    ).then((res) => res.json());

    const allCities: City[] = [];

    // fetch all regencies/cities under each province
    for (const prov of provinces) {
      const regencies: Regency[] = await fetch(
        `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${prov.id}.json`
      ).then((res) => res.json());

      regencies.forEach((r) => {
        const cleanName = r.name.replace(/^KABUPATEN |^KOTA /, "");
        const postalCodePrefix = r.id.slice(0, 2);

        allCities.push({
          id: r.id,
          name: cleanName,
          province: prov.name,
          postalCode: `${postalCodePrefix}xxx`,
          provinceId: prov.id,
        });
      });
    }

    return NextResponse.json(allCities, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cities", details: String(error) },
      { status: 500 }
    );
  }
}

"use client";

import React, { useState } from "react";
import { MapPin, Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CITIES_DATA from "@/data/cities.json";

interface City {
  id: string;
  name: string;
  province: string;
  provinceId: string;
  postalCode: string;
  isCapital: boolean;
  type: string;
}

interface CitySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onValueChange,
  placeholder,
  disabled = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);

  const selectedCity = CITIES_DATA.find((city) => city.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            {selectedCity ? (
              <div className="flex items-center space-x-2">
                <span>{selectedCity.name}</span>
                <span className="text-xs text-gray-500">
                  ({selectedCity.province})
                </span>
              </div>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command
          filter={(value, search) => {
            const city = CITIES_DATA.find((c) => c.id === value);
            if (!city) return 0;

            const searchLower = search.toLowerCase();
            const nameMatch = city.name.toLowerCase().includes(searchLower);
            const provinceMatch = city.province
              .toLowerCase()
              .includes(searchLower);

            return nameMatch || provinceMatch ? 1 : 0;
          }}
        >
          <CommandInput placeholder="Search cities..." />
          <CommandEmpty>No cities found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {CITIES_DATA.map((city) => (
              <CommandItem
                key={city.id}
                value={city.id}
                keywords={[
                  city.name.toLowerCase(),
                  city.province.toLowerCase(),
                ]}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{city.name}</span>
                  <span className="text-xs text-gray-500">
                    ({city.province})
                  </span>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === city.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CitySelect;
export type { City, CitySelectProps };

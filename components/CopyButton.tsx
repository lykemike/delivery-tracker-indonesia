"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

type CopyButtonProps = {
  text: string;
  onCopy?: (success: boolean) => void; // ✅ add this
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  "aria-label"?: string;
};

export default function CopyButton({
  text,
  onCopy, // ✅ receive it
  className,
  variant = "ghost",
  size = "icon",
  ...rest
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function copyText(): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("execCommand failed");
      }
      return true;
    } catch {
      return false;
    }
  }

  const handleClick = async () => {
    const ok = await copyText();
    setCopied(ok);
    onCopy?.(ok); // ✅ call parent callback
    if (ok) {
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 1200);
    } else {
      toast.error("Failed to copy");
    }
  };

  const buttonEl = (
    <Button
      type="button"
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
      {...rest}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">{rest["aria-label"] ?? "Copy"}</span>
    </Button>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{buttonEl}</TooltipTrigger>
        <TooltipContent side="top">Copy AWB</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

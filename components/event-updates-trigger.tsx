"use client";

import { Button } from "@/components/ui/button";
import { EVENT_UPDATES_MODAL_EVENT } from "@/lib/event-updates/constants";

export function EventUpdatesTrigger() {
  return (
    <Button
      type="button"
      size="sm"
      onClick={() => window.dispatchEvent(new CustomEvent(EVENT_UPDATES_MODAL_EVENT))}
      className="inline-flex w-full self-center rounded-none border-4 border-[#102344] bg-[#2ec4f3] px-3 py-3 text-xs font-black uppercase text-[#102344] shadow-[4px_4px_0_#102344] hover:bg-[#6fd8f7] sm:w-auto sm:px-4 sm:py-5 sm:text-sm sm:shadow-[5px_5px_0_#102344]"
    >
      Get updates
    </Button>
  );
}

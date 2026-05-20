"use client";

import dynamic from "next/dynamic";

export const TicketWizardLoader = dynamic(
  () => import("@/app/tickets/ticket-wizard").then((mod) => mod.TicketWizard),
  {
    ssr: false,
    loading: () => (
      <div className="border-4 border-[#102344] bg-[#fff1c7] p-5 text-sm font-black uppercase text-[#102344] shadow-[8px_8px_0_#102344]">
        Loading tickets...
      </div>
    ),
  },
);

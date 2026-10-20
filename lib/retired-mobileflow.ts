import { NextResponse } from "next/server";

// Old installations must update; never forward authorization values from this host.
export function retiredMobileflow() {
  return NextResponse.json(
    { error: "endpoint_retired", message: "Update Webflume to reconnect." },
    {
      status: 410,
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    },
  );
}

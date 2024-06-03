import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types.js";
import QRCode from "qrcode";

export const POST: RequestHandler = async ({ request }) => {
    const { string_to_encode } = await request.json();
    
    const qrDataString = await QRCode.toDataURL(string_to_encode, {
        errorCorrectionLevel: "L",
        scale: 8,
        rendererOpts: { quality: 1 },
        version: 6
    });

    return json({ qrDataString }, { status: 201 });
};
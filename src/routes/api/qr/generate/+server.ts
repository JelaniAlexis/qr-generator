import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types.js";
import QRCode from "qrcode";
import { qrPrefixes } from "$lib/utils/qr.js";

export const POST: RequestHandler = async ({ request }) => {
    const { string_to_encode, prefix_id } = await request.json();
    
    const qrDataString = await QRCode.toDataURL(qrPrefixes[prefix_id] + string_to_encode, {
        errorCorrectionLevel: "L",
        scale: 8,
        rendererOpts: { quality: 1 }
    });

    return json({ qrDataString }, { status: 201 });
};
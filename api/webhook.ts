import type { VercelRequest, VercelResponse } from "@vercel/node";
import { bot, bootstrap } from "../src/bot.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    return response.status(200).json({
      ok: true,
      service: "التراث ستور Telegram Bot",
      message: "Webhook endpoint is ready.",
    });
  }

  try {
    await bootstrap();
    await bot.handleUpdate(request.body);
    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error", error);
    return response.status(500).json({ ok: false });
  }
}
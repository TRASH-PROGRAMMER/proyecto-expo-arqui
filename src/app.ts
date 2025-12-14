import express from "express";
import QRCode from "qrcode";
import { z } from "zod";

export const app = express();
app.use(express.json());

const qrSchema = z.object({
  text: z.string().min(1, "text es requerido").max(500),
  size: z.number().int().min(128).max(1024).optional()
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "qrgen" });
});

app.get("/qr", async (req, res) => {
  const parsed = qrSchema.safeParse({
    text: req.query.text,
    size: req.query.size ? Number(req.query.size) : undefined
  });

  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const svg = await QRCode.toString(parsed.data.text, {
    type: "svg",
    width: parsed.data.size ?? 256,
    margin: 1
  });

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

app.post("/qr", async (req, res) => {
  const parsed = qrSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const svg = await QRCode.toString(parsed.data.text, {
    type: "svg",
    width: parsed.data.size ?? 256,
    margin: 1
  });

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(201).send(svg);
});
export default app;
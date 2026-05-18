import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fetchRemoteData } from "./apiClient.js";
import { fetchNotifications, rankNotifications } from "./notificationService.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);
const depotsUrl = "http://4.224.186.213/evaluation-service/depots";
const vehiclesUrl = "http://4.224.186.213/evaluation-service/vehicles";
const notificationsUrl = "http://4.224.186.213/evaluation-service/notifications";

app.use(cors());
app.use(express.json());

function normalizeToken(token) {
  return String(token ?? "").replace(/^\s*Bearer\s+/i, "").trim();
}

function requireToken(req) {
  const token = normalizeToken(req.query.token ?? process.env.BEARER_TOKEN ?? "");
  if (!token) {
    const error = new Error("Bearer token is required via token query or BEARER_TOKEN env");
    error.status = 400;
    throw error;
  }
  return token;
}

app.get("/api/depots", async (req, res) => {
  try {
    const token = requireToken(req);
    const data = await fetchRemoteData(depotsUrl, token);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message ?? "Unknown error" });
  }
});

app.get("/api/vehicles", async (req, res) => {
  try {
    const token = requireToken(req);
    const data = await fetchRemoteData(vehiclesUrl, token);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message ?? "Unknown error" });
  }
});

app.get("/api/priority-notifications", async (req, res) => {
  try {
    const token = requireToken(req);
    const limit = Number(req.query.limit ?? 10);
    const notifications = await fetchNotifications(notificationsUrl, token);
    const ranked = rankNotifications(notifications).slice(0, Math.max(1, limit));
    res.json({
      total: notifications.length,
      top: ranked,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message ?? "Unknown error" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Maintenance scheduler backend listening at http://localhost:${port}`);
});

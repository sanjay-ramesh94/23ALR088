import { fetchRemoteData } from "./apiClient.js";

const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function parseTimestamp(timestamp) {
  const parsed = new Date(timestamp);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }
  return parsed;
}

export async function fetchNotifications(apiUrl, bearerToken) {
  const data = await fetchRemoteData(apiUrl, bearerToken);
  if (!data || !Array.isArray(data.notifications)) {
    throw new Error("Unexpected notification API response format.");
  }
  return data.notifications;
}

export function computePriority(item) {
  const now = new Date();
  const timestamp = parseTimestamp(item.Timestamp);
  const ageMinutes = Math.max(0, Math.round((now.getTime() - timestamp.getTime()) / 60000));
  const weight = TYPE_WEIGHTS[item.Type] ?? 1;
  const recencyScore = 1 + Math.max(0, 1440 - ageMinutes) / 1440;
  const priorityScore = Number((weight * recencyScore).toFixed(4));

  return {
    ...item,
    priorityScore,
    ageMinutes,
  };
}

export function rankNotifications(notifications) {
  return notifications
    .map(computePriority)
    .sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return parseTimestamp(b.Timestamp).getTime() - parseTimestamp(a.Timestamp).getTime();
    });
}

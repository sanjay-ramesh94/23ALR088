import axios from "axios";

export async function fetchRemoteData(url, bearerToken) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      Accept: "application/json",
    },
    timeout: 15000,
  });

  return response.data;
}

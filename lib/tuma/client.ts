const BASE_URL = process.env.TUMA_BASE_URL!;
const EMAIL = process.env.TUMA_API_EMAIL!;
const API_KEY = process.env.TUMA_API_KEY!;

export async function getTumaToken() {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: EMAIL,
      api_key: API_KEY,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Tuma authentication failed: ${response.status}`);
  }

  return response.json();
}

const BASE_URL = process.env.TUMA_BASE_URL!;
const EMAIL = process.env.TUMA_API_EMAIL!;
const API_KEY = process.env.TUMA_API_KEY!;

type TokenResponse = {
    success: boolean;
    data: {
        token: string;
        expires_in: number;
    };
};

export async function getTumaToken() {
    const res = await fetch(`${BASE_URL}/auth/token`, {
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

    if (!res.ok) {
        throw new Error(`Tuma authentication failed (${res.status})`);
    }

    const json = (await res.json()) as TokenResponse;

    if (!json.success || !json.data?.token) {
        throw new Error("Unable to authenticate with Tuma.");
    }

    return json.data.token;
}

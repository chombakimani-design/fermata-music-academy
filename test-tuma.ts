import { getTumaToken } from "./lib/tuma/auth";

(async () => {
    try {
        const token = await getTumaToken();
        console.log(token);
    } catch (err) {
        console.error(err);
    }
})();

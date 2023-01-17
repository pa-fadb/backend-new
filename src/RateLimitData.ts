import { RateLimit } from "../routes/RateLimitManager";

export const RateLimitData: Record<string, RateLimit> = {
    "/teapot": {
        maximum: 5,
        reset: 1.8e6,
        message: "You have reached the maximum amount of teapots you can drink in a minute."
    }
}
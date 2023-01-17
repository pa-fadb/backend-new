export interface RateLimit {
    path?: string;
    recipient?: string;
    remaining?: number;
    maximum: number;
    reset: number;
    message?: string;
}

export class RateLimitManager {
    static rateLimits: RateLimit[] = [];

    static check(path: string, ip: string, maximum: number, reset: number) {
        let rl = this.rateLimits.find((limit) => limit.path == path && limit.recipient == ip);

        if (!rl) {
            rl = {
                path: path,
                recipient: ip,
                remaining: maximum,
                maximum: maximum,
                reset: Date.now() + reset
            };

            this.rateLimits.push(rl);
        }

        let rli = this.rateLimits.indexOf(rl);

        if (Date.now() >= rl.reset) {
            delete this.rateLimits[rli];
            this.rateLimits = this.rateLimits.filter((x) => x !== undefined);
        
            this.rateLimits.push({
                path: path,
                recipient: ip,
                remaining: maximum,
                maximum: maximum,
                reset: Date.now() + reset
            })
        }

        if (rl.remaining == 0) {
            return {
                "RateLimit-Limit": rl.maximum,
                "RateLimit-Remaining": rl.remaining,
                "RateLimit-Reset": rl.reset
            };
        }

        rl.remaining!--;

        return {
            "RateLimit-Limit": rl.maximum,
            "RateLimit-Remaining": rl.remaining,
            "RateLimit-Reset": rl.reset
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { RateLimit, RateLimitManager } from "../../routes/RateLimitManager";
import { RateLimitData } from "../RateLimitData";

export class RateLimitMiddleware {
    static handle(req: Request, res: Response, next: NextFunction) {
        const rateLimit = RateLimitData[req.originalUrl] as RateLimit;

        if (!rateLimit) {
            return next();
        }

        let rl = RateLimitManager.check(req.originalUrl, req.ip, rateLimit.maximum, rateLimit.reset);

        res.set("RateLimit-Limit", rl["RateLimit-Limit"].toString());
        res.set("RateLimit-Remaining", rl["RateLimit-Remaining"]!.toString());
        res.set("RateLimit-Reset", rl["RateLimit-Reset"].toString());

        if (rl["RateLimit-Remaining"]! <= 0) {
            return res.status(429).json({
                code: 429,
                message: rateLimit.message || "You are being rate limited.",
                headers: rl
            });
        }

        next();
    }
}
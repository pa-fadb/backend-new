import fs from "fs";
import { Application, Request, Response, NextFunction } from "express";
import path from "path";
import { ErrorObject } from "./interfaces/ApiRequest";

const BASE_PATH = path.join(__dirname, "../", "../", "routes");

export class RouterMiddleware {
    private static async readRoutes(app: Application, routesPath: string) {
        fs.readdirSync(routesPath).forEach(async (file) => {
            if (fs.lstatSync(path.join(routesPath, file)).isDirectory()) {
                await this.readRoutes(app, path.join(routesPath, file));
                return;
            }

            if (file.slice(-3) !== ".ts")
                return;

            const route = await import(path.join(routesPath, file));
            const routePath = path.join(routesPath, file).replace(BASE_PATH, "").replace(".ts", "").replace(/\\/g, "/");

            const keys = Object.keys(route);

            for (const key of keys) {
                const router = route[key];

                if (router.stack) {
                    router.use((error: ErrorObject, req: Request, res: Response, _: NextFunction) => {
                        if (error) {
                            return res.status(error.status).json(error);
                        }
                    });

                    app.use(routePath, router);
                }
            }
        });
    }

    static handle(app: Application) {
        this.readRoutes(app, BASE_PATH);
    }
}
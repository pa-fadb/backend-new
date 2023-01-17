import "reflect-metadata"
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import multer from "multer";
import { RouterMiddleware } from "./src/middleware/RouterMiddleware";
import { RateLimitMiddleware } from "./src/middleware/RateLimitMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(multer().any());
app.use(morgan((tokens, req, res) => {
    let method = tokens.method(req, res);

    switch (method) {
        case "GET":
            method = chalk.bgHex("#00FFAA").black(` ${method} `);
            break;
        case "POST":
            method = chalk.bgHex("#FFC800").black(` ${method} `);
            break;
        case "PUT":
            method = chalk.bgHex("#00AAFF").black(` ${method} `);
            break;
        case "DELETE":
            method = chalk.bgHex("#FF0040").black(` ${method} `);
            break;
        case "PATCH":
            method = chalk.bgHex("#4000FF").black(` ${method} `);
            break;
    }

    const status = parseInt(tokens.status(req, res) ?? "500");
    let statusString = "";
    let statusHeader;

    if (status >= 200 && status < 400) {
        statusString = chalk.bgHex("#00FFAA").black(` ${status} `);
        statusHeader = chalk.hex("#00FFAA")(" SUCCESS");
    } else if (status >= 400 && status < 500) {
        statusString = chalk.bgHex("#FF0040").black(` ${status} `);
        statusHeader = chalk.hex("#FF0040")(" FAILURE");
    } else if (status >= 500 && status < 600) {
        statusString = chalk.bgHex("#4000FF").black(` ${status} `);
        statusHeader = chalk.hex("#4000FF")(" ERROR");
    }

    const url = tokens.url(req, res);
    statusString = statusString.padStart(Math.max(1, 15 - (url?.length ?? 0)), "E");

    const now = new Date();
    const format = new Intl.DateTimeFormat();

    return [`[${chalk.gray(format.format(now))}]`, statusHeader, method, tokens.url(req, res), statusString, "-", tokens["response-time"](req, res), "ms"].join(" ");
}));

app.use(RateLimitMiddleware.handle);

RouterMiddleware.handle(app);

app.listen(process.env.VADB_PORT, () => {
    const now = new Date();
    const format = new Intl.DateTimeFormat();

    console.log(`[${chalk.gray(format.format(now))}]  ${chalk.gray("VADB API: ")}`);
    console.log(`[${chalk.gray(format.format(now))}]  Server started on port ${process.env.VADB_PORT}`);
    console.log("");
});
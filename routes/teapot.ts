import { Router } from "../src/util/ApiRouter";
const router = Router();

class TeapotRequest {
    message!: string;
}

router.get("/", TeapotRequest, (req, res, body) => {
    res.status(418).json({
        error: 418,
        status: 418,
        message: "I'm a teapot",
        data: body.message
    });
});

export { router };
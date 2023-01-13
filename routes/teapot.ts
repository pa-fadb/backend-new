import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(418).json({
        message: "I'm a teapot"
    });
});

export { router };
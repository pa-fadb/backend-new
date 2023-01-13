import { reflect } from "typescript-rtti";

import { Router as ExpressRouter, Request, Response, NextFunction } from "express";
import { ApiRequest, ErrorObject } from "../interfaces/ApiRequest";

export class RequestBody {
    static fromRequestBody<T>(cons: RequestConstructor<T>, body: any): { body: T, missing?: Array<string> } {
        let constructedBody: T = new cons();
        let reflection = reflect(new cons());

        let missing: Array<string> = [];

        for (let property of reflection.ownProperties) {
            var isNullable = property.isOptional;

            constructedBody[property.name as string as keyof T] = body[property.name as string as keyof T];
            if (body[property.name as string as keyof T] == null && !isNullable) {
                missing.push(property.name as string);
            }
        }

        return { body: constructedBody, missing: missing.length > 0 ? missing : undefined };
    }
}

type RequestConstructor<T> = { new(): T };

export type RequestCallback<T> = (req: ApiRequest, res: Response, body: T) => void;

export function Router() {
    let router = ExpressRouter();

    function createHandler<T>(cons: RequestConstructor<T>, next: RequestCallback<T>) {
        return (req: Request, res: Response) => {
            let request = RequestBody.fromRequestBody(cons, req.body);

            if (request.missing) {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request body.",
                    missing: request.missing
                });
            }

            next(req, res, request.body);
        }
    }

    return {
        get<T>(path: string, cons: RequestConstructor<T>, next: RequestCallback<T>) {
            router.get(path, createHandler(cons, next));
        },
        post<T>(path: string, cons: RequestConstructor<T>, next: RequestCallback<T>) {
            router.post(path, createHandler(cons, next));
        },
        put<T>(path: string, cons: RequestConstructor<T>, next: RequestCallback<T>) {
            router.put(path, createHandler(cons, next));
        },
        delete<T>(path: string, cons: RequestConstructor<T>, next: RequestCallback<T>) {
            router.delete(path, createHandler(cons, next));
        },
        patch<T>(path: string, cons: RequestConstructor<T>, next: RequestCallback<T>) {
            router.patch(path, createHandler(cons, next));
        },
        use(next: (error: ErrorObject, req: Request, res: Response, _: NextFunction) => void) {
            router.use(next);
        },
        get stack() {
            return router.stack;
        },
        get router() {
            return router;
        }
    }
}
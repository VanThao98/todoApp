import { validationResult } from "express-validator";

export const valid_result = (request, response, next) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return response.status(400).json({ message: errors.array()[0].msg})
    }
    next();
}
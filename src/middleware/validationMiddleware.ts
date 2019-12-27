import Joi, { SchemaLike } from 'joi';
import { NextFunction, Request, Response } from 'express';

const validationMiddleware = (schema: SchemaLike, property: string  = 'BODY') => {
    
    return (req: Request, res: Response, next: NextFunction) => {
        
        let error: Joi.ValidationError;

        switch (property) {
            case 'BODY':
                error = Joi.validate(req.body, schema).error;
                break;
            case 'QUERY':
                error = Joi.validate(req.query, schema).error;
                break;
            default:
                error = Joi.validate(req.body, schema).error;
                break;
        }

        if (error == null) {
            next();
        } else {            

            res.status(400).send({ error: error.message});

        }
    }
};

export default validationMiddleware;


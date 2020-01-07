
const errorMiddleware = (err: any, _req: any, res: any, _next: any) => {
    
    if (! err.statusCode) err.statusCode = 500;

    if (! err.isOperational) {
        /* implementar geração de log aqui */
    }

    return res.status(err.statusCode).send({ error: err.message});
    
    // if (res.headersSent) {
    //     return next(err);
    // }

    // res.status(500).sender('error', { error: err});
}

export default errorMiddleware;
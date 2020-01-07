import jsonwebtoken from 'jsonwebtoken';

const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided'});

    const parts: Array<string> = authHeader.split(' ');

    if (parts.length < 2)
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' });

    const secretKey: string = process.env.SECRETKEY || '';
    jsonwebtoken.verify(token, secretKey, (err: Error, decoded: any) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });

        req.userId = decoded.userId;
        return next();
    });
}

export default authMiddleware;
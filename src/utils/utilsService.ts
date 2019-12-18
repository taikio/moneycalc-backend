import jsonwebtoken from 'jsonwebtoken';

export default class SvcUtils {

    constructor() { }

    public static generateToken(userId: number): string {
        const secretkey = process.env.SECRETKEY || '';
        return jsonwebtoken.sign({ userId: userId }, secretkey, {
            expiresIn: 86400
        });
    }
}

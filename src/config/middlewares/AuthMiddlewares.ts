let jwt = require('jsonwebtoken');
const SECRET_TOKEN_KEY = process.env.JWT_SECRET;

export default class Auth {

    public static checkTokenByMethod(permission: string) {
        return function (req, res, next) {
            let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

            if (token) {
                // Remove Bearer from string
                if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

                jwt.verify(token, SECRET_TOKEN_KEY, (err, decoded) => {
                    if (err) {
                        return res.status(403).send(Auth.tokenError('Token is not valid'));
                    } else {
                        let role: string = decoded.role;
                        if (permission == "all" || permission == null) {
                            req.decoded = decoded;
                            next();
                        } else if (permission == role) {
                            if (role == "client") {
                                req.decoded = decoded;
                                next();
                            } else if (role == "admin") {
                                req.decoded = decoded;
                                res.redirect("admin" + req.url);
                            }
                        } else {
                            return res.status(403).send(Auth.tokenError("No Authorization"))
                        }
                    }
                });
            } else {
                return res.status(403).send(Auth.tokenError('Auth token is not supplied'));
            }
        };
    }

    public static checkAdminToken(req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if (token) {
            // Remove Bearer from string
            if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

            jwt.verify(token, SECRET_TOKEN_KEY, (err, decoded) => {
                if (err) {
                    return res.status(403).send(this.tokenError('Token is not valid'));
                } else {
                    let role: string = decoded.role;
                    if(role == "admin"){
                        req.decoded = decoded;
                        next();
                    } else {
                        return res.status(403).send(Auth.tokenError("No Authorization"))
                    }
                }
            })
        }
    }

    private static tokenError(message: string): any {
        return ({
            success: false,
            message: message
        });
    }


}

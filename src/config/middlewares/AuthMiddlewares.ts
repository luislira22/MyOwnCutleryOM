let jwt = require('jsonwebtoken');
const SECRET_TOKEN_KEY = process.env.JWT_SECRET;

export default class Auth {

    public static checkTokenByMethod(permission : string){
        return function checkToken(req,res,next) {
            let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

            if (token) {
                // Remove Bearer from string
                if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

                jwt.verify(token, SECRET_TOKEN_KEY, (err, decoded) => {
                    if (err) {
                        return res.status(403).send(Auth.tokenError('Token is not valid'));
                    } else {
                        if (permission === "all"){
                            req.decoded = decoded;
                            next();
                        }else if(permission === "client" === decoded.role){
                            req.decoded = decoded;
                            next();
                        }
                        else if(permission == "admin" === decoded.role){
                            req.decoded = decoded;
                            req.redirect("admin/" + req.url);
                        }
                        else{
                            return res.status(403).send(Auth.tokenError("No Authorization"))
                        }
                    }
                });
            } else {
                return res.status(403).send(Auth.tokenError('Auth token is not supplied'));
            }
        };
    }

    private static tokenError(message: string) : any {
        return ({
            success: false,
            message: message
        });
    }

    public static isAdmin(req,res,next){
        if(req.decoded == null) {
            return res.status(403).send(Auth.tokenError("direct access not allowed"));
        }
        else
            next();
    }

}

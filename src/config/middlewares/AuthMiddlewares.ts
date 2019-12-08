import {Express} from "express";

let jwt = require('jsonwebtoken');
import {SECRET_TOKEN_KEY} from "../secret";

export default class Auth{

  static checkToken(req, res , next){
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token) {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      jwt.verify(token, SECRET_TOKEN_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };

}

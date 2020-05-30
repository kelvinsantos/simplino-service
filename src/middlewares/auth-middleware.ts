import request from "request";
import config from "config";

class AuthMiddleware {
  public async validateToken(req: any, res: any, next: any) {
    if (process.env.NODE_ENV !== "test") {
      let token = req.get("Authorization");
      if (!token) {
        return res.sendStatus(401);
      }
    
      let options = {
        url: `${config.get("simplinoAuthBaseUrl")}/authenticator/verify`,
        method: "POST",
        json: true,
        headers: {
          'Authorization': token
        }
      };

      request.post(options, (err, response, body) => {
        if (!body) {
          return res.sendStatus(401);
        } else {
          req.token = body;
          return next();
        }
      });
    } else {
      return next();
    }
  }
}

export = AuthMiddleware;
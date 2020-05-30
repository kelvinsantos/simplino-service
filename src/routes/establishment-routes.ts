import * as express from "express";
const router = express.Router();

// import utilities
import RouterUtil from "../utils/router-utils";

// import middlewares
import AuthMiddleware from "../middlewares/auth-middleware";

// import handlers
import EstablishmentHandler from "../handlers/establishment-handler";

const routerUtil = new RouterUtil(router);

const establishmentHandler = new EstablishmentHandler();
const authMiddleware = new AuthMiddleware();
router.route("/establishment/:id").get(authMiddleware.validateToken, establishmentHandler.get);
// routerUtil.buildGetRoute("/establishment/:id", establishmentHandler.get);
routerUtil.buildPostRoute("/establishment", establishmentHandler.insert);
routerUtil.buildPutRoute("/establishment/:id", establishmentHandler.update);
routerUtil.buildDeleteRoute("/establishment/:id", establishmentHandler.delete);

export default router;
import * as express from "express";

class RouterUtil {
  router: express.Router;
  constructor(router: express.Router) {
    this.router = router;
  }

  public buildGetRoute(endpointUrl: string, handler: any) {
    this.router.route(endpointUrl).get(handler);
  };

  public buildPostRoute(endpointUrl: string, handler: any) {
    this.router.route(endpointUrl).post(handler);
  };

  public buildPutRoute(endpointUrl: string, handler: any) {
    this.router.route(endpointUrl).put(handler);
  };

  public buildDeleteRoute(endpointUrl: string, handler: any) {
    this.router.route(endpointUrl).delete(handler);
  };
}

export = RouterUtil;
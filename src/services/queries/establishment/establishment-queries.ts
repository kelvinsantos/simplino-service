import log4js from "log4js";
const logger = log4js.getLogger("establishment-services");

// import schemas
import Establishment from "../../../schemas/establishment"

// import types
import { EstablishmentRequest } from "../../../types/establishment-types"

// import utils
import AuthUtils from "../../../utils/auth-utils";

/**
 * @module establishment-queries.ts
 * @description Module used for calling establishment queries.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 29, 2020
 */
class EstablishmentQueries {
  public async getEstablishment(requestParams: EstablishmentRequest) {
    logger.info("Called getEstablishment with request parameters:", requestParams);
    try {
      const establishment = await Establishment.findOne({ _id: requestParams.id, is_deleted: { $ne: true } });
      return establishment;
    } catch (error) {
      logger.debug("There is something wrong while getting establishment.", error);
      return Promise.reject(error);
    }
  }
}

export = EstablishmentQueries;
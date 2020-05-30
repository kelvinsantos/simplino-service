import log4js from "log4js";
const logger = log4js.getLogger("establishment-services");

// import schemas
import Establishment from "../../../schemas/establishment"

// import types
import { EstablishmentRequest } from "../../../types/establishment-types"

// import utils
import AuthUtils from "../../../utils/auth-utils";

/**
 * @module establishment-commands.ts
 * @description Module used for calling establishment commands.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 29, 2020
 */
class EstablishmentCommands {
  public async insertEstablishment(requestParams: EstablishmentRequest) {
    logger.info("Called insertEstablishment with request parameters:", requestParams);
    try {
      const newEstablishment = new Establishment({
        name: requestParams.name,
        coordinates: requestParams.coordinates,
        time_per_person: requestParams.time_per_person,
        number_of_allowed: requestParams.number_of_allowed,
        type: requestParams.type,
        is_deleted: false
      });
      newEstablishment.save();
      return newEstablishment._id;
    } catch (error) {
      logger.debug("There is something wrong while inserting establishment.", error);
      return Promise.reject(error);
    }
  }
  public async updateEstablishment(requestParams: any) {
    logger.info("Called updateEstablishment with request parameters:", requestParams);
    try {
      // PATCH update - update only the fields which are supplied on request body
      let query: any = {$set: {}};
      for (let key in requestParams) {
        if (requestParams[key])
          query.$set[key] = requestParams[key];
      }

      const updatedEstablishment = Establishment.findOneAndUpdate({ _id: requestParams.id }, query, { upsert: true, new: true });
      return updatedEstablishment;
    } catch (error) {
      logger.debug("There is something wrong while updating establishment.", error);
      return Promise.reject(error);
    }
  }
  public async deleteEstablishment(requestParams: EstablishmentRequest) {
    logger.info("Called deleteEstablishment with request parameters:", requestParams);
    try {
      return await Establishment.updateOne({ _id: requestParams.id, is_deleted: { $ne: true } }, { "$set": { "is_deleted": true } })
    } catch (error) {
      logger.debug("There is something wrong while deleting establishment.", error);
      return Promise.reject(error);
    }
  }
}

export = EstablishmentCommands;
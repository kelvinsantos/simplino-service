import log4js from "log4js";
const logger = log4js.getLogger("info");

// import schemas
import User from "../../../schemas/user"

// import types
import { UserRequest } from "../../../types/user/user-types"

/**
 * @module user-queries.ts
 * @description Module used for calling user queries.
 * @author Kelvin John Santos
 * @version 1.0
 * @since February 05, 2020
 */
class UserQueries {
  public async getUser(requestParams: UserRequest) {
    logger.info("Called getUser with request parameters:", requestParams);
    try {
      const user = await User.find({ organization: requestParams.email, is_deleted: { $ne: true } });
      return user;
    } catch (error) {
      logger.error("There is something wrong while getting user.", error);
      return Promise.reject(error);
    }
  }
}

export = UserQueries;
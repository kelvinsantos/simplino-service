import { Request, Response, NextFunction } from "express";

// import commands
import UserCommands from "../../services/commands/user/user-commands";

// import queries
import UserQueries from "../../services/queries/user/user-queries";

// import types
import { UserRequest } from "../../types/user/user-types"

/**
 * @module user-handler.ts
 * @description Module used for creating api handlers.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 02, 2020
 */
class UserHandler {
  public async get(req: Request, res: Response, next: NextFunction) {
    const input: UserRequest = {
      id: req.params.id
    }
    const userQueries = new UserQueries();
    await userQueries.getUser(input).then((user: any) => {
      return res.status(200).json(user);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async insert(req: Request, res: Response, next: NextFunction) {
    const input: UserRequest = {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_number: req.body.mobile_number,
      password: req.body.password
    }
    const userCommands = new UserCommands();
    await userCommands.insertUser(input).then(insertUser => {
      return res.status(200).json({ _id: insertUser });
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const input: UserRequest = {
      id: req.params.id,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile_number: req.body.mobile_number,
      password: req.body.password
    }
    const userCommands = new UserCommands();
    userCommands.updateUser(input).then((updatedUser: any) => {
      return res.status(200).json(updatedUser);
    }).catch((error: any) => {
      return res.status(422).send(error);
    });
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const input: UserRequest = {
      id: req.params.id,
    }
    const userQueries = new UserCommands();
    await userQueries.deleteUser(input).then(deletedUser => {
      return res.status(200).json(deletedUser);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
}

export = UserHandler;
import { Request, Response, NextFunction } from "express";

// import commands
import EstablishmentCommands from "../services/commands/establishment/establishment-commands";

// import queries
import EstablishmentQueries from "../services/queries/establishment/establishment-queries";

// import types
import { EstablishmentRequest } from "../types/establishment-types"

/**
 * @module establishment-handler.ts
 * @description Module used for creating api handlers.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 02, 2020
 */
class EstablishmentHandler {
  public async get(req: Request, res: Response, next: NextFunction) {
    const input: EstablishmentRequest = {
      id: req.params.id
    }
    const establishmentQueries = new EstablishmentQueries();
    await establishmentQueries.getEstablishment(input).then((establishment: any) => {
      return res.status(200).json(establishment);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async insert(req: Request, res: Response, next: NextFunction) {
    const input: EstablishmentRequest = {
      name: req.body.name,
      coordinates: req.body.coordinates,
      time_per_person: req.body.time_per_person,
      number_of_allowed: req.body.number_of_allowed,
      type: req.body.type
    }
    const establishmentCommands = new EstablishmentCommands();
    await establishmentCommands.insertEstablishment(input).then(insertEstablishment => {
      return res.status(200).json({ _id: insertEstablishment });
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const input: EstablishmentRequest = {
      id: req.params.id,
      name: req.body.name,
      coordinates: req.body.coordinates,
      time_per_person: req.body.time_per_person,
      number_of_allowed: req.body.number_of_allowed,
      type: req.body.type
    }
    const establishmentCommands = new EstablishmentCommands();
    establishmentCommands.updateEstablishment(input).then((updatedEstablishment: any) => {
      return res.status(200).json(updatedEstablishment);
    }).catch((error: any) => {
      return res.status(422).send(error);
    });
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const input: EstablishmentRequest = {
      id: req.params.id,
    }
    const establishmentQueries = new EstablishmentCommands();
    await establishmentQueries.deleteEstablishment(input).then(deletedEstablishment => {
      return res.status(200).json(deletedEstablishment);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
}

export = EstablishmentHandler;
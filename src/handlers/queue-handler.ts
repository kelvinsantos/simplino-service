import { Request, Response, NextFunction } from "express";

// import commands
import QueueCommands from "../services/commands/queue/queue-commands";

// import queries
import QueueQueries from "../services/queries/queue/queue-queries";

// import types
import { QueueRequest } from "../types/queue-types"

/**
 * @module queue-handler.ts
 * @description Module used for creating api handlers.
 * @author Kelvin John Santos
 * @version 1.0
 * @since May 02, 2020
 */
class QueueHandler {
  public async get(req: Request, res: Response, next: NextFunction) {
    const input: QueueRequest = {
      id: req.params.id
    }
    const queueQueries = new QueueQueries();
    await queueQueries.getQueue(input).then((queue: any) => {
      return res.status(200).json(queue);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async insert(req: Request, res: Response, next: NextFunction) {
    const input: QueueRequest = {
      user: req.body.user,
      establishment: req.body.establishment,
      position_in_queue: req.body.position_in_queue,
      waiting_time: req.body.waiting_time,
      coordinates: req.body.coordinates,
      status: req.body.status
    }
    const establishmentCommands = new QueueCommands();
    await establishmentCommands.insertQueue(input).then(insertQueue => {
      return res.status(200).json({ _id: insertQueue });
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const input: QueueRequest = {
      id: req.params.id,
      user: req.body.user,
      establishment: req.body.establishment,
      position_in_queue: req.body.position_in_queue,
      waiting_time: req.body.waiting_time,
      coordinates: req.body.coordinates,
      status: req.body.status
    }
    const establishmentCommands = new QueueCommands();
    establishmentCommands.updateQueue(input).then((updatedQueue: any) => {
      return res.status(200).json(updatedQueue);
    }).catch((error: any) => {
      return res.status(422).send(error);
    });
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const input: QueueRequest = {
      id: req.params.id,
    }
    const queueQueries = new QueueCommands();
    await queueQueries.deleteQueue(input).then(deletedQueue => {
      return res.status(200).json(deletedQueue);
    }).catch(error => {
      return res.status(422).send(error);
    });
  }
}

export = QueueHandler;
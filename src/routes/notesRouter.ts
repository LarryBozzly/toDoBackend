import express from "express";
import { NextFunction, Request, Response, Router } from 'express';
import notesController from '../controllers/notesController';

class NotesRouter {
  public router: express.Router = express.Router();
  // private _router = Router();

  get getRouter() {
    return this.router;
  }


  constructor() {
    this.config();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private config() {

    this.router.get("/", notesController.notes);
  
 
    // this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
    //   res.status(200).json(this._controller.defaultMethod());
    // });
  }
}

export = new NotesRouter().router;
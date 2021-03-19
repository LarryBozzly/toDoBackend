import express from "express";
import { NextFunction, Request, Response, Router } from 'express';
import AuthController from '../controllers/authController';

class AuthRouter {
  public router: express.Router = express.Router();
  // private _router = Router();
  private authController = AuthController;

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
      this.router.post('/',this.authController.register);
      // this.router.register('/',this.authController.register)
 
    // this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
    //   res.status(200).json(this._controller.defaultMethod());
    // });
  }
}

export = new AuthRouter().router;
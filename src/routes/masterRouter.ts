import express from "express";
import NotesRouter from './notesRouter';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
import * as jwt from "jsonwebtoken";

class MasterRouter {
  public router: express.Router = express.Router();
  private notesRouter = NotesRouter;
  private userRouter = UserRouter;
  private authRouter = AuthRouter;

  

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this.router.use('/auth', this.authRouter);
    this.router.use('/notes',this.verifyToken, this.notesRouter);
    this.router.use('/user',this.verifyToken, this.userRouter);
  }

  private verifyToken(req: any, res: any, next: any) {
    const bearerHeader = req.headers["authorization"];
    //check if bearer undefined
    if (typeof bearerHeader !== "undefined") {
      //split at the space
      const bearer = bearerHeader.split(" ");
      //get token from array;
      const bearerToken = bearer[1];
      //set the token
      req.token = bearerToken;
      //next
      next();
    } else {
      res.sendStatus(403);
    }
  }

}

export = new MasterRouter().router;
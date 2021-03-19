import dotenv from 'dotenv';
import express from 'express';
import MasterRouter from './routes/MasterRouter';
import * as path from 'path';

import passport from "passport";


// load the environment variables from the .env file
dotenv.config({ path: ".env" });

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class App {
  public app : express.Application;

  constructor(){
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    // this.app.use(bodyParser.json()); // middleware for json body parsing
    // this.app.use(bodyParser.urlencoded({ extended: true })); // middleware for parsing application/x-www-form-urlencoded
    this.app.set("port", process.env.PORT || 3000);
    this.app.use('/api',MasterRouter);
    this.app.use(passport.initialize());
    this.app.use(passport.session());







    // make server listen on some port
    ((port = process.env.PORT || 5000) => {
      this.app.listen(port, () => console.log(`> Listening on port ${port}`));
    })();
  }
}
export default new App().app;




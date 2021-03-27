import dotenv from 'dotenv';
import express from 'express';
import MasterRouter from './routes/masterRouter';
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
  public cors = require('cors');

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
    this.app.use(this.cors());

    var corsOptions = {
      origin: 'http://example.com',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }

    this.app.options("/*", function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.sendStatus(200);
    });
  
    this.app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      next();
    });



    // make server listen on some port
    ((port = process.env.PORT || 5000) => {
      this.app.listen(port, () => console.log(`> Listening on port ${port}`));
    })();
  }
}
export default new App().app;




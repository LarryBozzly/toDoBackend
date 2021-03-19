import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: ".env" });


class AuthController {

  private admin = {
    username: process.env.username_admin,
    password: process.env.password_admin,
  };

  // POST
  public register = async (req: any, res: any, next: any) => {
      if ( req.body.username === this.admin.username && req.body.password === this.admin.password) {
        console.info('aa');
        jwt.sign({ admin: this.admin }, "secretkey", (err:any, token:any) => {
          res.json({
            token: token,
            admin: this.admin,
          });
        });
        return;
      } else {
        res.json({
          token: null,
        });
        return;
      }
    
    
  }
    
}
  
export = new AuthController();
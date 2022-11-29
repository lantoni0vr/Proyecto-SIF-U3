import express, { json } from "express";
import Routes from "./routes/routes"
import { conn} from "./database/connection";
import { Music } from "./models/music";
import { User } from "./models/user";
import { TableInheritance } from "typeorm";

class App {

    public express: express.Application;

   

    constructor() {
        this.express = express();
        this.middlewares();
        this.db();
        this.routes();
    }

    middlewares(){
        this.express.use(json());
    }

    routes(){
        //this.express.use('/api', this.musicController.router);
        //this.express.use('/api/user', this.userController.router);
        this.express.use('/api', Routes)
    }

    db(){
        conn
        .sync()
        .then(() => {
            User.sync();
            console.log(`Database is connected`);
        })
        .catch((err) => {
            console.log(`Error`, err);
        })
    }

    listen(port: number){
        this.express.listen(port, 
            () => console.log(`Server run in: http://localhost:${port}`));
    }

 
}

export default new App();
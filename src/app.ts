import express, { json } from "express";
import {MusicController} from "./controllers/music.controller";
import {UserController} from "./controllers/user.controller";
import authRoutes from "./routes/auth.routes"
import { conn} from "./database/connection";
import { Music } from "./models/music";
import { User } from "./models/user";

class App {

    public express: express.Application;

    musicController: MusicController;
    userController: UserController;

    constructor() {
        this.express = express();
        this.middlewares();
        this.controllers();
        this.db();
        this.routes();
    }

    middlewares(){
        this.express.use(json());
    }

    routes(){
        this.express.use('/api', this.musicController.router);
        this.express.use('/api/user', this.userController.router);
        this.express.use('/api/auth', authRoutes)
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

    controllers(){
        this.musicController = new MusicController();
        this.userController = new UserController();
    }
}

export default new App();
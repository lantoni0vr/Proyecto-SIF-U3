import express, { json } from "express";
import {MusicController} from "./controllers/music.controller";
import {UserController} from "./controllers/user.controller";
import {AdminController} from "./controllers/admin.controller";
import { conn} from "./database/connection";
import { Music } from "./models/music";
import { User } from "./models/user";
import { Admin } from "./models/admin";

class App {

    public express: express.Application;

    musicController: MusicController;
    userController: UserController;
    adminController: AdminController;

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
        this.express.use('/api/admin', this.adminController.router);
    }

    db(){
        conn
        .sync()
        .then(() => {
            Music.sync();
            User.sync();
            Admin.sync();
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
        this.adminController = new AdminController();
    }
}

export default new App();
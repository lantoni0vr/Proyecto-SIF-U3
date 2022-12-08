import express, { json } from "express";
import Routes from "./routes/routes"
import { conn} from "./database/connection";
import { User } from "./models/user";
import { Role } from "./models/roles";
import roleService from "./services/role.service";
import { PlayList } from "./models/playlist";
import playlistService from "./services/playlist.service";

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
        this.express.use('/api', Routes)
    }

    db(){
        conn
        .sync()
        .then(() => {
            
            Role.sync();
            User.sync();
            PlayList.sync();

            console.log(`Database is connected`);

            roleService.createdRoles();
            playlistService.createdPlayLists();

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
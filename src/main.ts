console.log("Hola mundo, y planeta")

import 'dotenv/config';
import App from './app';

//Iniciar la Aplicacion

App.listen(process.env.APP_PORT as unknown as number | 3001); 
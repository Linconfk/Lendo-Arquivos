const express = require('express');
const cors = require('cors');
const Routes = require('./start/routes');

const corsOptions = require('./config/cors');

async function run(){
    const app = express();

    app.set('resources', __dirname + '/resources');

    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(Routes)

    const PORT = 3334;
    app.listen(PORT);

    console.log(`info: APP started at port ${PORT}. Open http://localhost:${PORT}`);

}

run().catch((e) => console.error(e))
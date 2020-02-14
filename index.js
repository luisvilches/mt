// MODULES
const express = require('express');
const path = require('path');
const body = require('connect-multiparty')();
const config = require('./conf.json');
const mongoose = require('mongoose');
const cors = require('cors');

// INSTANCES
const app = express();

//MIDDLEWARES
const { bindCurretNamespace } = require('./middlewares/storage');
const { auth } = require('./middlewares/auth');

// FILES ROUTES
const routePublic = require('./routes/public');
const routePrivate = require('./routes/private');

// CONFIGS
app.use(cors());
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(bindCurretNamespace);

// ROUTES
app.use('/', body, routePublic);
app.use('/', body, auth, routePrivate);

// CONEXION DB
mongoose.connect('urimongo', err => err ? console.log(err) : console.log("conexion db success"));

// SERVER
app.listen(config.server.port, err => err ? console.log(err) : console.log("server running in port " + config.server.port));

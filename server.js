const express = require('express');
const app = express();
const cors = require('cors');
const genericRouter = require('./routes/generic.route');
app.use(cors());
app.use(express.json());
app.use(genericRouter);



//launch server on port 9000
const server = app.listen(9000, () =>{
    console.log("listening on port %s-", server.address().port);
})
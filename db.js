var mongoose = require('mongoose');
mongoose
    .connect(process.env.DB_URL_LIVE, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(con => console.log(" DB connection successful !"));
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');
const cors = require("cors")
const path = require('path');


app.use(express.json({limit:"50mb"}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(fileUpload());



// ----Import All Routers----
// Projects Component Routers
const projectsRouters = require('./routers/projectsRouters/projectsRouters');
app.use("/api/v1",projectsRouters);
// Contact Component Routers
const contactRouters = require('./routers/contactRouters/contactRouters');
app.use("/api/v1",contactRouters);
// About Us Component Routers
const aboutTeamRouters = require('./routers/aboutusRouters/aboutTeamRouters');
const clientFeedbackRouters = require('./routers/aboutusRouters/clientFeedbackRouters');
app.use("/api/v1",aboutTeamRouters);
app.use("/api/v1",clientFeedbackRouters);
// Service Component Routers
const serviceRouters = require('./routers/servicesRouters/servicesRouters');
app.use('/api/v1',serviceRouters);
// Footer Component Routers
const footerRouters = require('./routers/footerRouters/footerRouters');
app.use('/api/v1',footerRouters);
// Home Component Routers
const homeRouters = require('./routers/homeRouters/homeRouters');
app.use('/api/v1',homeRouters);
// User Component Router
const userRouters = require('./routers/userRouters/userRouters');
app.use('/api/v1',userRouters);

// Import Middleware Errors
const middlewareErrors = require('./middlewares/error');
app.use(middlewareErrors);


app.use(express.static(path.join(__dirname, '../frontend/build')));


app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });



module.exports = app;
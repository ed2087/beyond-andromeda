const _express = require("express");
const _bodyParser = require("body-parser");
const _path = require("path");
const _helmet = require("helmet");
const _compression = require("compression");
const _morgan = require("morgan");
const _fs = require('fs');
const flash = require('connect-flash');
const _enforce = require('express-sslify');

//DB requires
const _mongoose = require('mongoose');
const _sessionExpress = require("express-session");
const _MongoDBStore = require("connect-mongodb-session")(_sessionExpress);


const _port = "3000";
const _app = _express();

//const MONGODB_URI = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@cluster0.ebmp5.mongodb.net/${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority`;
const MONGODB_URI = `mongodb+srv://edgar:wvH80bkVVJGoZeym@cluster0.ph3oe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// get model
const Model = require("./model/scoreModel.js"); 

//start session store
// const store = new _MongoDBStore({

//     uri : MONGODB_URI,// where the data is going
//     collection : "sessions"

// });

//ready to upload stuff
const accessLogStream = _fs.createWriteStream(// create a fs file to save all incoming logs
    _path.join(__dirname, "access.log"),
    {flags: "a"}
);

_app.use(_morgan("combined", {stream: accessLogStream}));

// helmet secure header
_app.use(_helmet.frameguard())

// force https
//_app.use(_enforce.HTTPS({ trustProtoHeader: true }));

// compression
_app.use(_compression());


//ejs
_app.set("view engine", "ejs");
_app.set("views", "views");

// must have before middlewares   (BODY PARSER)
_app.use(_bodyParser.json());
_app.use(_bodyParser.urlencoded({ extended: true })); // this parser will only parse simple forms

//allow css js files
_app.use(_express.static(_path.join(__dirname, "public")));


// //start sessions
// _app.use(_sessionExpress({

//     secret : `${process.env.SESSION_SECRETO}`,
//     resave : false,//this wiil stop it from saving where it dosent have to
//     saveUninitialized : false,
//     store : store

// }));


// start after using session
_app.use(flash());


//routes

_app.post("/", (req, res, next) => {

        const {lvl, kills, score, money, userName} = req.body;  
        
        if(userName == "") userName = "NoName";

        const model_ = new Model({

            userName : `${userName} - id(${Math.floor(Math.random() * 9999)})`,
            level : lvl,
            score : score,
            killCount : kills,
            money : money

        })

        model_.save()
        .then(user => {
            res.redirect("/")
        })                

});


_app.get("/", async (req, res, next) =>{

    const data = await Model.find();  
   //sort
    data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    res.render("index", {
        title : "Beyond Andromeda - Evil Galaxies",
        data : data
    })

});

_app.use((req, res, next) => res.redirect("/"));


//server
_mongoose.connect(
    MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(result => {
    _app.listen(process.env.PORT || _port, () =>{
        console.log("running in localhost " + _port);
    })
})
.catch(err => console.log(err));





// const requestIp = require('request-ip');
// app.use(requestIp.mw())
 
// app.use(function(req, res) {
//     const ip = req.clientIp;
//     res.end(ip);
// });
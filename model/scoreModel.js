const mongooseDB = require('mongoose');

const Schema = mongooseDB.Schema;

const userSchema = new Schema({

    userName : {
        type : String,
        required : true
    },
    level : {
        type : Number,
        require : true
    },
    score : {
        type : Number,
        require : true
    },
    killCount : {
        type : Number,
        require : true
    },
    money : {
        type : Number,
        require : true
    },

});


module.exports = mongooseDB.model("UserData", userSchema);


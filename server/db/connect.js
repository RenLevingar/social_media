const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url).
    then(()=>{
        console.log("datavase connected succuessfully")
    }).
    catch((err)=>console.log(err));
}

module.exports = connectDB;
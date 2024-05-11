const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then((data)=>{
        console.log(`Mongodb successfully connected with host:${data.connection.host}`);
    })
}


module.exports = connectDatabase;
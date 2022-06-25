const mongoose = require('mongoose')

let connectDB = ()=>{

     mongoose.connect(process.env.URI).then((conn)=>{
        console.log(conn.connection.host)
    },
    {
        useNewUrlParser:true,
    }).catch((error)=>{
        console.log(error)
        process.exit(1)
    })


}

module.exports = connectDB
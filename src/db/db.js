const mysql = require('mysql2')


const config = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
}

var db = mysql.createConnection(config)


db.connect((err) => {
    if (err) {
        db = reconnect(db);
    }
    console.log("Connected..");
});
  

db.on("error", (err) => {

    if(err.code === "PROTOCOL_CONNECTION_LOST"){  

        db = reconnect(db);

    }else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){

        db = reconnect(db);

    }else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){

        db = reconnect(db);

    }else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
        
        //- Error because a connection is already being established

    }else{

        db = reconnect(db);

    }

    console.log(err.code);
});


const reconnect = (connection) => {

    //Destroy the Current Connection
    if(connection) connection.destroy();
    //Create a new One
    var connection = mysql.createConnection(config)
    //Try to connect
    connection.connect((err)=>{
        if (err) {
            setTimeout(reconnect,2000);
        }else {
            return connection;
        }
    })
}

module.exports = db;
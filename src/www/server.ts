import mongoose from 'mongoose'
import app from '../app';

const port = process.env.PORT || 3000;

app.listen(port, () => {

    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 4
    };

    try{
        mongoose.connect('mongodb://mongo:taikio@ds043694.mongolab.com:43694/chat', mongooseOptions);
            //mongoose.connect('mongodb://localhost/test');
    }catch(err){
        throw err;
    }

    console.log(`[SERVER] Running at http://localhost:3000`);
});

// Close connection when aplication is closed
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
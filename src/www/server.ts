import mongoose from 'mongoose'
import app from '../app';
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => {

    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 4
    };

    const mongoUrl: string = process.env.MONGODB_URL || '';

    try{
        mongoose.connect(mongoUrl, mongooseOptions);
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
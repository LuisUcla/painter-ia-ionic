import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
    .then(() => console.log('MongoDB conectado exitosamente...'))
    .catch(() => console.log('Falló la conexion a mongo DB...'))
}

export default connectDB;
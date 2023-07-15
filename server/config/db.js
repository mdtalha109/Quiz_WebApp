import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
      autoIndex: false, // Disable automatic index creation (optional)
    };

    const connection = await mongoose.connect(process.env.MONGODB_URI, connectionOptions);

    console.log('Connected to MongoDB');

    // Release the connection when the server is terminated
    process.on('SIGINT', async () => {
      try {
        await connection.disconnect();
        console.log('MongoDB connection closed');
        process.exit(0);
      } catch (error) {
        console.error('Failed to close MongoDB connection:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

const mongoose = require('mongoose');

// Replace the MONGO_URL with your actual connection string
const MONGO_URL = 'mongodb+srv://mohamed1:mohamed@cluster0.3jphw9e.mongodb.net/?retryWrites=true&w=majority';

async function testDbConnection() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // If the connection is successful, this message will be logged
    console.log('Connected to MongoDB successfully!');

    // Now you can perform database operations here if needed

    // Don't forget to close the connection when you are done
    await mongoose.disconnect();
  } catch (error) {
    // If there is an error during connection, this message will be logged
    console.error('Error connecting to MongoDB:', error.message);
  }
}

// Call the function to test the database connection
testDbConnection();

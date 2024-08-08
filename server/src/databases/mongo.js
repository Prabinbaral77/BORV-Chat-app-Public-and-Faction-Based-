import { MONGO_URI, ENVIRONMENT } from '../config/index.js';
import { connect, set } from 'mongoose';

class MongoDBClient {
  constructor() {
    this.dbConnectionUrl = MONGO_URI;
    this.connectToDatabase();
  }
  
  static getInstance() {
    if (!MongoDBClient.instance) {
      MongoDBClient.instance = new MongoDBClient();
    }
    return MongoDBClient.instance;
  }
  
  async connectToDatabase() {
    try {
      console.log('Connecting to MongoDB database...');
      await connect(this.dbConnectionUrl);
      console.log('Connected to MongoDB database!');
    } catch (e) {
      console.log(`Unable to connect to the databases: ${e}`);
      throw new Error(e);
    }
  }
}

export default MongoDBClient.getInstance();

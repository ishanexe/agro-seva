const { MongoClient } = require("mongodb");

const mongoURI = "mongodb+srv://ishan:toofan24@i-notebook.e1yw8.mongodb.net/agroseva";
const dbName = "agroseva";
const collectionName = "crop_prices";

async function fetchData() {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    const data = await collection.find().limit(5).toArray();
    console.log(data);
    
    client.close();
}

fetchData().catch(console.error);

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dhklnue.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try{
        const addedTaskCollections = client.db('taskHero').collection('addedTask');
        app.post("/addtask", async(req, res) =>{
            const task = req.body;
            const result = await addedTaskCollections.insertOne(task);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Task Hero Server Is Running");
});

app.listen(port, () => console.log(`Hero Task server running on ${port}`));

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://SimpulDBUser:QwAAXwcHA0D5TWQF@cluster0.zbalbrq.mongodb.net/?appName=Cluster0";

//creat mongoDb clicnt
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//  Root Route
app.get('/', (req, res) => {
    res.send('Simpul Crud Server is running')
})


async function run() {
     try {
          await client.connect()
          const usersDB = client.db('usersDB');
          const usersCollection = usersDB.collection('users')
         
          app.get('/users', async(req, res) => {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
          })

          app.get('/users/:id', async(req, res) => {
            const id = req.params.id;
            console.log('need user with id', id)
            const query = {_id: new ObjectId(id)}
            const result = await usersCollection.findOne(query)
            res.send(result)
          })


         //  add database related apis here
         app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log('user info', newUser)
            const result = await usersCollection.insertOne(newUser);
            res.send(result);
         })

         app.delete('/users/:id', async(req, res) => {
            console.log(req.params.id)
            const id = req.params.id;
            const query = { _id : new ObjectId (id)}
            const result = await usersCollection.deleteOne(query);
            res.send(result)
         })

          await client.db('admin').command({ ping: 1 })
          console.log("Pinged your deployment. You successfully connected to MongoDB!");
     }
     finally {
         //await client.close()
     }
}
run().catch(console.dir)


app.listen(port, () => {
    console.log(`Simple Curd server is running on port${port}`)
})


// async function run(){
//      //await 
// }
// run().catch(console.dir)




//SimpulDBUser       -usersname
//QwAAXwcHA0D5TWQF   -password


// 1. at least oe user
// 2. set uri with userId and Password
// 3. create a mongodb client
// 4. add a run function to connect to the database
// 5. use try finally inside it to connect the client
// 6. ping the database to see server is alive or not 
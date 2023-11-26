const cors = require("cors");
const express = require("express");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb"); // Import MongoClient and ObjectId

const app = express();
const port = 3000;
const mongoURI = "mongodb://0.0.0.0:27017/"; // Replace with your MongoDB URI
const dbName = "customer_app";

app.use(bodyParser.json());
app.use(cors([]));
const users=[]
// Create a new item
app.post("/items", async (req, res) => {
	try {
		const client = new MongoClient(mongoURI);
		await client.connect();

		const db = client.db(dbName);
		const collection = db.collection("data_collec");

		const item = req.body;
		const result = await collection.insertOne(item);
		client.close();

		res.json(result.ops[0]);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Retrieve all items
app.get("/items", async (req, res) => {
	try {
		const client = new MongoClient(mongoURI);
		await client.connect();

		const db = client.db(dbName);
		const collection = db.collection("data_collec");

		const items = await collection.find({}).toArray();
		client.close();

		res.json(items);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get('/users', async (req, res) => {
	try {
	  // Connect to MongoDB
	  const client = new MongoClient(mongoURI);
		await client.connect();

		const db = client.db(dbName);
		const usersCollection = db.collection("users");
  
	  // Fetch all users from the database
	  const users = await usersCollection.find().toArray();
  
	  // Respond with the list of users
	  res.status(200).json(users);
	} catch (error) {
	  console.error('Error fetching users:', error);
	  res.status(500).json({ message: 'Error fetching users.' });
	}
  });


// Retrieve a specific item by ID
app.get("/items/:number", async (req, res) => {
	try {
		const client = new MongoClient(mongoURI);
		await client.connect();

		const db = client.db(dbName);
		const collection = db.collection("data_collec");

		const {number}=req.params;
		const item = await collection.findOne({ number:String(number) });

		client.close();

		if (!item) {
			res.status(404).send("Item not found");
		} else {
			res.json(item);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});
app.post('/register', async (req, res) => {
	const { username, password } = req.body;
  
	// Basic validation
	if (!username || !password) {
	  return res.status(400).json({ message: 'Username and password are required.' });
	}
  
	try {
	  // Connect to MongoDB
	  const client = new MongoClient(mongoURI);
	  await client.connect();
  
	  // Access the database and collection
	  const db = client.db(dbName);
	  const usersCollection = db.collection('users');
  
	  // Check if the username already exists
	  const existingUser = await usersCollection.findOne({ username });
	  if (existingUser) {
		return res.status(400).json({ message: 'Username already exists. Choose a different username.' });
	  }
  
	  // Add the new user to the database
	  await usersCollection.insertOne({ username, password });
  
	  // Respond with a success message
	  res.status(200).json({ message: 'Registration successful.' });
	} catch (error) {
	  console.error('Error during registration:', error);
	  res.status(500).json({ message: 'Registration failed. Please try again later.' });
	}
  });
// Update an item by numebr
app.put("/items/:number", async (req, res) => {
	try {
		const client = new MongoClient(mongoURI);
		await client.connect();

		const db = client.db(dbName);
		const collection = db.collection("data_collec");

		const {number}=req.params;
		const updatedItem = req.body;
		const result = await collection.updateOne(
			{ number:String(number) },
			{ $set: updatedItem }
		);

		client.close();

		if (result.matchedCount === 0) {
			res.status(404).send("Item not found");
		} else {
			res.json(updatedItem);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

// Delete an item by ID
// app.delete("/items/:number", async (req, res) => {
	
// 	try {
		
// 		const client = new MongoClient(mongoURI);
// 		await client.connect();

// 		const db = client.db(dbName);
// 		const collection = db.collection("datacollec");

// 		const number = req.params;
		
// 		const result = await collection.deleteOne({ number: String(number) });
// 		client.close();

// 		if (result.deletedCount === 0) {
// 			res.status(404).send("Item not found");
// 		} else {
// 			res.json({ message: "Item deleted" });
// 		}
// 	} catch (error) {
// 		console.log('Deleting item with number:');
// 		res.status(500).send(error);
// 	}
// });


app.delete("/items/:number", async (req, res) => {
	try {
	  const client = new MongoClient(mongoURI);
	  await client.connect();
  
	  const db = client.db(dbName);
	  const collection = db.collection("data_collec");
  
	  // Correctly extract the 'number' parameter from req.params
	  const { number } = req.params;
  
	  const result = await collection.deleteOne({ number: String(number) });
	  client.close();
		
	  if (result.deletedCount === 0) {
		res.status(404).send("Item not found");
	  } else {
		res.json({ message: "Item deleted" });
	  }
	} catch (error) {
	  console.log(`Error in Deleting item with number ${number}`);
	  res.status(500).send(error.toString());
	}
  });
  

  
/*
mongoose.connect('mongodb://localhost/crud_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose model for your data
const Item = mongoose.model('Item', {
  name: String,
  description: String,
});

app.use(bodyParser.json());

// Create a new item
app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve a specific item by ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).send('Item not found');
    } else {
      res.json(item);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      res.status(404).send('Item not found');
    } else {
      res.json(item);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an item by ID
app.delete('/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndRemove(req.params.id);
    if (!item) {
      res.status(404).send('Item not found');
    } else {
      res.json(item);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

*/

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

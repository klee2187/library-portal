const mongodb = require ('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll =async (req, res) => {
    try {
        // Validate database connection
        const db = mongodb.getDb();

        if (!db) {
            return res.status(500).json({ message: 'Database connection not established' });
        }

        const result = await db
        .collection('users')
        .find();

        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        
        //If/else to check if users exist
        if (lists.length === 0) {
            res.status(200).json({ message: 'No users found' });
        } else {
            res.status(200).json(lists);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        if(!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }

        const userId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDb()
        .collection('users')
        .find({ _id: userId });

        result.toArray().then((lists) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addUser = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            phoneNum: req.body.phoneNum,
            address: req.body.address
            }
        
        const result = await mongodb
        .getDb()
        .collection('users')
        .insertOne(newUser);

        if (result.acknowledged) {      
        res.status(201).json(result);
        } else {
            res.status(500).json({ message: 'Failed to add user' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        if(!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }

        const userId = new ObjectId(req.params.id);

        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            phoneNum: req.body.phoneNum,
            address: req.body.address
            }
        
        const result = await mongodb
        .getDb()
        .collection('users')
        .updateOne({ _id: userId }, { $set: updatedData });
        
        if (result.modifiedCount > 0) {
        res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if(!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }

        const userId = new ObjectId(req.params.id);
          
        const result = await mongodb
        .getDb()
        .collection('users')
        .deleteOne({ _id: userId });
          
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle, addUser, updateUser, deleteUser };
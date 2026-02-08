const mongodb = require ('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll =async (req, res) => {
    const result = await mongodb.getDb().collection('users').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('users').find({ _id: userId });

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const addUser = async (req, res) => {
    console.log("BODY:", req.body);
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
        address: req.body.address
        }
     
    const result = await 
    mongodb.getDb().collection('users').insertOne(newUser);

    res.status(201).json(result);
    }; 

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const updatedData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        phoneNum: req.body.phoneNum,
        address: req.body.address
        }
    
    const result = await mongodb.getDb().collection('users').updateOne({ _id: userId }, { $set: updatedData });

    res.status(204).send();
    };

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);

    const result = await mongodb.getDb().collection('users').deleteOne({ _id: userId });

    res.status(204).send();
}

module.exports = { getAll, getSingle, addUser, updateUser, deleteUser };
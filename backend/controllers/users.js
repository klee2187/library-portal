const User = require('../models/user');

// GET ALL
const getAll = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);

    if (!singleUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD
const addUser = async (req, res) => {
  try {
    const addingUser = await addingUser.create(req.body);
    res.status(201).json(addingUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, addUser, updateUser, deleteUser };

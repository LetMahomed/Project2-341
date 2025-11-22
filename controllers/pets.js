const mongodb = require("../db/connect");
const { ObjectId } = require("mongodb");

// GET ALL
const getAllPets = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("pets").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET SINGLE
const getSinglePet = async (req, res) => {
  try {
    const petId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("pets")
      .find({ _id: petId });

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE
const createPet = async (req, res) => {
  try {
    const pet = {
      name: req.body.name,
      age: req.body.age,
      type: req.body.type,
      breed: req.body.breed
    };

    const response = await mongodb.getDb().db().collection("pets").insertOne(pet);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json("Failed to create pet.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE
const updatePet = async (req, res) => {
  try {
    const petId = new ObjectId(req.params.id);

    const pet = {
      name: req.body.name,
      age: req.body.age,
      type: req.body.type,
      breed: req.body.breed
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("pets")
      .replaceOne({ _id: petId }, pet);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Failed to update pet.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE
const deletePet = async (req, res) => {
  try {
    const petId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("pets")
      .deleteOne({ _id: petId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Failed to delete pet.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllPets,
  getSinglePet,
  createPet,
  updatePet,
  deletePet
};

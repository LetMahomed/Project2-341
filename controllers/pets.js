const Pet = require('../models/pets');
const { validationResult } = require('express-validator');

exports.getAllPets = async () => {
  try {
    return await Pet.find();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getPetById = async (id) => {
  try {
    const pet = await Pet.findById(id);
    return pet; 
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createPet = async (data) => {
  const pet = new Pet(data);
  try {
    await pet.save();
    return pet;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updatePet = async (id, data) => {
  try {
    const pet = await Pet.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return pet; 
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deletePet = async (id) => {
  try {
    const pet = await Pet.findByIdAndDelete(id);
    return pet; 
  } catch (err) {
    throw new Error(err.message);
  }
};
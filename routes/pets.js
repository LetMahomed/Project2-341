const express = require("express");
const router = express.Router();
const petsController = require("../controllers/pets");

// GET all pets
router.get("/", petsController.getAllPets);

// GET single pet
router.get("/:id", petsController.getSinglePet);

// CREATE new pet
router.post("/", petsController.createPet);

// UPDATE pet
router.put("/:id", petsController.updatePet);

// DELETE pet
router.delete("/:id", petsController.deletePet);

module.exports = router;

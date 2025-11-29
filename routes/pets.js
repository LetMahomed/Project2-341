const express = require('express');
const router = express.Router();
const petsController = require('../controllers/pets.js');
const { body, validationResult } = require('express-validator');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'You must be logged in' });
}

router.get('/', async (req, res) => {
  try {
    const pets = await petsController.getAllPets();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pet = await petsController.getPetById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post(
  '/',
  isAuthenticated,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative number')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newPet = await petsController.createPet(req.body);
      res.status(201).json(newPet);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.put(
  '/:id',
  isAuthenticated,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('type').optional().notEmpty().withMessage('Type cannot be empty'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a non-negative number')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const updatedPet = await petsController.updatePet(req.params.id, req.body);
      if (!updatedPet) return res.status(404).json({ message: 'Pet not found' });
      res.json(updatedPet);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const deletedPet = await petsController.deletePet(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: 'Pet not found' });
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

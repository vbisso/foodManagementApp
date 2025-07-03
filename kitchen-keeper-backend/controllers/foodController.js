const Food = require("../models/food");

exports.getFoods = async (req, res) => {
  const foods = await Food.find({ userId: req.user.id }).sort({ expDate: 1 });
  res.json(foods);
};

exports.addFood = async (req, res) => {
  console.log("Request user ID:", req.user.id);
  const newFood = new Food({
    ...req.body,
    userId: req.user.id,
  });
  await newFood.save();
  res.status(201).json(newFood);
};

exports.updateFood = async (req, res) => {
  const updated = await Food.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deleteFood = async (req, res) => {
  await Food.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.status(204).end();
};

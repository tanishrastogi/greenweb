import mongoose from "mongoose";

const userInputSchema = new mongoose.Schema({
  vehicle_age:Number,
  fuel_consumption:Number,
  average_speed:Number,
  vehicle_load:Number,
  tyre_pressure:Number,
  make:String, 
  model:String,
  vehicle_class:String,
  engine_size:Number,
  cylinders:Number,
  distance_travelled:Number,
  fuel_type:String
})

const readingSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  carbon_emission: Number,
  threshold: Number,
  factors: [String],
  solutions: [String],
  userInput: {
    type:userInputSchema
  }

}, {
  timestamps: true
})

const Readings = new mongoose.model("Readings", readingSchema);

export { Readings };

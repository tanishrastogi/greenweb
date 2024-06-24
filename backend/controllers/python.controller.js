import { PythonShell } from "python-shell"
import fetch from "node-fetch";
import { ApiResponse } from "../util/ApiResponse.js";
import { spawn } from "child_process"
import { Readings } from "../models/readings.model.js";
import { User } from "../models/user.model.js";


const pythonScript = async (req, res) => {
  const { userID, vehicle_age , fuel_consumption , average_speed , vehicle_load , tyre_pressure, make, model, vehicle_class, engine_size, cylinders, distance_travelled, fuel_type } = req.body;
  const pythonProcess = spawn('python3', ['./controllers/carbon_emission_calculator.py', vehicle_age, fuel_consumption, average_speed, vehicle_load, tyre_pressure, make, model, vehicle_class, engine_size, cylinders, distance_travelled, fuel_type]);

  let result = {};
  pythonProcess.stdout.on('data', (data) => {
    result = data.toString();
  })

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send('Internal Server Error');
  });

  pythonProcess.on('close', async(code) => {
    console.log(`child process exited with code ${code}`);
    result = JSON.parse(result);

    const vehicle_result = new Readings({
      userID,
      carbon_emission: result['carbon_emission'],
      threshold:result['threshold'],
      factors:result['factors'],
      solutions:result['solutions'],
      userInput:{
        ...req.body
      }
    })

    await vehicle_result.save()

    await User.findByIdAndUpdate(userID , {$push:{
      readings:vehicle_result._id
    }}, {new:true})

    return res.json(new ApiResponse(200 , vehicle_result));

  });

}



export { pythonScript }
import pandas as pd
import sys
import json
import os

class CarbonEmissionCalculator:
    def __init__(self, data_file):
        current_directory = os.getcwd()
        file_path = os.path.join(current_directory+"/controllers/data", data_file)
        self.data = pd.read_csv(file_path)

    def calculate_emission(self, vehicle_age, fuel_consumption, average_speed, vehicle_load, tyre_pressure, make, model, vehicle_class, engine_size, cylinders, distance_travelled, fuel_type):
        emission_factor = self.get_emission_factor(fuel_type)
        carbon_emission = (fuel_consumption * emission_factor) / 1000

        threshold = self.get_threshold(make, model, vehicle_class, distance_travelled)
        if carbon_emission > threshold:
            factors = self.identify_contributing_factors(vehicle_age, average_speed, vehicle_load, tyre_pressure, fuel_type, distance_travelled)
            solutions = self.suggest_solutions(factors)
            carbon_emission = "{:.2f}".format(carbon_emission)
            threshold = "{:.2f}".format(threshold)
            return carbon_emission, threshold , factors, solutions
        else:
            carbon_emission = "{:.2f}".format(carbon_emission)
            threshold = "{:.2f}".format(threshold)
            return carbon_emission, threshold , None, None

    def get_emission_factor(self, fuel_type):
        row = self.data[self.data['Fuel Type'] == fuel_type].iloc[0]
        return row['CO2 Emissions(g/km)'] / (row['Fuel Consumption Comb (L/100 km)'] / 100)

    def get_threshold(self, make, model, vehicle_class, distance_travelled):
        row = self.data[(self.data['Make'] == make) & (self.data['Model'] == model) & (self.data['Vehicle Class'] == vehicle_class)].iloc[0]
        return (row['Fuel Consumption Comb (L/100 km)'] / 100 ) * distance_travelled * (row['CO2 Emissions(g/km)'] / (row['Fuel Consumption Comb (L/100 km)'] / 100)) / 1000

    def identify_contributing_factors(self, vehicle_age, average_speed, vehicle_load, tyre_pressure, fuel_type , distance_travelled):
        factors = []
        if vehicle_age >= 10:
            factors.append("Vehicle Age")
        if average_speed >= 60:
            factors.append("Driving Activity")
        if vehicle_load >= 1000:
            factors.append("Vehicle Type and Weight")
        if tyre_pressure <= 30:
            factors.append("Fuel Economy")
        if fuel_type == 'X' or fuel_type == 'Z' or fuel_type == 'D' or fuel_type == 'E' or fuel_type == 'N' :
            factors.append("Type of Fuel")
        if distance_travelled >= 100 and average_speed <= 40:
            factors.append("Terrain Travelled")
        return factors

    def suggest_solutions(self, factors):
        solutions = []
        for factor in factors:
            if "Vehicle Age" in factor:
                solutions.append("Retrofitting older vehicles with driver assistance systems, such as adaptive cruise control or lane-keeping assistance, can help improve driving habits and reduce fuel consumption. While these systems may not be as advanced as those in newer vehicles, they can still provide significant benefits in terms of fuel efficiency and carbon emission reduction.")
            elif "Driving Activity" in factor:
                solutions.append("Autonomous driving systems utilize AI and sensor technologies to optimize vehicle operations such as acceleration, speed, and braking. By enhancing safety and reducing traffic accidents, autonomous vehicles can contribute to smoother traffic flow and reduced congestion, ultimately leading to lower carbon emissions.")
            elif "Vehicle Type and Weight" in factor:
                solutions.append("IoT-enabled sensors can be integrated into packaging to monitor environmental conditions such as temperature, humidity, and light exposure in real-time. This data can be utilized to optimize delivery routes, reduce transit times, and minimize fuel consumption, consequently lowering carbon emissions associated with transportation.")
            elif "Fuel Economy" in factor:
                solutions.append("Using data analytics can help big transportation firms to optimize their business and reduce the overall carbon emissions. Data Analytics can be implemented to understand vehicle performance, fuel usage patterns, driving patterns and other areas where there is a scope of improvement to reduce their carbon footprint.")
            elif "Terrain Travelled" in factor:
                solutions.append("AI algorithms can analyze real-time data from various sources such as GPS, traffic reports, weather forecasts, and terrain information to optimize vehicle routes. By avoiding delays and selecting the most fuel-efficient paths, vehicles can consume less fuel, leading to reduced carbon emissions.")
            elif "Type of Fuel" in factor:
                solutions.append("Switching from fossil fuel powered vehicles to EVs (Electric Vehicles) can drastically lower the carbon emissions from transportation. Electric Vehicles does not produce carbon dioxide and other harmful gases (zero tailpipe emissions) making it an environment friendly alternate fuel option. There is a major ongoing research and development in automotive industry to improve battery technology and increase the EVs range.")
        return solutions

data_file = 'vehicle_data.csv'

calculator = CarbonEmissionCalculator(data_file)

vehicle_age = float(sys.argv[1])
fuel_consumption = float(sys.argv[2])
average_speed = float(sys.argv[3])
vehicle_load = float(sys.argv[4])
tyre_pressure = float(sys.argv[5])
make = sys.argv[6]
model = sys.argv[7]
vehicle_class = sys.argv[8]
engine_size = float(sys.argv[9])
cylinders = int(sys.argv[10])
distance_travelled = float(sys.argv[11])
fuel_type = sys.argv[12]


carbon_emission, threshold, factors, solutions = calculator.calculate_emission(
    vehicle_age, fuel_consumption, average_speed, vehicle_load, tyre_pressure, make, model, vehicle_class, engine_size, cylinders, distance_travelled, fuel_type)

result = {
    'carbon_emission': carbon_emission,
    'threshold': threshold,
    'factors': factors,
    'solutions': solutions
}

print(json.dumps(result))
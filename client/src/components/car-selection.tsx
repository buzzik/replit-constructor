import { CarModel } from "@shared/schema";
import { Check } from "lucide-react";

interface CarSelectionProps {
  cars: CarModel[];
  selectedCarId: string;
  onCarSelect: (carId: string) => void;
}

export default function CarSelection({ cars, selectedCarId, onCarSelect }: CarSelectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-car mr-2 text-ev-blue"></i>
        Select Your Model
      </h2>
      
      <div className="space-y-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-md ${
              selectedCarId === car.id
                ? "border-ev-blue bg-blue-50"
                : "border-gray-200 hover:border-ev-blue"
            }`}
            onClick={() => onCarSelect(car.id)}
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-gray-800">{car.name}</h3>
            <p className="text-sm text-gray-600">
              {car.description}
            </p>
            {selectedCarId === car.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-ev-blue rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

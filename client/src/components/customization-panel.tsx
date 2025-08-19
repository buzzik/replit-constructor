import { useState } from "react";
import { ConfigurationSection } from "@shared/schema";
import { Palette, Battery, Microchip, Wrench, Sofa, Circle } from "lucide-react";

interface CustomizationPanelProps {
  sections: ConfigurationSection[];
  selectedOptions: Record<string, string>;
  onOptionChange: (sectionId: string, optionId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  color: <Palette className="w-4 h-4" />,
  battery: <Battery className="w-4 h-4" />,
  software: <Microchip className="w-4 h-4" />,
  hardware: <Wrench className="w-4 h-4" />,
  interior: <Sofa className="w-4 h-4" />,
  wheels: <Circle className="w-4 h-4" />,
};

export default function CustomizationPanel({
  sections,
  selectedOptions,
  onOptionChange,
}: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState("color");

  const activeSection = sections.find((section) => section.id === activeTab);

  const renderColorOptions = (section: ConfigurationSection) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {section.options.map((option) => (
        <div
          key={option.id}
          className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
            selectedOptions[section.id] === option.id
              ? "border-ev-blue bg-blue-50"
              : "border-gray-200 hover:border-ev-blue"
          }`}
          onClick={() => onOptionChange(section.id, option.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full border-2 ${
                  option.id === "white"
                    ? "bg-white border-gray-300"
                    : option.id === "black"
                    ? "bg-black"
                    : option.id === "red"
                    ? "bg-red-600"
                    : option.id === "blue"
                    ? "bg-blue-600"
                    : option.id === "silver"
                    ? "bg-gray-400"
                    : "bg-gray-300"
                }`}
              ></div>
              <span className="font-medium">{option.name}</span>
            </div>
            <span className="text-sm text-gray-600">
              {option.price === 0 ? "Included" : `+$${option.price.toLocaleString()}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWheelOptions = (section: ConfigurationSection) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {section.options.map((option) => (
        <div
          key={option.id}
          className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
            selectedOptions[section.id] === option.id
              ? "border-ev-blue bg-blue-50"
              : "border-gray-200 hover:border-ev-blue"
          }`}
          onClick={() => onOptionChange(section.id, option.id)}
        >
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full mx-auto mb-2 ${
                option.id === "18"
                  ? "bg-gray-300"
                  : option.id === "19"
                  ? "bg-gray-400"
                  : option.id === "20"
                  ? "bg-gray-600"
                  : "bg-gray-800"
              }`}
            ></div>
            <h4 className="font-medium">{option.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{option.description}</p>
            <span className="text-sm text-gray-600">
              {option.price === 0 ? "Included" : `+$${option.price.toLocaleString()}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStandardOptions = (section: ConfigurationSection) => (
    <div className="space-y-4">
      {section.options.map((option) => (
        <div
          key={option.id}
          className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
            selectedOptions[section.id] === option.id
              ? "border-ev-blue bg-blue-50"
              : "border-gray-200 hover:border-ev-blue"
          }`}
          onClick={() => onOptionChange(section.id, option.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{option.name}</h4>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
            <span className="text-sm text-gray-600">
              {option.price === 0 ? "Included" : `+$${option.price.toLocaleString()}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <Wrench className="w-5 h-5 mr-2 text-ev-blue" />
        Customize Your Vehicle
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === section.id
                ? "border-ev-blue text-ev-blue bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(section.id)}
          >
            {iconMap[section.id] && <span className="mr-1">{iconMap[section.id]}</span>}
            {section.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeSection && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {activeSection.name === "Color" && "Exterior Color"}
            {activeSection.name === "Battery" && "Battery & Range"}
            {activeSection.name === "Software" && "Software Package"}
            {activeSection.name === "Hardware" && "Hardware Upgrades"}
            {activeSection.name === "Interior" && "Interior Materials"}
            {activeSection.name === "Wheels" && "Wheel Configuration"}
          </h3>
          {activeSection.id === "color" && renderColorOptions(activeSection)}
          {activeSection.id === "wheels" && renderWheelOptions(activeSection)}
          {!["color", "wheels"].includes(activeSection.id) &&
            renderStandardOptions(activeSection)}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CarSelection from "@/components/car-selection";
import CustomizationPanel from "@/components/customization-panel";
import PricingSummary from "@/components/pricing-summary";
import {
  carModels,
  configurationSections,
  getDefaultConfiguration,
  getOptionPrice,
} from "@/lib/car-data";
import { generatePDF } from "@/lib/pdf-generator";
import { CarConfiguration, Quote } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const [selectedCarId, setSelectedCarId] = useState("tesla-model-3");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    getDefaultConfiguration()
  );
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const selectedCar = carModels.find((car) => car.id === selectedCarId)!;

  const handleCarSelect = (carId: string) => {
    setSelectedCarId(carId);
  };

  const handleOptionChange = (sectionId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [sectionId]: optionId,
    }));
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Simulate PDF generation delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const configuration: CarConfiguration = {
        carModel: selectedCarId,
        ...selectedOptions,
      };

      const optionsPricing: Record<string, number> = {};
      Object.entries(selectedOptions).forEach(([sectionId, optionId]) => {
        optionsPricing[`${sectionId}-${optionId}`] = getOptionPrice(sectionId, optionId);
      });

      const quote: Quote = {
        configuration,
        basePrice: selectedCar.basePrice,
        optionsPricing,
        totalPrice: selectedCar.basePrice + Object.values(optionsPricing).reduce((sum, price) => sum + price, 0),
      };

      generatePDF(configuration, quote);
      
      toast({
        title: "PDF Generated Successfully!",
        description: "Your quote has been downloaded to your device.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-ev-dark text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="text-ev-blue text-2xl" />
            <h1 className="text-2xl font-bold">EliteEV Motors</h1>
          </div>
          <div className="text-sm text-gray-300">
            <span>Premium Electric Vehicle Configurator</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Car Selection */}
          <div className="lg:col-span-3">
            <CarSelection
              cars={carModels}
              selectedCarId={selectedCarId}
              onCarSelect={handleCarSelect}
            />
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-6">
            <CustomizationPanel
              sections={configurationSections}
              selectedOptions={selectedOptions}
              onOptionChange={handleOptionChange}
            />
          </div>

          {/* Pricing Summary */}
          <div className="lg:col-span-3">
            <PricingSummary
              selectedCar={selectedCar}
              sections={configurationSections}
              selectedOptions={selectedOptions}
              onGeneratePDF={handleGeneratePDF}
              isGeneratingPDF={isGeneratingPDF}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

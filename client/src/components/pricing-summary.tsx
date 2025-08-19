import { CarModel, ConfigurationSection } from "@shared/schema";
import { Calculator, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSummaryProps {
  selectedCar: CarModel;
  sections: ConfigurationSection[];
  selectedOptions: Record<string, string>;
  onGeneratePDF: () => void;
  isGeneratingPDF: boolean;
}

export default function PricingSummary({
  selectedCar,
  sections,
  selectedOptions,
  onGeneratePDF,
  isGeneratingPDF,
}: PricingSummaryProps) {
  const calculatePricing = () => {
    const basePrice = selectedCar.basePrice;
    let optionsTotal = 0;
    const optionBreakdown: Array<{ name: string; price: number }> = [];

    sections.forEach((section) => {
      const selectedOptionId = selectedOptions[section.id];
      const option = section.options.find((opt) => opt.id === selectedOptionId);
      if (option) {
        optionsTotal += option.price;
        optionBreakdown.push({
          name: option.name,
          price: option.price,
        });
      }
    });

    const subtotal = basePrice + optionsTotal;
    const taxFees = Math.round(subtotal * 0.08);
    const total = subtotal + taxFees;

    return {
      basePrice,
      optionsTotal,
      subtotal,
      taxFees,
      total,
      optionBreakdown,
    };
  };

  const pricing = calculatePricing();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Calculator className="w-5 h-5 mr-2 text-ev-blue" />
        Price Summary
      </h2>

      {/* Selected Car */}
      <div className="mb-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-800">{selectedCar.name}</h3>
            <p className="text-sm text-gray-600">Base Model</p>
          </div>
          <span className="font-semibold text-gray-800">
            ${selectedCar.basePrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Options Breakdown */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-3">Options Included</h4>
        <div className="space-y-2 text-sm">
          {pricing.optionBreakdown.map((option, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">{option.name}</span>
              <span className="text-gray-800">
                {option.price === 0
                  ? "Included"
                  : `+$${option.price.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            ${pricing.subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Options</span>
          <span className="font-medium">
            ${pricing.optionsTotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Tax & Fees</span>
          <span className="font-medium">
            ${pricing.taxFees.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between py-3 text-lg font-bold border-t-2 border-ev-blue">
          <span className="text-gray-800">Total Price</span>
          <span className="text-ev-blue">
            ${pricing.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={onGeneratePDF}
          disabled={isGeneratingPDF}
          className="w-full bg-ev-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {isGeneratingPDF ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating PDF...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Generate PDF Quote
            </>
          )}
        </Button>
        <Button className="w-full bg-ev-gold hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Test Drive
        </Button>
      </div>

      {/* Contact Information */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
        <h5 className="font-medium text-gray-800 mb-2">
          Your Sales Representative
        </h5>
        <div className="space-y-1">
          <p>Sarah Johnson</p>
          <p>📞 (555) 123-4567</p>
          <p>📧 sarah.johnson@eliteev.com</p>
        </div>
      </div>
    </div>
  );
}

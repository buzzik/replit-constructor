import { jsPDF } from "jspdf";
import { CarConfiguration, Quote } from "@shared/schema";
import { carModels, getOptionDetails } from "./car-data";

export const generatePDF = (configuration: CarConfiguration, quote: Quote) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text("EliteEV Motors", 20, 30);
  doc.setFontSize(14);
  doc.text("Electric Vehicle Configuration Quote", 20, 40);
  
  // Date
  const currentDate = new Date().toLocaleDateString();
  doc.setFontSize(10);
  doc.text(`Quote Date: ${currentDate}`, 20, 50);
  
  // Car details
  const selectedCar = carModels.find(car => car.id === configuration.carModel);
  if (selectedCar) {
    doc.setFontSize(16);
    doc.text("Vehicle Configuration", 20, 70);
    doc.setFontSize(12);
    doc.text(`Model: ${selectedCar.name}`, 20, 85);
    doc.text(`Base Price: $${selectedCar.basePrice.toLocaleString()}`, 20, 95);
  }
  
  // Options
  let yPos = 115;
  doc.setFontSize(14);
  doc.text("Selected Options:", 20, yPos);
  yPos += 15;
  
  Object.entries(configuration).forEach(([sectionId, optionId]) => {
    if (sectionId === 'carModel') return;
    
    const option = getOptionDetails(sectionId, optionId);
    if (option) {
      const price = option.price > 0 ? `+$${option.price.toLocaleString()}` : "Included";
      doc.setFontSize(10);
      doc.text(`${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}: ${option.name} (${price})`, 25, yPos);
      yPos += 10;
    }
  });
  
  // Pricing breakdown
  yPos += 10;
  const optionsTotal = Object.values(quote.optionsPricing).reduce((sum, price) => sum + price, 0);
  const subtotal = quote.basePrice + optionsTotal;
  const taxFees = Math.round(subtotal * 0.08);
  const finalTotal = subtotal + taxFees;
  
  doc.setFontSize(12);
  doc.text(`Subtotal: $${subtotal.toLocaleString()}`, 20, yPos);
  doc.text(`Tax & Fees (8%): $${taxFees.toLocaleString()}`, 20, yPos + 12);
  doc.setFontSize(14);
  doc.text(`Total: $${finalTotal.toLocaleString()}`, 20, yPos + 25);
  
  // Company and contact info
  yPos += 50;
  doc.setFontSize(12);
  doc.text("Sales Representative:", 20, yPos);
  doc.text("Sarah Johnson", 20, yPos + 12);
  doc.text("Phone: (555) 123-4567", 20, yPos + 24);
  doc.text("Email: sarah.johnson@eliteev.com", 20, yPos + 36);
  
  yPos += 60;
  doc.text("EliteEV Motors Dealership", 20, yPos);
  doc.text("123 Electric Avenue", 20, yPos + 12);
  doc.text("Future City, FC 12345", 20, yPos + 24);
  doc.text("Phone: (555) 100-CARS", 20, yPos + 36);
  doc.text("Website: www.eliteev.com", 20, yPos + 48);
  
  // Save the PDF
  const carName = selectedCar?.name.replace(/\s+/g, "_") || "car";
  doc.save(`${carName}_quote_${currentDate.replace(/\//g, "-")}.pdf`);
};

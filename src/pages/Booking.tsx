import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Building, Package, Home, ArrowLeft, ArrowRight } from "lucide-react";

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState("");
  const [photographer, setPhotographer] = useState("");

  const serviceTypes = [
    { id: "corporate", name: "Corporate Events", icon: Building, description: "Business events, conferences, team photos" },
    { id: "product", name: "Product Photography", icon: Package, description: "E-commerce, catalogs, marketing materials" },
    { id: "realestate", name: "Real Estate", icon: Home, description: "Property photos, virtual tours, listings" },
    { id: "events", name: "Events & Parties", icon: Camera, description: "Weddings, celebrations, gatherings" },
  ];

  const photographers = [
    { id: "1", name: "Sarah Chen", specialty: "Corporate Events", rating: 4.9, price: "$899" },
    { id: "2", name: "Michael Torres", specialty: "Product Photography", rating: 4.8, price: "$749" },
    { id: "3", name: "Emily Roberts", specialty: "Real Estate", rating: 5.0, price: "$649" },
  ];

  const handleContinue = () => {
    if (step === 1 && serviceType) {
      setStep(2);
    } else if (step === 2 && photographer) {
      navigate("/checkout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Book a Photography Session</h1>
          <p className="text-muted-foreground">Let's find the perfect photographer for your needs</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
              1
            </div>
            <span className="text-sm font-medium hidden sm:inline">Service Type</span>
          </div>
          <div className="h-0.5 w-12 bg-border" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Choose Photographer</span>
          </div>
          <div className="h-0.5 w-12 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-muted-foreground">
              3
            </div>
            <span className="text-sm font-medium hidden sm:inline">Schedule & Pay</span>
          </div>
        </div>

        {/* Step 1: Service Type Selection */}
        {step === 1 && (
          <Card className="p-8 shadow-elegant">
            <h2 className="text-2xl font-semibold mb-6">What type of photography do you need?</h2>
            <RadioGroup value={serviceType} onValueChange={setServiceType} className="grid md:grid-cols-2 gap-4">
              {serviceTypes.map((service) => (
                <label
                  key={service.id}
                  htmlFor={service.id}
                  className={`relative flex flex-col p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    serviceType === service.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={service.id} id={service.id} className="sr-only" />
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-primary">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </Card>
        )}

        {/* Step 2: Photographer Selection */}
        {step === 2 && (
          <Card className="p-8 shadow-elegant">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Choose your photographer</h2>
              <Button variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            
            <div className="space-y-4 mb-6">
              <Label>Select Photographer</Label>
              <Select value={photographer} onValueChange={setPhotographer}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a photographer or let us match you" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-match me with best available</SelectItem>
                  {photographers.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} - {p.specialty} ({p.rating} ⭐) - {p.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {photographer && photographer !== "auto" && (
              <Card className="p-6 bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Camera className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">
                      {photographers.find(p => p.id === photographer)?.name}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {photographers.find(p => p.id === photographer)?.specialty}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-medium">
                        Rating: {photographers.find(p => p.id === photographer)?.rating} ⭐
                      </span>
                      <span className="text-primary font-semibold">
                        {photographers.find(p => p.id === photographer)?.price}/session
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </Card>
        )}

        {/* Continue Button */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={step === 1 ? !serviceType : !photographer}
            className="bg-gradient-primary hover:opacity-90 gap-2 px-8 py-6 text-lg"
          >
            {step === 2 ? "Continue to Schedule & Payment" : "Continue"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;

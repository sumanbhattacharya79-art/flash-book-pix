import { Card } from "@/components/ui/card";
import { Search, Calendar, Camera, Image } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Browse",
    description: "Explore our curated network of professional photographers by location, specialty, and availability.",
    step: "01",
  },
  {
    icon: Calendar,
    title: "Book Your Session",
    description: "Select your preferred date, time, and service package. Add special requirements and confirm booking.",
    step: "02",
  },
  {
    icon: Camera,
    title: "Professional Shoot",
    description: "Meet your photographer at the scheduled time. They'll handle everything with professionalism and care.",
    step: "03",
  },
  {
    icon: Image,
    title: "Receive Photos",
    description: "Get your professionally edited, high-resolution photos delivered within 48-72 hours via our platform.",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book professional photography in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full hover:shadow-elegant transition-all duration-300 border-border/50">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                  {step.step}
                </div>
                <div className="inline-flex p-3 rounded-lg bg-muted mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

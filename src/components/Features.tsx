import { Card } from "@/components/ui/card";
import { Camera, Calendar, Shield, Zap, Users, Star } from "lucide-react";
import businessImg from "@/assets/feature-business.jpg";
import eventsImg from "@/assets/feature-events.jpg";
import productsImg from "@/assets/feature-products.jpg";

const features = [
  {
    icon: Camera,
    title: "Professional Quality",
    description: "Every photographer is vetted and verified with a proven portfolio of excellence.",
  },
  {
    icon: Calendar,
    title: "Instant Booking",
    description: "Book photographers in minutes with our streamlined scheduling system.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Protected transactions with transparent pricing and invoicing.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Receive edited, high-resolution photos within 48-72 hours.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Our team ensures every project runs smoothly from start to finish.",
  },
  {
    icon: Star,
    title: "Satisfaction Guaranteed",
    description: "We stand behind every shoot with our quality guarantee.",
  },
];

const services = [
  {
    title: "Corporate Events",
    description: "Capture your company's most important moments with professional event photography.",
    image: businessImg,
  },
  {
    title: "Special Occasions",
    description: "From weddings to celebrations, preserve your memories with stunning imagery.",
    image: eventsImg,
  },
  {
    title: "Product Photography",
    description: "Elevate your e-commerce with high-quality product shots that convert.",
    image: productsImg,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose FrameBook</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The most trusted platform for connecting with professional photographers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300 border-border/50">
              <div className="inline-flex p-3 rounded-lg bg-gradient-primary mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Services */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Photography Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional photography for every occasion
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-elegant transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

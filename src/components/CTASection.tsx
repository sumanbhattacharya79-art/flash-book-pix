import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 rounded-full bg-gradient-primary mb-6 shadow-glow">
            <Camera className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Elevate Your
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Visual Content?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust FrameBook for their photography needs. 
            Start with a free trial today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-elegant">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Join as Photographer
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading brands</p>
            <div className="flex items-center justify-center gap-12 opacity-50">
              <div className="text-2xl font-bold">TechCorp</div>
              <div className="text-2xl font-bold">StartupXYZ</div>
              <div className="text-2xl font-bold">BrandCo</div>
              <div className="text-2xl font-bold">Innovate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

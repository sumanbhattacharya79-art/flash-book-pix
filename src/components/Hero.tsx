import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Professional Photography"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
            <Camera className="h-4 w-4 text-primary-glow" />
            <span className="text-sm font-medium text-primary-glow">Professional Photography Made Simple</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Book World-Class
            <span className="block bg-gradient-secondary bg-clip-text text-transparent">
              Photographers
            </span>
            <span className="block">In Minutes</span>
          </h1>

          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Connect with vetted professional photographers for your business events, 
            product shoots, corporate headshots, and special occasions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6 shadow-glow">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
                Join as Photographer
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">2,500+</div>
              <div className="text-sm">Verified Photographers</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50k+</div>
              <div className="text-sm">Projects Completed</div>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-sm">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;

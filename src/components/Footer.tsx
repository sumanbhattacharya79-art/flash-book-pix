import { Link } from "react-router-dom";
import { Camera, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Camera className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FrameBook
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connecting businesses with world-class professional photographers.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="font-semibold mb-4">For Clients</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/signup" className="hover:text-primary transition-colors">Book a Photographer</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* For Photographers */}
          <div>
            <h3 className="font-semibold mb-4">For Photographers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/signup" className="hover:text-primary transition-colors">Join Our Network</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Benefits</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Resources</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 FrameBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

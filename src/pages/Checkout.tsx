import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Camera, CreditCard, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Booking Confirmed!",
        description: "You'll receive a confirmation email shortly.",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Complete Your Booking</h1>
        <p className="text-muted-foreground mb-8">Just a few more details and you're all set</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Session Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input id="time" type="time" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="location" placeholder="Enter address or venue" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Special Requirements (Optional)</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="Any specific shots, themes, or requirements for your session..."
                    className="min-h-[100px]"
                  />
                </div>
              </form>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                Payment Information
              </h2>
              
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" maxLength={4} required />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                  <Button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="w-full bg-gradient-primary hover:opacity-90 py-6 text-lg"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Confirm Booking & Pay"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <div className="p-2 rounded bg-gradient-primary">
                    <Camera className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Corporate Event Package</h3>
                    <p className="text-sm text-muted-foreground">Professional photographer • 4 hours</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium ml-auto">To be scheduled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium ml-auto">4 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Photos:</span>
                    <span className="font-medium ml-auto">150+ edited</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">$899.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span className="font-medium">$50.00</span>
                </div>
                <div className="flex justify-between text-sm text-primary">
                  <span>Trial Discount (20%)</span>
                  <span className="font-medium">-$179.80</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>$769.20</span>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  What's Included
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Professional photographer for 4 hours</li>
                  <li>• 150+ professionally edited photos</li>
                  <li>• High-resolution digital downloads</li>
                  <li>• Online gallery for 1 year</li>
                  <li>• Delivery within 48-72 hours</li>
                </ul>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-6">
                By confirming, you agree to our Terms of Service and Privacy Policy
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

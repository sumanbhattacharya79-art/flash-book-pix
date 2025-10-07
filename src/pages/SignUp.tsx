import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, ArrowLeft, Mail, Lock, User, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Account created!",
        description: `Welcome to FrameBook! Check your email to verify your ${userType} account.`,
      });
      setLoading(false);
      // Redirect to appropriate dashboard
      if (userType === "photographer") {
        navigate("/photographer-dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="p-8 shadow-elegant">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-gradient-primary mb-4">
              <Camera className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Start your free trial today</p>
          </div>

          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="photographer">Photographer</TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <form onSubmit={(e) => handleSubmit(e, "client")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="client-name" placeholder="John Doe" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-company">Company Name (Optional)</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="client-company" placeholder="Your Company" className="pl-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="client-email" type="email" placeholder="you@example.com" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="client-password" type="password" placeholder="••••••••" className="pl-10" required />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90" disabled={loading}>
                  {loading ? "Creating Account..." : "Start Free Trial"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  First booking is 20% off with trial
                </p>
              </form>
            </TabsContent>

            <TabsContent value="photographer">
              <form onSubmit={(e) => handleSubmit(e, "photographer")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="photo-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="photo-name" placeholder="Jane Smith" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo-business">Business Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="photo-business" placeholder="Your Photography Studio" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="photo-email" type="email" placeholder="you@example.com" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="photo-password" type="password" placeholder="••••••••" className="pl-10" required />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90" disabled={loading}>
                  {loading ? "Creating Account..." : "Join Our Network"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Portfolio review required after signup
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

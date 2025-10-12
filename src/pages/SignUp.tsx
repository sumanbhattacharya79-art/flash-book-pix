import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, ArrowLeft, Mail, Lock, User, Building } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password is too long"),
  fullName: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
});

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, user, userRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState({ name: "", email: "", password: "" });
  const [photographerData, setPhotographerData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user && userRole) {
      if (userRole === "photographer") {
        navigate("/photographer-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, userRole, navigate]);

  const handleSubmit = async (e: React.FormEvent, userType: "client" | "photographer") => {
    e.preventDefault();
    
    const data = userType === "client" ? clientData : photographerData;
    
    // Validate input before submission
    const validation = signUpSchema.safeParse({
      email: data.email,
      password: data.password,
      fullName: data.name,
    });
    
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    const { error } = await signUp(
      validation.data.email,
      validation.data.password,
      validation.data.fullName,
      userType
    );
    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account created!",
        description: `Welcome to FrameBook!`,
      });
    }
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
                    <Input 
                      id="client-name" 
                      placeholder="John Doe" 
                      className="pl-10" 
                      required 
                      value={clientData.name}
                      onChange={(e) => setClientData({...clientData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="client-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10" 
                      required 
                      value={clientData.email}
                      onChange={(e) => setClientData({...clientData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="client-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10" 
                      required 
                      value={clientData.password}
                      onChange={(e) => setClientData({...clientData, password: e.target.value})}
                    />
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
                    <Input 
                      id="photo-name" 
                      placeholder="Jane Smith" 
                      className="pl-10" 
                      required 
                      value={photographerData.name}
                      onChange={(e) => setPhotographerData({...photographerData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="photo-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10" 
                      required 
                      value={photographerData.email}
                      onChange={(e) => setPhotographerData({...photographerData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="photo-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10" 
                      required 
                      value={photographerData.password}
                      onChange={(e) => setPhotographerData({...photographerData, password: e.target.value})}
                    />
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

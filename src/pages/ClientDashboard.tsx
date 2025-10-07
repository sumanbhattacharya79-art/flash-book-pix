import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Search, Star, MapPin, Calendar, Clock, Download, MessageSquare, LogOut } from "lucide-react";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const photographers = [
    { id: 1, name: "Sarah Chen", specialty: "Corporate Events", rating: 4.9, reviews: 127, location: "San Francisco, CA", price: "$899/session", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
    { id: 2, name: "Michael Torres", specialty: "Product Photography", rating: 4.8, reviews: 94, location: "New York, NY", price: "$749/session", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
    { id: 3, name: "Emily Roberts", specialty: "Real Estate", rating: 5.0, reviews: 156, location: "Los Angeles, CA", price: "$649/session", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" },
  ];

  const bookings = [
    { id: 1, photographer: "Sarah Chen", service: "Corporate Event", date: "2025-10-15", time: "2:00 PM", status: "upcoming", price: "$899" },
    { id: 2, photographer: "Michael Torres", service: "Product Shoot", date: "2025-09-28", time: "10:00 AM", status: "completed", price: "$749" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FrameBook</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Manage your bookings and find the perfect photographer</p>
        </div>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Photographers</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <Card className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by specialty, location, or name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photographers.map((photographer) => (
                <Card key={photographer.id} className="overflow-hidden hover:shadow-elegant transition-all">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={photographer.image} 
                      alt={photographer.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{photographer.name}</h3>
                      <p className="text-sm text-muted-foreground">{photographer.specialty}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{photographer.rating}</span>
                        <span className="text-muted-foreground">({photographer.reviews})</span>
                      </div>
                      <Badge variant="secondary">{photographer.price}</Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{photographer.location}</span>
                    </div>

                    <Button 
                      onClick={() => navigate("/booking")}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      Book Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{booking.service}</h3>
                          <p className="text-muted-foreground">with {booking.photographer}</p>
                        </div>
                        <Badge variant={booking.status === "upcoming" ? "default" : "secondary"}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="font-semibold text-primary">
                          {booking.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {booking.status === "completed" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Photos
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;

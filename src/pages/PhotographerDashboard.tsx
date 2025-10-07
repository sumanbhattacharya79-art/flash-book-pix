import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, Clock, MapPin, DollarSign, Upload, Star, MessageSquare, LogOut, CheckCircle, XCircle } from "lucide-react";

const PhotographerDashboard = () => {
  const navigate = useNavigate();

  const bookingRequests = [
    { id: 1, client: "Acme Corp", service: "Corporate Event", date: "2025-10-20", time: "3:00 PM", location: "San Francisco, CA", price: "$899", status: "pending" },
    { id: 2, client: "TechStart Inc", service: "Product Shoot", date: "2025-10-18", time: "10:00 AM", location: "San Jose, CA", price: "$749", status: "pending" },
  ];

  const confirmedBookings = [
    { id: 3, client: "Innovation Labs", service: "Corporate Event", date: "2025-10-15", time: "2:00 PM", location: "Oakland, CA", price: "$899", status: "confirmed" },
  ];

  const completedBookings = [
    { id: 4, client: "Global Ventures", service: "Corporate Event", date: "2025-09-25", time: "1:00 PM", delivered: true, rating: 5 },
    { id: 5, client: "Creative Studios", service: "Product Shoot", date: "2025-09-20", time: "11:00 AM", delivered: true, rating: 4.8 },
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
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome, Sarah!</h1>
            <p className="text-muted-foreground">Manage your bookings and grow your business</p>
          </div>
          <div className="flex gap-4">
            <Card className="p-4 flex items-center gap-3">
              <div className="p-2 rounded bg-gradient-primary">
                <Star className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <div className="p-2 rounded bg-gradient-primary">
                <DollarSign className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">$12.4k</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
            <TabsTrigger value="requests">
              New Requests <Badge className="ml-2">{bookingRequests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            {bookingRequests.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{booking.service}</h3>
                        <p className="text-muted-foreground">Requested by {booking.client}</p>
                      </div>
                      <Badge className="bg-primary">{booking.price}</Badge>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <XCircle className="h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90 gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Accept
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4">
            {confirmedBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{booking.service}</h3>
                        <p className="text-muted-foreground">Client: {booking.client}</p>
                      </div>
                      <Badge variant="default">{booking.status}</Badge>
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
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{booking.location}</span>
                      </div>
                      <div className="font-semibold text-primary">
                        {booking.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Client
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{booking.service}</h3>
                        <p className="text-muted-foreground">Client: {booking.client}</p>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{booking.rating}</span>
                      </div>
                      {booking.delivered && (
                        <Badge variant="outline" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Photos Delivered
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PhotographerDashboard;

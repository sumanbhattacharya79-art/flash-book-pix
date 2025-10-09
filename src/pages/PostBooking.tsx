import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Calendar, Clock, MapPin, Download, MessageSquare, LogOut, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PostBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const { toast } = useToast();
  const [booking, setBooking] = useState<any>(null);
  const [gallery, setGallery] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
      subscribeToMessages();
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        client:profiles!bookings_client_id_fkey(full_name, email),
        photographer:profiles!bookings_photographer_id_fkey(full_name, email)
      `)
      .eq('id', bookingId)
      .single();

    if (bookingError) {
      toast({ title: "Error", description: bookingError.message, variant: "destructive" });
      return;
    }

    setBooking(bookingData);

    const { data: galleryData } = await supabase
      .from('photo_galleries')
      .select('*')
      .eq('booking_id', bookingId)
      .maybeSingle();

    setGallery(galleryData);

    const { data: messagesData } = await supabase
      .from('messages')
      .select('*, sender:profiles(full_name)')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: true });

    setMessages(messagesData || []);
    setLoading(false);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `booking_id=eq.${bookingId}`
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        booking_id: bookingId,
        sender_id: user?.id,
        content: newMessage
      });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setNewMessage("");
    }
  };

  const submitReview = async () => {
    if (rating === 0) {
      toast({ title: "Error", description: "Please select a rating", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from('reviews')
      .insert({
        booking_id: bookingId,
        client_id: user?.id,
        photographer_id: booking.photographer_id,
        rating,
        comment: review
      });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success!", description: "Review submitted successfully" });
      fetchBookingDetails();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!booking) {
    return <div className="min-h-screen flex items-center justify-center">Booking not found</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">FrameBook</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => signOut().then(() => navigate("/"))}>
              <LogOut className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`} />
              <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(userRole === 'photographer' ? '/photographer-dashboard' : '/dashboard')} className="mb-6">
          ← Back to Dashboard
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{booking.service_type.replace('_', ' ')}</h3>
                    <p className="text-muted-foreground">
                      {userRole === 'client' ? `Photographer: ${booking.photographer?.full_name}` : `Client: ${booking.client?.full_name}`}
                    </p>
                  </div>
                  <Badge variant={booking.status === 'completed' ? 'secondary' : 'default'}>
                    {booking.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{booking.booking_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{booking.booking_time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.location}</span>
                  </div>
                </div>
              </div>
            </Card>

            {gallery && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Photos</h2>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.photo_urls.map((url: string, idx: number) => (
                    <div key={idx} className="aspect-square bg-muted rounded-lg overflow-hidden">
                      <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {userRole === 'client' && booking.status === 'completed' && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-8 w-8 cursor-pointer ${star <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Comment</Label>
                    <Textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Share your experience..."
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={submitReview} className="bg-gradient-primary hover:opacity-90">
                    Submit Review
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${message.sender_id === user?.id ? 'bg-primary text-primary-foreground ml-8' : 'bg-muted mr-8'}`}
                  >
                    <p className="text-sm font-medium mb-1">{message.sender?.full_name}</p>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  rows={2}
                />
                <Button onClick={sendMessage} size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBooking;

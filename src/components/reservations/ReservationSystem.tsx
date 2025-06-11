
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

export const ReservationSystem: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM'
  ];

  const partySizes = ['1', '2', '3', '4', '5', '6', '7', '8', '8+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to make a reservation');
      return;
    }

    if (!selectedDate || !selectedTime || !partySize) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reservation = {
        id: Date.now().toString(),
        userId: user.id,
        customerName: `${user.firstName} ${user.lastName}`,
        date: selectedDate,
        time: selectedTime,
        partySize: parseInt(partySize),
        specialRequests,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      toast.success('Reservation confirmed! We look forward to seeing you.');
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setPartySize('');
      setSpecialRequests('');
      
    } catch (error) {
      toast.error('Failed to make reservation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-display text-2xl text-charcoal flex items-center gap-3">
            <MapPin className="w-6 h-6 text-burgundy" />
            Make a Reservation
          </CardTitle>
          <p className="text-muted-foreground">
            Reserve your table for an unforgettable dining experience
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date">Select Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time and Party Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Time *</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select time" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Party Size *</Label>
                <Select value={partySize} onValueChange={setPartySize}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select party size" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {partySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} {size === '1' ? 'person' : 'people'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="requests">Special Requests</Label>
              <Input
                id="requests"
                placeholder="Any dietary requirements, celebrations, or special needs?"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </div>

            {/* Contact Information Display */}
            {user && (
              <div className="p-4 bg-cream rounded-lg">
                <h4 className="font-semibold text-charcoal mb-2">Contact Information</h4>
                <p className="text-sm text-muted-foreground">
                  Name: {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Email: {user.email}
                </p>
                {user.phone && (
                  <p className="text-sm text-muted-foreground">
                    Phone: {user.phone}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full btn-premium py-3 text-lg font-semibold"
              disabled={isLoading || !user}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  Confirming Reservation...
                </div>
              ) : (
                'Confirm Reservation'
              )}
            </Button>

            {!user && (
              <p className="text-center text-sm text-muted-foreground">
                Please login to make a reservation
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

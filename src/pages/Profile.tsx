
import React, { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Camera, 
  Edit3, 
  Save, 
  X,
  Calendar,
  Package
} from 'lucide-react';

const Profile = () => {
  const { profile, addresses, loading, updateProfile, uploadProfilePicture } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  React.useEffect(() => {
    if (profile) {
      setEditData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    await updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (profile) {
      setEditData({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone || '',
      });
    }
    setIsEditing(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadProfilePicture(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-texture flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-texture flex items-center justify-center">
        <Card className="card-premium">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
            <p className="text-muted-foreground">Unable to load your profile information.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal mb-4">
            My <span className="text-gradient-premium">Profile</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card className="card-premium">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-charcoal">Personal Information</CardTitle>
                {!isEditing ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancel}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleSave}
                      className="gap-2 btn-premium"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-premium flex items-center justify-center text-white text-3xl font-bold">
                      {profile.profilePicture ? (
                        <img 
                          src={profile.profilePicture} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        `${profile.firstName[0]}${profile.lastName[0]}`
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        value={editData.firstName}
                        onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{profile.firstName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        value={editData.lastName}
                        onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{profile.lastName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        placeholder="+234 801 234 5678"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{profile.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Addresses Card */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-charcoal">Delivery Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <MapPin className="w-5 h-5 text-primary mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{address.label}</h4>
                            {address.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {address.street}, {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No delivery addresses added yet</p>
                    <Button variant="outline" className="mt-4">
                      Add Address
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-charcoal">Account Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <Badge variant="secondary">{profile.totalOrders}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Member Since</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {profile.joinDate.toLocaleDateString()}
                  </span>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-2xl font-bold text-gradient-premium">
                    ₦{profile.walletBalance.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Wallet Balance</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="font-display text-charcoal">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  View Order History
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Manage Wallet
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

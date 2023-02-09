type CheckHours = { from: string; to: string };

export type Hotel = {
  id: number;
  name: string;
  location: {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  stars: number;
  checkIn: CheckHours;
  checkOut: CheckHours;
  contact: { phoneNumber: string; email: string };
  gallery: string[];
  userRating: number;
  price: number;
  currency: string;
};

export type HotelResponse = Hotel[];

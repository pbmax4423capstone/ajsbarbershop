export interface Address {
  street: string
  city: string
  state: string
  zip: string
  fullFormatted: string
}

export interface DayHours {
  day: string
  open: string | null   // "9:00 AM" or null if closed
  close: string | null  // "5:00 PM" or null if closed
  isClosed: boolean
}

export interface Service {
  name: string
  price: string
  duration?: string
  description?: string
}

export interface BusinessConfig {
  name: string
  tagline: string
  email: string
  address: Address
  hours: DayHours[]
  bookingUrl: string
  directionsUrl: string
  googleMapsEmbedUrl: string
  services: Service[]
}

export const BUSINESS: BusinessConfig = {
  name: "A.J's Barbershop",
  tagline: 'By Appointment Only',
  email: 'ajsbbshop5280@gmail.com',
  address: {
    street: '9640 E Arapahoe Rd Ste 10',
    city: 'Greenwood Village',
    state: 'CO',
    zip: '80112',
    fullFormatted: '9640 E Arapahoe Rd Ste 10, Greenwood Village, CO 80112',
  },
  bookingUrl: 'https://ajs-barbershop.square.site',
  directionsUrl:
    'https://maps.google.com/?q=9640+E+Arapahoe+Rd+Ste+10,+Greenwood+Village,+CO+80112',
  // Embed URL for the Google Maps iframe on the Info page
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=9640+E+Arapahoe+Rd+Ste+10,+Greenwood+Village,+CO+80112',
  hours: [
    { day: 'Monday', open: null, close: null, isClosed: true },
    { day: 'Tuesday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Wednesday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Thursday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Friday', open: '9:00 AM', close: '5:00 PM', isClosed: false },
    { day: 'Saturday', open: '9:00 AM', close: '4:00 PM', isClosed: false },
    { day: 'Sunday', open: null, close: null, isClosed: true },
  ],
  services: [
    { name: "Men's Haircut", price: '$35.00' },
    { name: 'Senior Cut', price: '$30.00' },
    { name: "Kid's Cut", price: '$30.00' },
    { name: 'Beard Detail', price: '$13.00' },
    { name: 'Shampoo / Massage', price: '$7.00' },
  ],
}

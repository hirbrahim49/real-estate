import apartment1 from "../../../../public/Image/apartment1.jpg";
import kitchen from "../../../../public/Image/kitchen.jpg";
import bedroom from "../../../../public/Image/bedroom.jpg";
import apartment2 from "../../../../public/Image/apartment2.jpg";
import { StaticImageData } from "next/image";
import hostel1 from "../../../../public/Image/hostel1.jpg";
import hostel2 from "../../../../public/Image/hostel2.jpg";
import hostel3 from "../../../../public/Image/hostel3.jpg";


interface DataItem {
  id: number;
  image: StaticImageData;
  title: string; 
  subtitle: string;
}
interface DataSection2 {
  id: number;
  image: StaticImageData;
  title: string; 
  subtitle: string;
  location:string;
}


export const HeroDataBase: DataItem[] = [
  {
    id: 1,
    image: apartment1,
    title: "Luxury Living Spaces",
    subtitle: "Experience the pinnacle of modern comfort and style.",
  },
  {
    id: 2,
    image: kitchen,
    title: "State-of-the-Art Kitchens",
    subtitle: "Designed for culinary enthusiasts and entertainers.",
  },
  {
    id: 3,
    image: bedroom,
    title: "Tranquil Bedrooms",
    subtitle: "Your personal sanctuary for rest and relaxation.",
  },
  {
    id: 4,
    image: apartment2,
    title: "Elegant Apartments",
    subtitle: "Sophisticated living spaces for discerning individuals.",
  },
];


export const Herosection2 : DataSection2 [] = [
  {
    id: 1,
    image: hostel1,
    title: "Luxury Apartments",
    subtitle: " Experience modern living at its finest with our curated selection of high-end apartments.",
    location:"ife,mayfair"
  },
  {
    id: 2,
    image: hostel2,
    title: "Family Homes",
    subtitle: "Find the perfect home for your family with spacious layouts and serene surroundings.",
    location:"ife,lagere"
  },
  {
    id: 3,
    image: hostel3,
    title: "Commercial Spaces",
    subtitle: " Invest in premium commercial properties designed for business success.",
    location:"ife,asherifa"
  },
];

export interface HotProperty {
  id: number;
  image: string;
  name: string;
  location: string;
  price: string;
  description: string;
}


export const hotProperties: HotProperty[] = [
  {
    id: 1,
    image: "/Image/property1.jpg",
    name: "Shared Room (4 People)",
    location: "Ife City Center",
    price: "₦250,000 / year",
    description: "Spacious apartment with modern kitchen, 24/7 electricity, and water supply.",
  },
  {
    id: 2,
    image: "/Image/property2.jpeg",
    name: "Cozy Studio Room",
    location: "Mayfair, Ile-Ife",
    price: "₦150,000 / year",
    description: "Ideal for students, comes with WiFi, furnished bed, and study table.",
  },
  {
    id: 3,
    image: "/Image/property3.jpeg",
    name: "Modern 3-Bedroom Duplex",
    location: "Parakin Estate",
    price: "₦400,000 / year",
    description: "Fully air-conditioned with parking space and CCTV security.",
  },
  {
    id: 4,
    image: "/Image/property4.jpeg",
    name: "Classic Hostel Room",
    location: "Ede Road, Ile-Ife",
    price: "₦180,000 / year",
    description: "Includes reading table, wardrobe, and constant power supply.",
  },
  {
    id: 5,
    image: "/Image/property5.jpeg",
    name: "Executive Self-Contain",
    location: "Oduduwa Estate",
    price: "₦220,000 / year",
    description: "Well-finished, tiled floor, water heater, and kitchen space.",
  },
];

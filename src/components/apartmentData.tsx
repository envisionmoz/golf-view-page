import { useTranslations } from "next-intl";

export interface Apartment {
  id: string;
  imageUrl: string;
  guestsNumber: number;
  areaSize: number;
  apartmentName: string;
  description: string;
  price: number;
}

const apartmentData: Apartment[] = [
  {
    id: "1",
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 4,
    areaSize: 1200,
    apartmentName: "APARTMENT_STANDARD",
    description: "APARTMENT_STANDARD_DESCRIPTION",
    price: 3500,
  },
  {
    id: "2",
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 2,
    areaSize: 800,
    apartmentName: "APARTMENT_DELUXE",
    description: "APARTMENT_DELUXE_DESCRIPTION",
    price: 4500,
  },
  {
    id: "3",
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 6,
    areaSize: 1500,
    apartmentName: "APARTMENT_PREMIUM",
    description: "APARTMENT_PREMIUM_DESCRIPTION",
    price: 5500,
  },
];
export default apartmentData;

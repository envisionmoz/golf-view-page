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
    apartmentName: "APARTAMENTO STANDARD",
    description:
      "Este magnífico 1 e requintado apartamento possui dois elegantes quartos, sendo um deles uma suíte, proporcionando o máximo conforto. A espaçosa sala de estar é ideal para momentos de convívio, enquanto a cozinha, ampla e funcional, atende às necessidades culinárias mais exigentes. Além disso, conta com uma área de serviço independente, garantindo praticidade e organização. Sua localização privilegiada permite desfrutar da proximidade com a praia, a apenas 15 minutos de distância, proporcionando uma experiência residencial única e luxuosa.",
    price: 3500,
  },
  {
    id: "2",
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 2,
    areaSize: 800,
    apartmentName: "APARTAMENTO DELUXE",
    description:
      "Este magnífico 2 e requintado apartamento possui dois elegantes quartos, sendo um deles uma suíte, proporcionando o máximo conforto. A espaçosa sala de estar é ideal para momentos de convívio, enquanto a cozinha, ampla e funcional, atende às necessidades culinárias mais exigentes. Além disso, conta com uma área de serviço independente, garantindo praticidade e organização. Sua localização privilegiada permite desfrutar da proximidade com a praia, a apenas 15 minutos de distância, proporcionando uma experiência residencial única e luxuosa.",
    price: 4500,
  },
  {
    id: "3",
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 6,
    areaSize: 1500,
    apartmentName: "APARTAMENTO PREMIUM",
    description:
      "Este magnífico 3 e requintado apartamento possui dois elegantes quartos, sendo um deles uma suíte, proporcionando o máximo conforto. A espaçosa sala de estar é ideal para momentos de convívio, enquanto a cozinha, ampla e funcional, atende às necessidades culinárias mais exigentes. Além disso, conta com uma área de serviço independente, garantindo praticidade e organização. Sua localização privilegiada permite desfrutar da proximidade com a praia, a apenas 15 minutos de distância, proporcionando uma experiência residencial única e luxuosa.",
    price: 5500,
  },
];
export default apartmentData;

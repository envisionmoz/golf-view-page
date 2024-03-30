export interface Apartment {
    id: string;
    imageUrl: string;
    guestsNumber: number;
    areaSize: number;
    apartmentName: string;
    description: string;
  }

const apartmentData : Apartment[]= [
  {
    id: '1',
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 4,
    areaSize: 1200,
    apartmentName: "APARTAMENTO STANDARD",
    description:
      "Este magnífico e requintado apartamento possui dois elegantes quartos, sendo um deles uma suíte, proporcionando o máximo conforto. A espaçosa sala de estar é ideal para momentos de convívio, enquanto a cozinha, ampla e funcional, atende às necessidades culinárias mais exigentes. Além disso, conta com uma área de serviço independente, garantindo praticidade e organização. Sua localização privilegiada permite desfrutar da proximidade com a praia, a apenas 15 minutos de distância, proporcionando uma experiência residencial única e luxuosa.",
  },
  {
    id: '2',
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 2,
    areaSize: 800,
    apartmentName: "APARTAMENTO DELUXE",
    description:
      "Este magnífico e requintado apartamento possui dois elegantes quartos, sendo um deles uma suíte, proporcionando o máximo conforto. A espaçosa sala de estar é ideal para momentos de convívio, enquanto a cozinha, ampla e funcional, atende às necessidades culinárias mais exigentes. Além disso, conta com uma área de serviço independente, garantindo praticidade e organização. Sua localização privilegiada permite desfrutar da proximidade com a praia, a apenas 15 minutos de distância, proporcionando uma experiência residencial única e luxuosa.",
  },
  {
    id: '3',
    imageUrl: "/images/apartments/apartmenttest.jpg",
    guestsNumber: 6,
    areaSize: 1500,
    apartmentName: "APARTAMENTO PREMIUM",
    description:
      "Este magnífico e requintado apartamento possui dois elegantes quartos, sendo um deles uma suíte, proporcionando o máximo conforto. A espaçosa sala de estar é ideal para momentos de convívio, enquanto a cozinha, ampla e funcional, atende às necessidades culinárias mais exigentes. Além disso, conta com uma área de serviço independente, garantindo praticidade e organização. Sua localização privilegiada permite desfrutar da proximidade com a praia, a apenas 15 minutos de distância, proporcionando uma experiência residencial única e luxuosa.",
  },
];
export default apartmentData;
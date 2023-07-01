type PalestrinhaEvent = {
  publicId: string;
  name: string;
  description: string;
  eventType: "EventoAcademico" | "EventoCultural";
  urlMoreInfo: string;
  urlSubscribe: string;
  creatorName: string;
  majorEvent: string;
  relatedSubAreas: string[];
  startDate: string;
  endDate: string;
};

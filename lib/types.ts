export interface Character {
    id: string;
    name: string;
    dateOfBirth: string;
    role: string;
    house: string;
    wand: Wand;
    image: string;
    gender: string;
    actor: string;
    hairColour: string;
    yearOfBirth: string;

    // Add more properties as needed
  }

  

  export interface Wand {
      wood: string;
      core: string;
      length: number;
  }
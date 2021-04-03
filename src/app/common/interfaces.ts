export interface Character {
  id: number;
  name: string;
  thumbNail: string;
}

export interface FullCharacter extends Character {
  description: string;
  link: string;
  comics: Marvel[];
  events: Marvel[];
}

interface Marvel {
  id: number;
  title: string;
  thumbNail: string;
  link: string;
}

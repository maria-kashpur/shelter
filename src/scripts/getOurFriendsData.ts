export interface OurFriendsData {
  name: string;
  img: string;
  type: string;
  breed: string;
  description: string;
  age: string;
  inoculations: string[];
  diseases: string[];
  parasites: string[];
}

export default async function getOurFriendsData(): Promise<OurFriendsData[]> {
  const response = await fetch("./db/pets.json");
  const data: OurFriendsData[] = await response.json();
  return data;
}
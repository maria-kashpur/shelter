export default async function getOurFriendsData() {
  const response = await fetch("./db/pets.json");
  const data = await response.json();
  return data;
}
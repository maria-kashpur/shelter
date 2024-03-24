export default function getRamdomNum(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min));
}

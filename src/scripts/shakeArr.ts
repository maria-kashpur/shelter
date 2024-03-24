import getRamdomNum from "./getRandomNum";

export default function shakeArr(arr: unknown[]) {
  return arr.reduce((accum: unknown[], el) => {
    let index = getRamdomNum(0, 8);
    while (accum[index] !== undefined) {
      index = getRamdomNum(0, 8);
    }
    accum[index] = el;
    return accum;
  }, []);
}

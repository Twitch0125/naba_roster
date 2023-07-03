type Position = {
  number: number;
  abbreviation: string;
  name: string;
};
const positionMap = new Map<number, Position>();
positionMap.set(1, { number: 1, name: "pitcher", abbreviation: "P" });
positionMap.set(2, { number: 2, name: "catcher", abbreviation: "C" });
positionMap.set(3, { number: 3, name: "first base", abbreviation: "1B" });
positionMap.set(4, { number: 4, name: "second base", abbreviation: "2B" });
positionMap.set(5, { number: 5, name: "third base", abbreviation: "3B" });
positionMap.set(6, { number: 6, name: "shortstop", abbreviation: "SS" });
positionMap.set(7, { number: 7, name: "left field", abbreviation: "LF" });
positionMap.set(8, { number: 8, name: "center field", abbreviation: "CF" });
positionMap.set(9, { number: 9, name: "right field", abbreviation: "RF" });
positionMap.set(10, {
  number: 10,
  name: "designated hitter",
  abbreviation: "DH",
});
positionMap.set(11, {
    number: 11,
    name: "starting pitcher",
    abbreviation: "SP",
  });
  positionMap.set(12, {
    number: 12,
    name: "reserve pitcher",
    abbreviation: "RP",
  });

  positionMap.set(13, {
    number: 13,
    name: "closer",
    abbreviation: "CL",
  });
export function getPosition(position: number) {
  return positionMap.get(position);
}

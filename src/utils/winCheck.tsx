export const winCheck = (arr: boolean[], posibilities: boolean[][]) => {
  let winPass: boolean[] = [];
  const similitiesResults: number[] = [];
  posibilities.forEach((posibilitie) => {
    const similities = arr.filter((location, idx) => {
      if (location === false) return false;
      return location === posibilitie[idx];
    }).length;
    if (similities > 2) {
      winPass = posibilitie;
    }
    similitiesResults.push(similities);
  });
  const result = similitiesResults.some((score) => score > 2);
  return { winPass, result };
};

export function selectRandom<T>(items: T[], numToSelect: number): T[] {
  const selectedNumbers = [];
  while (selectedNumbers.length < numToSelect) {
    const randomIndex = randomFromInterval(0, items.length - 1);

    // collision
    if (selectedNumbers.includes(randomIndex)) {
      continue;
    } else {
      selectedNumbers.push(randomIndex);
    }
  }

  return items.filter((item, index) => selectedNumbers.includes(index));
  4;
}

export const randomFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

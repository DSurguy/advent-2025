export default function getHighestHugeJoltage(bank: string, numBatteries: number = 12): bigint {
  const selectedIndexes = new Set<number>();
  let lastIndex = -1;
  const mappedBank: [value: number, index: number][] = bank.split('').map((v, i) => [Number(v), i]);

  const bandSize = bank.length - numBatteries + 1;
  for( let i=0; i<numBatteries; i++ ) {
    const sliced = mappedBank.slice(i, i+bandSize);
    const filtered = sliced.filter(([_,i]) => i > lastIndex);
    const sorted = filtered.sort((a,b) => {
      const [valueA, indexA] = a;
      const [valueB, indexB] = b;
      return (valueB - valueA) || (indexA - indexB)
    })
    const selectedIndex = sorted[0]![1];
    selectedIndexes.add(selectedIndex)
    lastIndex = selectedIndex;
  }
  return BigInt(Array.from(selectedIndexes).sort((a,b) => a-b).map(i => bank[i]).join(''))
}
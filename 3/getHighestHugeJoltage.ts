function insertStringAt(input: string, index: number, stringToInsert: string): string {
  return input.substring(0,index) + stringToInsert + input.substring(index);
}

function replaceCharAt(input: string, index: number, replacement: string): string {
  return input.substring(0,index) + replacement + input.substring(index + 1);
}

export default function getHighestHugeJoltage(bank: string, numBatteries: number = 12, log = false): {
  joltage: bigint,
  logLines: string,
} {
  const logLines: string[] = [];
  logLines.push(`Bank: ${bank}\nChoose ${numBatteries}`)

  const mappedBank: [value: number, index: number][] = bank.split('').map((v, i) => [Number(v), i]);
  const bandSize = bank.length - numBatteries + 1;
  
  let output = '';
  let lastIndex = -1;
  let runningBankStringForLog = bank;

  for( let i=0; i<numBatteries; i++ ) {
    const sliced = mappedBank.slice(i, i+bandSize);
    const filtered = sliced.filter(([_,i]) => i > lastIndex);
    const sorted = filtered.sort((a,b) => {
      const [valueA, indexA] = a;
      const [valueB, indexB] = b;
      return (valueB - valueA) || (indexA - indexB)
    })
    const [selectedValue, selectedIndex] = sorted[0]!;
    output += selectedValue;
    
    let bandLog = insertStringAt(runningBankStringForLog, i+bandSize, ']');
    bandLog = insertStringAt(bandLog, i, '[');
    logLines.push(`${bandLog} => [${selectedValue} @ ${selectedIndex}]=> ${output}`)
    runningBankStringForLog = replaceCharAt(runningBankStringForLog, selectedIndex, '-');
    
    lastIndex = selectedIndex;
  }

  return {
    joltage: BigInt(output),
    logLines: logLines.join('\n'),
  }
}
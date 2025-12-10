export default function getHighestJoltage(bank: string): number {
  let highestLeft: [number, number] = [-1, -1];
  let highestRight: [number, number] = [-1, -1];
  for (let i=0; i<bank.length - 1; i++) {
    if( Number(bank[i]) > highestLeft[0] ){
      highestLeft = [Number(bank[i]), i]
    }
  }
  for( let i=highestLeft[1]+1; i<bank.length; i++ ){
    if( Number(bank[i]) > highestRight[0]) {
      highestRight = [Number(bank[i]), i]
    }
  }
  return Number(`${highestLeft[0]}${highestRight[0]}`)
}
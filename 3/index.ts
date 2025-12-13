import { resolve } from 'node:path';
import getHighestJoltage from './getHighestJoltage';
import { parseArgs } from 'util';
import getHighestHugeJoltage from './getHighestHugeJoltage';

const { values: runArgs } = parseArgs({
  args: Bun.argv,
  options: {
    example: {
      type: 'boolean',
      short: 'e'
    },
    log: {
      type: 'string',
      short: 'l',
    }
  },
  strict: false,
  allowPositionals: true
})

const input = Bun.file(resolve(__dirname, runArgs.example ? 'example' : 'input'));
const banks = (await input.text()).split('\n')

let partOneTotal = BigInt(0);
for( const bank of banks ) {
  partOneTotal += BigInt(getHighestJoltage(bank));
}

console.log("Part One", partOneTotal.toString());

let partTwoTotal = BigInt(0);
for( const bank of banks ) {
  partTwoTotal += getHighestHugeJoltage(bank);
}

console.log("Part Two", partTwoTotal.toString());
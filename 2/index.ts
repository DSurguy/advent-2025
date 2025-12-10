import { resolve } from 'node:path';
import { isInvalid, simpleIsInvalid } from './invalidChecks';
import { parseArgs } from 'util';
import { closeLog, writeLogLines } from './logWriter';

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
const ranges = (await input.text()).replace('\n', '').split(',').map(v => v.split('-').map(Number)) as [number, number][];

let partOneTotal = BigInt(0);
let partTwoTotal = BigInt(0);

for (const [start, end] of ranges) {
  for(let id = start; id <= end; id++) {
    
    if (simpleIsInvalid(id.toString()) ) {
      partOneTotal += BigInt(id);
    }

    const partTwoResult = isInvalid(id.toString());
    if( partTwoResult.invalid ) {
      if( runArgs.log ) {
        writeLogLines(partTwoResult.logLines+'\n')
      }
      partTwoTotal += BigInt(id);
    } else if( runArgs.log === 'full' ){
      writeLogLines(partTwoResult.logLines+'\n')
    }
  }
}
closeLog();

console.log("Part One", partOneTotal.toString());
console.log("Part Two", partTwoTotal.toString());
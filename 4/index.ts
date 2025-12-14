import { resolve } from 'node:path';
import { parseArgs } from 'util';
import { closeLog, writeLogLines } from './logWriter'

const { values: runArgs } = parseArgs({
  args: Bun.argv,
  options: {
    example: {
      type: 'boolean',
      short: 'e'
    },
    log: {
      type: 'boolean',
      short: 'l',
    }
  },
  strict: false,
  allowPositionals: true
})

const input = Bun.file(resolve(__dirname, runArgs.example ? 'example' : 'input'));
const lines = (await input.text()).split('\n')

const time = performance.now();
function generateWeights(lines: string[]) {
  let underFour = 0;
  let weights: number[][] = [];
  for( let y=0; y<lines.length; y++ ) {
    weights.push([])
    for( let x=0; x<lines[y]!.length; x++ ){
      let weight = 0;
      weight += lines[y-1]?.[x-1] === '@' ? 1 : 0;
      weight += lines[y-1]?.[x] === '@' ? 1 : 0;
      weight += lines[y-1]?.[x+1] === '@' ? 1 : 0;
      weight += lines[y]?.[x-1] === '@' ? 1 : 0;
      // Self
      weight += lines[y]?.[x+1] === '@' ? 1 : 0;
      weight += lines[y+1]?.[x-1] === '@' ? 1 : 0;
      weight += lines[y+1]?.[x] === '@' ? 1 : 0;
      weight += lines[y+1]?.[x+1] === '@' ? 1 : 0;
      weights[y]?.push(weight)
      if( lines[y]?.[x] === '@' && weight < 4 ) underFour++;
    }
  }
  return { weights, underFour };
}
console.log(`Part One: ${generateWeights(lines).underFour} in ${performance.now() - time}ms`);
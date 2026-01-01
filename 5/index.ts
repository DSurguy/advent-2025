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

const mid = lines.findIndex(v => v === '');
const freshIds = lines.slice(0, mid).map(range => range.split('-').map(Number)) as [start: number, end: number][];
const availableIds = lines.slice(mid + 1).map(Number);

let freshAndAvailable = 0;
for( let id of availableIds ) {
  for ( let [start, end] of freshIds ) {
    if ( id >= start && id <= end ) {
      freshAndAvailable++;
      break;
    }
  }
}

const duration = performance.now() - time
console.log(`Part One: ${freshAndAvailable} in ${duration}ms`);
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
const lines = (await input.text()).split('\n').filter(v => v).map(v => v.split(/\s+/g).filter(v => v))

const time = performance.now();

const actions = lines[lines.length-1]!;
const results: number[] = [];

for( let lineIndex = 0; lineIndex < lines.length-1; lineIndex++) {
  const line = lines[lineIndex]!;
  for ( let i=0; i<line.length; i++ ) {
    const value = Number(line[i]);
    if( !results[i] ) {
      results[i] = value;
    }
    else if( actions[i] === '*' ) {
      results[i] = results[i]! * value
    } else { // +
      results[i] = results[i]! + value
    }
    if( isNaN(Number(results[i])) ) {
      console.log(`Problem at line ${lineIndex}, col ${i}`)
      process.exit(0)
    }
  }
}

const total = results.reduce((acc, v) => acc + v, 0)

const duration = performance.now() - time
console.log(`Part One: ${total} in ${duration}ms`);

const totalDuration = performance.now() - time
console.log(`Part Two: ${'TODO'} in ${totalDuration - duration}ms (Total: ${totalDuration})`);
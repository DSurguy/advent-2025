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
const lines = (await input.text()).split('\n').filter(v => v);
const actionLine = lines[lines.length-1]!;
const actions = actionLine.split(/\s(?=[*+])/g).map(v => ({
  length: v.length,
  action: v[0]!,
}));

const time = performance.now();
const results: number[] = [];

let currentIndex = 0;
for ( let action of actions ) {
  let result = 0;
  for( let lineIndex = 0; lineIndex < lines.length-1; lineIndex++) {
    const line = lines[lineIndex]!;
    const value = Number(line.substring(currentIndex, currentIndex + action.length));
    if( !result ) {
      result = value;
    }
    else if( action.action === '*' ) {
      result *= value
    } else { // +
      result += value
    }
    if( isNaN(Number(result)) ) {
      console.log(`Problem at line ${lineIndex}, col ${currentIndex}`)
      process.exit(0)
    }
  }
  results.push(result);
  currentIndex += action.length + 1
}
const total = results.reduce((acc, v) => acc + v, 0)

const duration = performance.now() - time
console.log(`Part One: ${total} in ${duration}ms`);

const partTwoResults: number[] = []

currentIndex = 0;
for ( let action of actions ) {
  let result = 0;
  for( let i=currentIndex + action.length - 1; i>=currentIndex; i--) {
    let value = '';
    for( let lineIndex = 0; lineIndex < lines.length-1; lineIndex++) {
      const line = lines[lineIndex]!;
      value += line[i]?.trim() || '';
    }
    if( !result ) {
      result = Number(value);
    } else if( action.action === '*' ) {
      result *= Number(value);
    } else { // +
      result += Number(value);
    }

    if( isNaN(Number(result)) ) {
      console.log(`Problem at col ${currentIndex}`)
      process.exit(0)
    }
  }
  partTwoResults.push(result);
  currentIndex += action.length + 1
}

const partTwoTotal = partTwoResults.reduce((acc, v) => acc + v, 0)

const totalDuration = performance.now() - time
console.log(`Part Two: ${partTwoTotal} in ${totalDuration - duration}ms (Total: ${totalDuration})`);
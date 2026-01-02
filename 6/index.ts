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
const operatorLine = lines[lines.length-1]!;
const problems = operatorLine.split(/\s(?=[*+])/g).map(v => ({
  length: v.length,
  operator: v[0]!,
}));

const time = performance.now();
const results: number[] = [];

let currentIndex = 0;
for ( let problem of problems ) {
  let log = []
  let result = 0;

  for( let lineIndex = 0; lineIndex < lines.length-1; lineIndex++) {
    const line = lines[lineIndex]!;
    const value = line.substring(currentIndex, currentIndex + problem.length);

    if( runArgs.log ) {
      log.push(`${problem.operator} ${value.padStart(problem.length)}`);
    }

    if( !result ) {
      result = Number(value);
    }
    else if( problem.operator === '*' ) {
      result *= Number(value)
    } else { // +
      result += Number(value)
    }
  }

  if( runArgs.log ) {
    log.push(`= ${result}`)
    writeLogLines(log.join('\n') + '\n', '1');
  }

  results.push(result);
  currentIndex += problem.length + 1
}
const total = results.reduce((acc, v) => acc + v, 0)

const duration = performance.now() - time
console.log(`Part One: ${total} in ${duration}ms`);

const partTwoResults: number[] = []

currentIndex = 0;
for ( let problem of problems ) {
  let log = [];
  let result = 0;

  for( let i=currentIndex + problem.length - 1; i>=currentIndex; i--) {
    let value = '';
    for( let lineIndex = 0; lineIndex < lines.length-1; lineIndex++) {
      const line = lines[lineIndex]!;
      value += line[i]?.trim() || '';
    }

    if( runArgs.log ) {
      log.push(`${problem.operator} ${value.padStart(problem.length)}`);
    }

    if( !result ) {
      result = Number(value);
    } else if( problem.operator === '*' ) {
      result *= Number(value);
    } else { // +
      result += Number(value);
    }
  }

  if( runArgs.log ) {
    log.push(`= ${result}`)
    writeLogLines(log.join('\n') + '\n', '2');
  }

  partTwoResults.push(result);
  currentIndex += problem.length + 1
}

const partTwoTotal = partTwoResults.reduce((acc, v) => acc + v, 0)

const totalDuration = performance.now() - time
console.log(`Part Two: ${partTwoTotal} in ${totalDuration - duration}ms (Total: ${totalDuration})`);
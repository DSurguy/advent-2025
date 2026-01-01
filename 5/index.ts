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
// Split and sort the fresh IDs by start of the range
const freshIds: Range[] = lines
  .slice(0, mid)
  .map(range => {
    const [start, end] = range.split('-').map(Number) as [start: number, end: number]
    return { start, end }
  })
  .sort((a,b) => a.start - b.start);

const availableIds = lines.slice(mid + 1).map(Number);

let freshAndAvailable = 0;
for( let id of availableIds ) {
  for ( let {start, end} of freshIds ) {
    if ( id >= start && id <= end ) {
      freshAndAvailable++;
      break;
    }
  }
}

const duration = performance.now() - time
console.log(`Part One: ${freshAndAvailable} in ${duration}ms`);

const processedRanges = [];

let currentRange: Range = freshIds[0]!
freshIds.splice(0, 1);

let logPadStart = 0;
let logPadEnd = 0;
if( runArgs.log ) {
  for( const { start, end } of freshIds ) {
    if ( start.toString().length > logPadStart ) logPadStart = start.toString().length;
    if ( end.toString().length > logPadEnd ) logPadEnd = end.toString().length;
  }
}

function logRangeAction(action: string, start: number, end: number, addNewLine = false) {
  writeLogLines(`${
    action.padStart(3)
  }: ${
    start.toString().padStart(logPadStart)
  } - ${
    end.toString().padStart(logPadStart)
  }${addNewLine ? '\n' : ''}`)
}

if( runArgs.log ) {
  logRangeAction('+', currentRange.start, currentRange.end)
}

for ( const { start, end } of freshIds ){
  if( start <= currentRange.end ) {
    if( end > currentRange.end ) {
      currentRange.end = end;
      if( runArgs.log ) logRangeAction('->', start, end)
    } else {
      if( runArgs.log ) logRangeAction('', start, end)
    }
  } else {
    processedRanges.push(currentRange);
    if( runArgs.log) logRangeAction('=', currentRange.start, currentRange.end, true)
    currentRange = { start, end };
    if( runArgs.log) logRangeAction('+', start, end)
  }
}
processedRanges.push(currentRange);
if( runArgs.log ) logRangeAction('=', currentRange.start, currentRange.end)

const total = processedRanges.reduce((acc, {start, end}) => {
  return acc + (end - start) + 1; // inclusive, hence the + 1
}, 0)

const totalDuration = performance.now() - time
console.log(`Part Two: ${total} in ${totalDuration - duration}ms (Total: ${totalDuration})`);
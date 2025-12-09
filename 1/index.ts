import { resolve } from 'node:path';

let dial = 50;
let password = 0;
let fancyPassword = 0;

const input = Bun.file(resolve(__dirname, 'input'));
const out = Bun.file(resolve(__dirname, 'out.csv'));
const outWriter = out.writer();
const data = (await input.text()).split(/\s+/g).filter(v => !!(v.trim()));

const writeLog = (logString: string) => outWriter.write(logString+'\n')
writeLog([
  'prev',
  'spin',
  'raw',
  'norm',
  'cross',
  'zero'
].map(l => l.padEnd(6, ' ')).join(','))

for( const spin of data ) {
  const {
    dialPosition,
    timesCrossedZero,
    isZero,
    logLine
  } = spinDial(dial, spin);
  dial = dialPosition;
  fancyPassword += timesCrossedZero;
  password += isZero ? 1 : 0;
  
  writeLog(logLine);
}
outWriter.end();

console.log(`Password: ${password}`);
console.log(`Fancy Password: ${fancyPassword}`);

function spinDial(startingDialPosition: number, spin: string): {
  dialPosition: number;
  timesCrossedZero: number;
  isZero: boolean;
  logLine: string;
} {
  let log = [];
  let dialPosition = startingDialPosition;
  let timesCrossedZero = 0;
  log.push(startingDialPosition.toString());
  log.push(spin);

  // Process the spin value (L = negative, R = positive)
  let spinValue = Number(spin.replace("L", "-").replace('R', ''));

  log.push((startingDialPosition + spinValue).toString());
  
  // Capture and trim the extra cycles past 100
  const hundredsInSpin = Math.floor(Math.abs(spinValue / 100))
  timesCrossedZero += hundredsInSpin;
  spinValue = spinValue % 100;

  // Spin
  dialPosition += spinValue;1

  // Normalize and capture any times we cross zero
  if( dialPosition < 0 ) {
    // As long as we didn't start AT zero, we've crossed once
    if (dialPosition != spinValue) timesCrossedZero += 1
    // Re-normalize back to the 0-100 band
    dialPosition += 100;
  } else if( dialPosition === 0 ) {
    timesCrossedZero += 1;
  } else { // positive
    // Capture and trim spin value past 100
    const hundredsInDial = Math.floor(Math.abs(dialPosition / 100))
    timesCrossedZero += hundredsInDial;
    dialPosition = dialPosition % 100;
  }
  
  log.push(dialPosition.toString());
  log.push(`${fancyPassword}`);
  log.push(`${password}`)

  return {
    dialPosition,
    timesCrossedZero,
    isZero: dialPosition === 0,
    logLine: log.map(l => l.padEnd(6, ' ')).join(','),
  }
}
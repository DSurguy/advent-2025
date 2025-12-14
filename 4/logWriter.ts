import { resolve } from 'node:path';

/**
 * A little module to lazily initialize the output file for part 2
 * so we avoid the file IO overhead if we're not going to write to it.
 */

let outWriter: Bun.FileSink;

export function writeLogLines(lines: string) {
  if( !outWriter ) {
    const out = Bun.file(resolve(__dirname, 'part2.out'));
    outWriter = out.writer();
  }

  outWriter.write(lines+'\n')
}

export function closeLog() {
  if( outWriter ) outWriter.end();
}
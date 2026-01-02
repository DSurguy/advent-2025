import { resolve } from 'node:path';

/**
 * A little module to lazily initialize the output file for part 2
 * so we avoid the file IO overhead if we're not going to write to it.
 */

let outWriters: Map<string, Bun.FileSink> = new Map();

export function writeLogLines(lines: string, part = '2') {
  if( !outWriters.has(part) ) {
    const out = Bun.file(resolve(__dirname, `part${part}.out`));
    out.write('') // Clear the file
    outWriters.set(part, out.writer());
  }

  outWriters.get(part)!.write(lines+'\n')
}

export function closeLog() {
  outWriters.values().forEach( writer => writer.end());
}
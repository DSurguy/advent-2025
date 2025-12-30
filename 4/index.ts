import { resolve } from 'node:path';
import { parseArgs } from 'util';
import { closeLog, writeLogLines } from './logWriter'
import { generateGraph } from './generateGraph';

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

const { initiallyAccessibleNodes, nodes } = generateGraph(lines);

const xLength = lines[0]?.length || 0;
const yLength = lines.length;
function drawGraphToLog() {
  const lines = []
  for ( let y=0; y<yLength; y++ ) {
    let str = '';
    for( let x=0; x<xLength; x++ ) {
      const xy = `${x},${y}`;
      const node = nodes.get(xy);
      if( node ) {
        str += node.accessed ? 'x' : node.neighbors.size
      } else str += '.'
    }
    lines.push(str)
  }
  writeLogLines(lines.join('\n')+'\n')
}

const duration = performance.now() - time
console.log(`Part One: ${initiallyAccessibleNodes.length} in ${duration}ms`);

// Access nodes and remove them one by one
function processGraph(node: PaperNode) {
  let accessed = 0;
  if( node.neighbors.size < 4 && !node.accessed ) {
    const neighbors = node.neighbors.values().toArray().map(xy => nodes.get(xy)) as PaperNode[]
    accessed += 1;
    node.accessed = true;
    for( let neighbor of neighbors ) {
      neighbor.neighbors.delete(`${node.x},${node.y}`);
    }
    if( runArgs.log ) {
      writeLogLines(`${node.x},${node.y}`);
      drawGraphToLog()
    }

    for( let neighbor of neighbors ) {
      accessed += processGraph(neighbor);
    }
  }
  return accessed;
}

if( runArgs.log ) drawGraphToLog()

const totalAccessedNodes = initiallyAccessibleNodes.reduce((acc, node) => {
  return acc + processGraph(node);
}, 0)

const secondDuration = performance.now() - time
console.log(`Part Two: ${totalAccessedNodes} in ${secondDuration - duration}ms (Total: ${secondDuration}ms)`);

if( runArgs.log ) closeLog();
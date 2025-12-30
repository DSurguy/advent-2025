export function generateGraph(lines: string[]) {
  const initiallyAccessibleNodes: PaperNode[] = [];
  const nodes = new Map<string, PaperNode>();

  for( let y=0; y<lines.length; y++ ) {
    for( let x=0; x<lines[y]!.length; x++ ){
      if( lines[y]![x] !== '@' ) continue;
      const xy = `${x},${y}`
      
      let node = nodes.get(xy)
      if( !node ) {
        node = {
          x,
          y,
          accessed: false,
          neighbors: new Set()
        }
        nodes.set(xy, node);
      }

      const toCheck = [
        [ x-1, y-1 ],
        [ x, y-1 ],
        [ x+1, y-1 ],
        [ x-1, y ],
        [ x+1, y ],
        [ x-1, y+1 ],
        [ x, y+1 ],
        [ x+1, y+1 ],
      ]

      // Look at surrounding spaces and connect to neighbors
      for( let [u,v] of toCheck ) {
        if( lines[v!]?.[u!] === '@' ) {
          const uv = `${u},${v}`
          if( !nodes.get(uv) ) {
            nodes.set(uv, {
              x: u!,
              y: v!,
              accessed: false,
              neighbors: new Set()
            })
          }
          const neighbor = nodes.get(uv)!;
          neighbor.neighbors.add(xy);
          node.neighbors.add(uv)
        }
      }

      if( node.neighbors.size < 4 ) {
        initiallyAccessibleNodes.push(node);
      }
    }
  }
  return { initiallyAccessibleNodes, nodes };
}
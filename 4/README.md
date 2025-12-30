# Advent of Code 2025 - Day 4
https://adventofcode.com/2025/day/4

# Setup
Download https://adventofcode.com/2025/day/4/input and place it into this folder named `input` (no extension).

My input is already included in the repository, feel free to replace it with your own.

# Running
- From the project root, run `bun run 4`
- From this directory, run `bun index.ts`

To run the example from the day 4 instructions, pass `--example` as an argument: `bun run 4 --example` or `bun index.ts --example`. The solutions for the included example should be `13` and `43`.

# Checking output
The puzzle solutions are output directly to stdout.

To log the full algorithmic representation of each iteration of part 2, pass the `--log` flag:
- `bun run 4 --log` (from project root)
- `bun run index.ts --log` (from this directory)

You can use the log with the `--example` flag as well.

**Please note that this file will be well over 100MB for the full solution**, and will take quite a bit longer to process part two when generated.

# Solution Explanation
This is a pretty standard graph problem, the solution is as follows:
- Create a graph where all nodes that are touching in the input are connected
- Keep track of nodes that have less than 4 neighbors when building the graph
  - These nodes are both the solution to part 1 AND the entry points to the graph
- Traverse the graph (I used depth first and icky recursion), removing nodes from their neighbors as they meet the "access" criteria (less than 4 neighbors)

This one isn't particularly interesting to me, so I'll leave it there for now.
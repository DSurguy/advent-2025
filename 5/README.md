# Advent of Code 2025 - Day 5
https://adventofcode.com/2025/day/5

# Setup
Download https://adventofcode.com/2025/day/5/input and place it into this folder named `input` (no extension).

My input is already included in the repository, feel free to replace it with your own.

# Running
- From the project root, run `bun run 5`
- From this directory, run `bun index.ts`

To run the example from the day 5 instructions, pass `--example` (`-e`) as an argument: `bun run 5 --example` or `bun index.ts --example`. The solutions for the included example should be `3` and `14`.

# Checking output
The puzzle solutions are output directly to stdout.

To log the full algorithmic representation of each iteration of part 2, pass the `--log` (`-l`) flag:
- `bun run 5 --log` (from project root)
- `bun run index.ts --log` (from this directory)

You can use the log with the `--example` flag as well.

### Reading the Log
Log lines take the following format:
```
{action}: {rangeStart} - {rangeEnd}
```

Where actions are one of the following:
- `+` Starting a new working range
- ` ` The range is fully contained in the working range
- `->` The range overlaps, and is extending the end of the working range
- `=` Final result of the working range

# Solution Explanation
<details>
  <summary>Part 2 (Spoiler)</summary>
  The total IDs in a range can be found by subtracting the end of the range from the start, and adding 1 because they're inclusive. The problem with this is that when ranges overlap, we will be duplicating some of those IDs.

  To avoid this, we want to combine overlapping ranges into one larger range. Here's an example:

  ```
  The following ranges overlap to result in a range of 1-12
  1-5
  7-9
  5-12
  ```

  This example highlights a second problem where we will re-run through the list multiple times.

  ```
  First run through the list:
  1-5 => Set a working range to 1-5
  7-9 => Doesn't overlap, ignore
  5-12 => Overlaps, we now have a working range of 1-12

  Second run through the list:
  1-5 => Already processed, ignore
  7-9 => Overlaps now, but is fully contained, ignore
  5-12 => Already processed, ignore

  The list is now fully processed, and resulted in a range of 1-12
  ```

  Notice that the second run through the list resulted in ZERO operations, because all items were processed or already fully contained.

  To resolve this problem, we can sort the list by the start of their ranges before processing into combined ranges, ensuring that we have minimal "useless" steps:

  ```
  Sorted Ranges
  1-5
  5-12
  7-9

  First run through the list:
  1-5 => Set a working range to 1-5
  5-12 => Overlaps, we now have a working range of 1-12
  7-9 => Fully contained, ignore

  The list is now fully processed, and resulted in a range of 1-12
  ```

  The final result for part two can then be calculated by combining the sum of all the combined, sorted ranges.

  You can visualize this algorithm fully by running the solution with logs.
</details>
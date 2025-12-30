# Advent of Code 2025 - Day 3
https://adventofcode.com/2025/day/3

# Setup
Download https://adventofcode.com/2025/day/3/input and place it into this folder named `input` (no extension).

My input is already included in the repository, feel free to replace it with your own.

# Running
- From the project root, run `bun run 3`
- From this directory, run `bun index.ts`

To run the example from the day 3 instructions, pass `--example` as an argument: `bun run 3 --example` or `bun index.ts --example`. The solutions for the included example should be `357` and `3121910778619`.

## Tests
There is also a test suite you can run with `bun test`:
- `bun test 3` (from project root)
- `bun test .` (from this directory)

# Checking output
The puzzle solutions are output directly to stdout.

To log the full algorithmic representation of each part 2 solution, pass the `--log` flag:
- `bun run 3 --log` (from project root)
- `bun run index.ts --log` (from this directory)

You can use the log with the `--example` flag as well.

# Solution Explanation
<details>
  <summary>Part 2 (Spoiler)</summary>

  I got stuck on extending the concept of part 1 to solve part 2, but they really need totally different algorithms. The algorithm for part 2 is actually relatively simple.

  To simplify for visual clarity, let's take banks of 5 batteries, and assume we need to select 3 of them. Here are some possible arrangements for a bank of batteries made up of `12345`, with our selections labeled `xyz`:

  ```
  12321
  xyz--
  --xyz
  x--yz
  xy--z
  x-y-z
  ```

  What we can observe here, is that if we want to find the starting battery from our bank of batteries, we can see that the leftmost arrangement is `xyz--` and the rightmost arrangement is `--xyz`. Therefore, we can assume that our first battery selection (`x`) MUST come from the first three batteries.

  We've established a band of batteries to select from, so let's now take the largest battery we can. We do this because if the battery selection is always going to be of length 3, we want it to start with the largest digit possible.
  
  If we look at the first three batteries - `[123]21` - we can see that 3 is the largest, so we'll select that one, and remove it as a selection candidate from the bank.

  ```
  Selected: 3
  Bank: 12-21
  ```

  Following the above assumption about the first battery, we can also see that the second battery selection (`y`) must come from the middle three batteries: `1[232]1`. Note that this band is merely shifted one index to the right. However, there are some more considerations here before we make our choice.

  Since we have already selected the first battery (`3`), all our following selections must come from batteries AFTER the first battery. So in our band, this actually eliminates all choices except the `2` in position 4, even though it is not the largest number in the band.

  We're now looking like:
  
  ```
  Selected: 32
  Bank: 12--1
  ```

  Last, we repeat the process for the third battery (`z`), looking at `12[321]`. As before, the previous battery selected was in position 4, so the third battery must come from a position after it, leaving only the `1` in position 5.

  Selecting the last battery, we arrive at our solution:
  
  ```
  Selected: 321
  Bank: 12---
  ```

  So to simply explain the algorithm, we inspect a band of elements, choosing the largest element that is in an index after the last selected element, and is largest out of the available choices, and then shift the band one index to the right. The band size is determined by taking the difference between the length of the desired selection, and the length of the array of elements to choose from.

  For more examples, I suggest running the examples with logging (`bun run 3 -e -l`) and inspecting `part2.out`.
</details>
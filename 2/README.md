# Advent of Code 2025 - Day 2
https://adventofcode.com/2025/day/2

# Setup
Download https://adventofcode.com/2025/day/2/input and place it into this folder named `input` (no extension).

My input is already included in the repository, feel free to replace it with your own.

# Running
- From the project root, run `bun run 2`
- From this directory, run `bun index.ts`

To run the example from the day 2 instructions, pass `--example` as an argument: `bun run 2 --example` or `bun index.ts --example`. The solutions for the included example should be `1227775554` and `4174379265`.

## Tests
There is also a test suite you can run with `bun test 2` from the project root, or `bun test index.test.ts` from this directory.

# Checking output
The puzzle solutions are output directly to stdout.

There's an option to output the calculations of part 2 to a file (`part2.out`), but it does substantially slow down the program. Additionally, that's a big ol' file (like 200MB big).

You can pass one of two options:
- pass `--log` to output only invalid ID calculations
- pass `--log full` to output ALL calculations (seriously, it's a huge file)

# Solution Explanation
<details>
  <summary>Spoiler (hope this works)</summary>

  To solve part 2, I poked around a bit about comparing a string to itself, and saw the phrase "multiply it by itself", which was enough for me to remember binary comparisons, where if a bit is set in two pieces of data, and you add them together, it becomes zero.

  To apply this to the strings (inefficiently, I suppose), I shift the ID to the right and compare it to itself, and do that until we've done half of the string (ID.length / 2)

  Here's an example:

  ```
  123123123     original ID to compare against
   123123123    offset 1
   11111111     result from offset 1
    123123123   offset 2
    1111111     result from offset 2
     123123123  offset 3
     000000     result from offset 3
  ```

  We see that there's now a result that is all zeroes, which is what we're looking for.

  The tricky bit (that the example IDs won't teach you), is that odd-length IDs are a bit ...odd. **You need to ensure the offset length is a factor of the original ID's length, or you don't actually have a match.**

  Let me show you:
  ```
  12121         original ID
   12121        offset 1
   1111         result from offset 1
    12121       offset 2
    000         result from offset 2
  ```

  If we blindly accept the full-zero result, we'll improperly flag this as an invalid ID. A 5-length ID can't actually be made up of repeats unless it's all the same number, because it has to be 1 + 4 or 2 + 3, we can't have 2.5 + 2.5 digits.
</details>
# Advent of Code 2025 - Day 6
https://adventofcode.com/2025/day/6

# Setup
Download https://adventofcode.com/2025/day/6/input and place it into this folder named `input` (no extension).

My input is already included in the repository, feel free to replace it with your own.

# Running
- From the project root, run `bun run 6`
- From this directory, run `bun index.ts`

To run the example from the day 5 instructions, pass `--example` (`-e`) as an argument: `bun run 6 --example` or `bun index.ts --example`. The solutions for the included example should be `4277556` and `3263827`.

# Checking output
The puzzle solutions are output directly to stdout.

To log the full algorithmic representation of each iteration (both parts), pass the `--log` (`-l`) flag:
- `bun run 6 --log` (from project root)
- `bun run index.ts --log` (from this directory)

You can use the log with the `--example` flag as well.

**Note:** The part two results will be reversed from the example on https://adventofcode.com/2025/day/6, because there is no particular requirement that the individual problems be processed right-to-left, merely that the input values be read as right-to-left.

# Solution Explanation
<details>
  <summary>Both Parts(Spoiler)</summary>
  
  ### Problem Parsing and Part 1 Solution
  
  To easily solve both part 1 and 2 in a similar manner, we pre-process the list to find out how long each problem is.

  We can do this using the operator positions in the final line of the input. Here's the example from the website for a visual aid:

  ```
  Full Example

  123 328  51 64 
   45 64  387 23 
    6 98  215 314
  *   +   *   +  
  ```

  Note that the operator always appears at the start of the problems column, so if we split the final line at the space before each operator, we now have the length of each. Unfortunately, for the given example, this results in all problems being length 3, so it's not the best example we could have.

  Now that we know each problem's length (3), we can solve part 1 by walking through the problems, keeping track of the current problem index. We then use the problem index and the length of the problem to take a substring of the input line, retrieving our value:

  ```
  Problem 1
    Operator: *
    Length: 3

  Current problem index: 0

  Line 1, substring(0, 3) -> 123
  Line 2, substring(0, 3) ->  45
  Line 3, substring(0, 3) ->   6
  ```

  We can then simply apply the operator to get the problem solution (`123 * 45 * 6 = 33210`).

  Next, we increment the problem index by the length of the problem, plus one additional space for the column separator (`3 + 1` in this case), and repeat the above process for problem 2:

  ```
  Last problem index: 0

  Problem 2
    Operator: +
    Length: 3
  
  Current problem index: 4 (0 + 3 + 1)

  Line 1, substring(4, 7) -> 328
  Line 2, substring(4, 7) ->  64
  Line 3, substring(4, 7) ->  98
  ```

  Repeating this process, then summing all the results gives the solution to part 1.

  ### Part 2 Solution
  Since we already have the problems parsed out, and we know how to fully all lines for each problem, it's not much more work to create our right-to-left, top-to-bottom inputs.

  Since we're already taking the full substrings of each value, they will maintain their spacing within the column. Now all we have to do is parse each character column within the larger problem column, starting on the right.

  Let's take the same example from part 1 to see how this works, including the full example again for easy reference

  ```
  Full Example

  123 328  51 64 
   45 64  387 23 
    6 98  215 314
  *   +   *   +  
  ```

  ```
  Problem 1
    Operator: *
    Length: 3
  
  Current problem index: 0

  # Adjust -1 for zero-based indexing
  Character Index: 2 (0 + 3 - 1)

  Line 1, substring(2, 3) -> 3
  Line 2, substring(2, 3) -> 5
  Line 3, substring(2, 3) -> 6

  Character Index: 1
  Line 1, substring(1, 2) -> 2
  Line 2, substring(1, 2) -> 4
  Line 3, substring(1, 2) -> _

  Character Index: 0
  Line 1, substring(0, 1) -> 1
  Line 2, substring(0, 1) -> _
  Line 3, substring(0, 1) -> _
  ```

  From here, it's basically the same as part 1.

</details>
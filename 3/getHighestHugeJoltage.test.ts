import { test, expect } from 'bun:test';
import getHighestHugeJoltage from "./getHighestHugeJoltage";

test('example inputs', () => {
  expect(getHighestHugeJoltage('987654321111111').joltage).toBe(987654321111n)
  expect(getHighestHugeJoltage('811111111111119').joltage).toBe(811111111119n)
  expect(getHighestHugeJoltage('234234234234278').joltage).toBe(434234234278n)
  expect(getHighestHugeJoltage('818181911112111').joltage).toBe(888911112111n)
})
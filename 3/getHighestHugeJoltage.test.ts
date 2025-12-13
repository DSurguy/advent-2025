import { test, expect } from 'bun:test';
import getHighestHugeJoltage from "./getHighestHugeJoltage";

test('example inputs', () => {
  expect(getHighestHugeJoltage('987654321111111')).toBe(987654321111n)
  expect(getHighestHugeJoltage('811111111111119')).toBe(811111111119n)
  expect(getHighestHugeJoltage('234234234234278')).toBe(434234234278n)
  expect(getHighestHugeJoltage('818181911112111')).toBe(888911112111n)
})
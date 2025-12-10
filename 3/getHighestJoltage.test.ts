import { test, expect } from 'bun:test';
import getHighestJoltage from "./getHighestJoltage";

test('example inputs', () => {
  expect(getHighestJoltage('987654321111111')).toBe(98)
  expect(getHighestJoltage('811111111111119')).toBe(89)
  expect(getHighestJoltage('234234234234278')).toBe(78)
  expect(getHighestJoltage('818181911112111')).toBe(92)
})
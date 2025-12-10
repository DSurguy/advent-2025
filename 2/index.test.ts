import { expect, test } from 'bun:test';
import { isInvalid } from './invalidChecks';

test("valid", () => {
  expect(isInvalid("12345").invalid).toBe(false);
  expect(isInvalid("0").invalid).toBe(false);
  expect(isInvalid("12321").invalid).toBe(false);
  expect(isInvalid("12312").invalid).toBe(false);
  expect(isInvalid("646464645").invalid).toBe(false);
  expect(isInvalid("12121").invalid).toBe(false);
})

test("invalid", () => {
  expect(isInvalid("11").invalid).toBe(true);
  expect(isInvalid("22").invalid).toBe(true);
  expect(isInvalid("99").invalid).toBe(true);
  expect(isInvalid("111").invalid).toBe(true);
  expect(isInvalid("999").invalid).toBe(true);
  expect(isInvalid("1010").invalid).toBe(true);
  expect(isInvalid("1188511885").invalid).toBe(true);
  expect(isInvalid("222222").invalid).toBe(true);
  expect(isInvalid("446446").invalid).toBe(true);
  expect(isInvalid("38593859").invalid).toBe(true);
  expect(isInvalid("565656").invalid).toBe(true);
  expect(isInvalid("824824824").invalid).toBe(true);
  expect(isInvalid("2121212121").invalid).toBe(true);
  expect(isInvalid("77777").invalid).toBe(true);
})
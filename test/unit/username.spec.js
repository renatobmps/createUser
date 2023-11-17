import { expect, it } from "bun:test";
import Username from "../../src/models/Username";

const username = new Username("new_user_test");

it("should to create a user", () => {
  expect(username).toBeTruthy();
  expect(username).toBeInstanceOf(Username);
});

it("should to throw error to falsy value", () => {
  expect(() => (username.value = 0)).toThrow("Username must be defined: 0");

  expect(() => (username.value = null)).toThrow(
    "Username must be defined: null"
  );

  expect(() => (username.value = undefined)).toThrow(
    "Username must be defined: undefined"
  );
});

it("should to throw to non string username", () => {
  expect(() => (username.value = 123456789101112)).toThrow(
    "Incorrect username type: 123456789101112"
  );

  expect(() => (username.value = [])).toThrow("Incorrect username type: []");

  expect(() => (username.value = {})).toThrow("Incorrect username type: {}");
});

it("should to throw if username has space", () => {
  expect(() => (username.value = "user name")).toThrow(
    "Username cannot have space character: user name"
  );

  expect(() => (username.value = " username")).not.toThrow();

  expect(() => (username.value = "username ")).not.toThrow();

  expect(() => (username.value = "  username")).not.toThrow();

  expect(() => (username.value = "username  ")).not.toThrow();
});

it("should to throw if username has special character", () => {
  expect(() => (username.value = "user@name")).toThrow(
    "Username cannot have special character: user@name"
  );

  expect(() => (username.value = "user!name")).toThrow(
    "Username cannot have special character: user!name"
  );

  expect(() => (username.value = "user-name")).toThrow(
    "Username cannot have special character: user-name"
  );
});

it("should to throw if username has uppercase character", () => {
  expect(() => (username.value = "Username")).toThrow(
    "Username cannot have uppercase character: Username"
  );
});

it("should be possible update the username", async () => {
  username.value = "new_username";
  expect(username.value).toBe("new_username");
});

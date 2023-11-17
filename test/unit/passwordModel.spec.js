import { expect, it } from "bun:test";
import Password from "../../src/models/Password";

const mockHash = {
  async doHash(password) {
    return `${password}_hashed`;
  },
};

const password = new Password({
  password: "123456_Password",
  passwordHashing: mockHash,
});

it("should to create a password", () => {
  expect(password).toBeTruthy();
  expect(password).toBeInstanceOf(Password);
  expect(password.value).toBeTruthy();
  expect(password.hash).toBeTruthy();
});

it("should be possible update the password", async () => {
  password.value = "Password_456123";
  expect(await password.hash).toBe("Password_456123_hashed");
  expect(password.value).toBe("Password_456123");

  password.value = `8_-EiD'py+fUn:Y`;
  expect(await password.hash).toBe(`8_-EiD'py+fUn:Y_hashed`);
  expect(password.value).toBe(`8_-EiD'py+fUn:Y`);

  password.value = "x_{'`4GrEUj@YVZ8Ph=N7";
  expect(await password.hash).toBe("x_{'`4GrEUj@YVZ8Ph=N7_hashed");
  expect(password.value).toBe("x_{'`4GrEUj@YVZ8Ph=N7");

  password.value = "THg{-]=5t6/rKB?'%}c:4$";
  expect(await password.hash).toBe("THg{-]=5t6/rKB?'%}c:4$_hashed");
  expect(password.value).toBe("THg{-]=5t6/rKB?'%}c:4$");

  password.value = "C~a-S;s9EX(._)q*y3w>+!";
  expect(await password.hash).toBe("C~a-S;s9EX(._)q*y3w>+!_hashed");
  expect(password.value).toBe("C~a-S;s9EX(._)q*y3w>+!");

  password.value = "K?V[/^vF.=_Z>QJ{7;em!c";
  expect(await password.hash).toBe("K?V[/^vF.=_Z>QJ{7;em!c_hashed");
  expect(password.value).toBe("K?V[/^vF.=_Z>QJ{7;em!c");

  password.value = "re_;D<m$7VRA#QN,`:GpXE";
  expect(await password.hash).toBe("re_;D<m$7VRA#QN,`:GpXE_hashed");
  expect(password.value).toBe("re_;D<m$7VRA#QN,`:GpXE");
});

it("should to throw if password has no special character", () => {
  expect(() => (password.value = "1PasswordWithoutSpecial")).toThrow(
    "Password must have less 1 lowercase character: 1PasswordWithoutSpecial"
  );
});

it("should to throw if password has no lowercase character", () => {
  expect(() => (password.value = "1_PASSWORD_WITHOUT_LC")).toThrow(
    "Password must have less 1 lowercase character: 1_PASSWORD_WITHOUT_LC"
  );
});

it("should to throw if password has no uppercase character", () => {
  expect(() => (password.value = "1_password_without_uc")).toThrow(
    "Password must have less 1 uppercase character: 1_password_without_uc"
  );
});

it("should to throw if password has no number character", () => {
  expect(() => (password.value = "Without_Numbers")).toThrow(
    "Password must have less 1 number character: Without_Numbers"
  );
});

it("should to throw if password has more than 24 character", () => {
  expect(
    () => (password.value = "A_password_with_more_characters_than_24")
  ).toThrow(
    "Password must have max 24 characters: A_password_with_more_characters_than_24"
  );
});

it("should to throw if password has less than 12 character", () => {
  expect(() => (password.value = "less12")).toThrow(
    "Password must have less 12 characters: less12"
  );
});

it("should to throw to non string password", () => {
  expect(() => (password.value = 123456789101112)).toThrow(
    "Incorrect password type: 123456789101112"
  );

  expect(() => (password.value = [])).toThrow("Incorrect password type: []");

  expect(() => (password.value = {})).toThrow("Incorrect password type: {}");
});

it("should to throw error to falsy value", () => {
  expect(() => (password.value = 0)).toThrow("Password must be defined: 0");

  expect(() => (password.value = null)).toThrow(
    "Password must be defined: null"
  );

  expect(() => (password.value = undefined)).toThrow(
    "Password must be defined: undefined"
  );
});

import { expect, it } from "bun:test";
import Email from "../../src/models/Email";

it("should to create an e-mail", () => {
  const email = new Email("email@test.com");

  expect(email).toBeTruthy();
  expect(email).toBeInstanceOf(Email);
});

it("should to format e-mail to lowercase", () => {
  const email = new Email("Email@Test.Com");

  expect(email.value).toBe("email@test.com");
});

it("should to return test.com as domain", () => {
  const email = new Email("email@test.com");

  expect(email.domain).toBe("test.com");
});

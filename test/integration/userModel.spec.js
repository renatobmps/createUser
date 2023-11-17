import { expect, it } from "bun:test";
import User from "../../src/v1/services/CreateUser/User";
import Email from "../../src/models/Email";
import Password from "../../src/models/Password";
import Username from "../../src/models/Username";

const user = new User({
  email: new Email("me@mail.com"),
  password: new Password({
    password: "123456789*Me",
    passwordHashing: {
      doHash: async () => "password_hash",
    },
  }),
  username: new Username("my_name"),
});

it("should to create an user", async () => {
  expect(user).toBeTruthy();
  expect(user).toBeInstanceOf(User);
  expect(user.email).toBeTruthy();
  expect(user.email).toBeInstanceOf(Email);
  expect(user.email.domain).toBe("mail.com");
  expect(user.email.value).toBe("me@mail.com");
  expect(user.password).toBeTruthy();
  expect(user.password).toBeInstanceOf(Password);
  expect(await user.password.hash).toBe("password_hash");
  expect(user.password.value).toBe("123456789*Me");
  expect(user.username).toBeTruthy();
  expect(user.username).toBeInstanceOf(Username);
  expect(user.username.value).toBe("my_name");
});

it("should to be possible to update email", () => {
  user.email.value = "newemail@test.com";

  expect(user.email.domain).toBe("test.com");
  expect(user.email.value).toBe("newemail@test.com");
});

it("should to be possible to update password", async () => {
  user.password.value = "1New&Password";

  expect(await user.password.hash).toBe("password_hash");
  expect(user.password.value).toBe("1New&Password");
});

it("should to be possible to update username", () => {
  user.username.value = "my_new_username";

  expect(user.username.value).toBe("my_new_username");
});

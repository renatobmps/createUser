import { expect, it, mock } from "bun:test";
import CreateUser from "../../src/v1/services/CreateUser";

const mockRepository = {
  findDuplicateByEmail: mock(async () => {}),
  findDuplicateByUsername: mock(async () => {}),
  createUser: mock(async () => {}),
};

const mockMailService = {
  sendEmailValidate: mock(async () => {}),
};

it("should to instance service", () => {
  const createUser = new CreateUser({
    mailService: mockMailService,
    repository: mockRepository,
  });

  expect(createUser).toBeTruthy();
  expect(createUser).toBeInstanceOf(CreateUser);
});

it("should to execute service", async () => {
  const createUser = new CreateUser({
    mailService: mockMailService,
    repository: mockRepository,
  });

  await createUser.execute({
    email: "my@mail.com",
    password: "Password$Strong1",
    username: "username",
  });

  expect(mockRepository.findDuplicateByEmail).toHaveBeenCalled();
  expect(mockRepository.findDuplicateByEmail).toHaveBeenCalledTimes(1);
  expect(mockRepository.findDuplicateByUsername).toHaveBeenCalled();
  expect(mockRepository.findDuplicateByUsername).toHaveBeenCalledTimes(1);
  expect(mockRepository.createUser).toHaveBeenCalled();
  expect(mockRepository.createUser).toHaveBeenCalledTimes(1);
  expect(mockMailService.sendEmailValidate).toHaveBeenCalled();
  expect(mockMailService.sendEmailValidate).toHaveBeenCalledTimes(1);
});

it("should to throw error when a mail service is not provided", () => {
  expect(
    () =>
      new CreateUser({
        repository: mockRepository,
      })
  ).toThrow("A mail service implementation is required");
});

it("should to throw error when a repository service is not provided", () => {
  expect(
    () =>
      new CreateUser({
        mailService: mockMailService,
      })
  ).toThrow("A repository implementation is required");
});

it("should to throw error when a e-mail is not provided", () => {
  const createUser = new CreateUser({
    mailService: mockMailService,
    repository: mockRepository,
  });

  expect(() =>
    createUser.execute({
      password: "Password$Strong1",
      username: "username",
    })
  ).toThrow();
});

it("should to throw error when a password is not provided", () => {
  const createUser = new CreateUser({
    mailService: mockMailService,
    repository: mockRepository,
  });

  expect(() =>
    createUser.execute({
      email: "my@mail.com",
      username: "username",
    })
  ).toThrow();
});

it("should to throw error when an username is not provided", () => {
  const createUser = new CreateUser({
    mailService: mockMailService,
    repository: mockRepository,
  });

  expect(() =>
    createUser.execute({
      email: "my@mail.com",
      password: "Password$Strong1",
    })
  ).toThrow();
});

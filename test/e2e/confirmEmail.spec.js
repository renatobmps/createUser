import { beforeAll, expect, it } from "bun:test";
import createNewUserMock from "../fn/createUserMock";

let newHash = null;

beforeAll(async () => {
  const request = await fetch(`${process.env.HOST}api/v1/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createNewUserMock()),
  });

  const { data } = await request.json();

  newHash = data.emailId;
});

it("should to confirm an email", async () => {
  const request = await fetch(
    `${process.env.HOST}api/v1/mail/validate/${newHash}`
  );

  expect(request.status).toBe(200);
});

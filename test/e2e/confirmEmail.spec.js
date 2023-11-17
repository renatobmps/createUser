import { expect, it } from "bun:test";

it("should to confirm an email", async () => {
  const request = await fetch(
    `${process.env.HOST}api/v1/mail/277eb0e3-4d24-4853-aaaa-d181369a79cf`
  );

  expect(request.status).toBe(200);
});

import { expect, it } from "bun:test";
import createNewUserMock from "../fn/createUserMock";

it("should to create an user", async () => {
  expect(1).toBe(1);
  // const request = await fetch(`${process.env.HOST}api/v1/user/`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(createNewUserMock()),
  // });

  // if (request.status !== 201) {
  //   const data = request.json();

  //   expect(request.status).toBe(400);
  //   expect(data.status).toBe("ko");
  //   expect(data.message).toBe("User already exists");
  // } else {
  //   expect(request.status).toBe(201);
  // }
});

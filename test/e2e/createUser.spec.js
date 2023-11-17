import { expect, it } from "bun:test";

it("should to create an user", async () => {
  const random = Math.floor(Math.random() * 1024);
  console.log(`Testing: ${random}`);

  const mockData = {
    username: "test_username_" + random,
    email: `email${random}@mail.com`,
    password: "1@Qw3$Er5¨Ty",
  };

  const request = await fetch(`${process.env.HOST}/api/v1/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mockData),
  });

  if (request.status !== 201) {
    const data = request.json();

    expect(request.status).toBe(400);
    expect(data.status).toBe("ko");
    expect(data.message).toBe("User already exists");
  } else {
    expect(request.status).toBe(201);
  }
});

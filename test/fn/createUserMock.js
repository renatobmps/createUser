function createNewUserMock() {
  const random = Math.floor(Math.random() * 1024);

  const mockData = {
    username: "test_username_" + random,
    email: `email${random}@mail.com`,
    password: "1@Qw3$Er5¨Ty",
  };

  return mockData;
}

export default createNewUserMock;

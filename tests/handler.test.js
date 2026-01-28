const { handler } = require("../src/index");

test("Lambda handler returns 200", async () => {
  const result = await handler({});
  expect(result.statusCode).toBe(200);
});

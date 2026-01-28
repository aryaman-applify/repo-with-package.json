const { handler } = require("../src/index");

test("Lambda handler returns 200 for /health", async () => {
  const event = {
    httpMethod: "GET",
    path: "/health"
  };
  const result = await handler(event);
  expect(result.statusCode).toBe(200);
});


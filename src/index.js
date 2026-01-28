// index.js
// A mini REST-style Lambda handler with routes and fake data

// In-memory "database" (resets each cold start)
let posts = [
  { id: "1", title: "First Post", content: "Hello from Lambda!", author: "Aryaman" },
  { id: "2", title: "Second Post", content: "This is more interesting.", author: "Copilot" }
];

// Helper: build response
function response(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
}

exports.handler = async (event) => {
  const method = event.httpMethod || "GET";
  const path = event.path || "/";

  // Health check
  if (method === "GET" && path === "/health") {
    return response(200, { status: "ok", service: "lambda-blog", time: new Date().toISOString() });
  }

  // List all posts
  if (method === "GET" && path === "/posts") {
    return response(200, { posts, count: posts.length });
  }

  // Get a single post by ID
  if (method === "GET" && path.startsWith("/posts/")) {
    const id = path.split("/")[2];
    const post = posts.find(p => p.id === id);
    return post ? response(200, post) : response(404, { error: "Post not found" });
  }

  // Create a new post
  if (method === "POST" && path === "/posts") {
    const body = JSON.parse(event.body || "{}");
    const newPost = {
      id: (posts.length + 1).toString(),
      title: body.title || "Untitled",
      content: body.content || "No content",
      author: body.author || "Anonymous",
      url: `https://example.com/posts/${posts.length + 1}`
    };
    posts.push(newPost);
    return response(201, { message: "Post created", post: newPost });
  }

  // Fallback
  return response(404, { error: "Route not found", method, path });
};


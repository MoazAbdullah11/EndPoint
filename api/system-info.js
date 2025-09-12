// api/system-info.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Parse incoming JSON
    let body = {};
    try {
      body = req.body;
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON" });
    }

    console.log("✅ Received system info:", body);

    // In real project, save to DB (MongoDB, MySQL, etc.)
    return res.status(200).json({
      status: "ok",
      receivedAt: new Date().toISOString(),
    });
  }

  // If not POST
  res.status(405).json({ error: "Method not allowed" });
}

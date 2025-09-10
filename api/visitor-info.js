// api/visitor-info.js
import geoip from "geoip-lite";

export default function handler(req, res) {
  if (req.method === "POST") {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    const serverSideInfo = {
      ip,
      userAgent: req.headers["user-agent"],
      language: req.headers["accept-language"],
      location: geoip.lookup(ip) || null,
    };

    let clientSideInfo = {};
    try {
      clientSideInfo = req.body?.client_info || {};
    } catch {}

    const visitorData = { ...serverSideInfo, ...clientSideInfo };

    console.log("Visitor data:", visitorData);

    res.status(200).json({ success: true, visitorData });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

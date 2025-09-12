import si from "systeminformation";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // client payload
      const clientData = req.body;

      // server CPU details
      const cpu = await si.cpu();
      const cpuDetails = {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        vendor: cpu.vendor,
        family: cpu.family,
        cores: cpu.cores,
        physicalCores: cpu.physicalCores,
        performanceCores: cpu.performanceCores,
        efficiencyCores: cpu.efficiencyCores,
        speed: cpu.speed + "GHz",
        speedMin: cpu.speedMin + "GHz",
        speedMax: cpu.speedMax + "GHz",
        cache: cpu.cache
      };

      const finalData = {
        ...clientData,
        cpu: cpuDetails, // 🔥 add core details
      };

      res.status(200).json({ success: true, data: finalData });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

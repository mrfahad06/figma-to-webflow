export default function handler(req, res) {
  res.status(200).json({
    status: "success",
    message: "API is working fine 🚀",
    timestamp: new Date().toISOString(),
  });
}

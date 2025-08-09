// Load environment variables
require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch"); // Glitch & Node 18+ have built-in fetch, but keeping for compatibility
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test Webflow connection
app.get("/test-webflow", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.webflow.com/v2/sites/${process.env.SITE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from Webflow:", error);
    res.status(500).json({ error: "Failed to connect to Webflow" });
  }
});

// Endpoint to receive Figma data
app.post("/from-figma", async (req, res) => {
  console.log("📦 Received from Figma:", req.body);

  // For now, just respond — later we'll push to Webflow
  res.json({ status: "success", received: req.body });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

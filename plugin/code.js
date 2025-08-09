figma.showUI(__html__, { width: 300, height: 180 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === "send-data") {
    const payload = {
      title: figma.root.name,
      pageCount: figma.root.children.length,
      timestamp: new Date().toISOString()
    };

    try {
      const res = await fetch("https://YOUR_CLOUD_BACKEND_URL/from-figma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("Server response:", data);
      figma.notify("✅ Data sent successfully!");
      figma.ui.postMessage({ status: "Done" });
    } catch (error) {
      console.error("Error sending data:", error);
      figma.notify("❌ Failed to send data");
      figma.ui.postMessage({ status: "Failed" });
    }
  }
};

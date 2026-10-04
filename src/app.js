import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import staticRoutes from "./routes/static.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public, /assets, and /data (ES module imports from the browser)
app.use(express.static(path.join(__dirname, "../public")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/data", express.static(path.join(__dirname, "../data")));

// Routes
app.use("/", staticRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).send("Page not found");
});

export default app;
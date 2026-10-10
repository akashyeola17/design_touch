import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import staticRoutes from "./routes/static.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsPath = path.join(__dirname, "../views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/data", express.static(path.join(__dirname, "../data")));

app.use("/", staticRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(viewsPath, "not-found.html"));
});

export default app;

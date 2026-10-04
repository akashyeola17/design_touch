import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsPath = path.join(__dirname, "../../views");

// Home
router.get("/", (req, res) => {
    res.sendFile(path.join(viewsPath, "homePage.html"));
});

// About
router.get("/about", (req, res) => {
    res.sendFile(path.join(viewsPath, "about.html"));
});

// Services
router.get("/services", (req, res) => {
    res.sendFile(path.join(viewsPath, "services.html"));
});

// Projects
router.get("/projects", (req, res) => {
    res.sendFile(path.join(viewsPath, "projects.html"));
});

export default router;
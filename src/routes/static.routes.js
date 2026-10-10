import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewsPath = path.join(__dirname, "../../views");

function sendView(res, file) {
  res.sendFile(path.join(viewsPath, file));
}

router.get("/", (req, res) => {
  sendView(res, "homePage.html");
});

router.get("/about", (req, res) => {
  sendView(res, "about.html");
});

router.get("/services", (req, res) => {
  sendView(res, "services.html");
});

router.get("/projects", (req, res) => {
  sendView(res, "projects.html");
});

router.get(["/index.html", "/homePage.html", "/home.html"], (req, res) => {
  res.redirect(301, "/");
});

router.get(["/about.html", "/about/"], (req, res) => {
  res.redirect(301, "/about");
});

router.get(["/services.html", "/services/"], (req, res) => {
  res.redirect(301, "/services");
});

router.get(["/projects.html", "/projects/"], (req, res) => {
  res.redirect(301, "/projects");
});

export default router;

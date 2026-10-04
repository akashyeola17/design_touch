import projects from "../data/projects.js";
// Foundation hook for the portfolio phase; no project entries are published until verified.
export function getProjects() { return [...projects]; }

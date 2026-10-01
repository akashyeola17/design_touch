// Portfolio filter behavior will be added when verified project data is available.
export function filterProjects(projects, category = "all") {
  return category === "all" ? projects : projects.filter((project) => project.category === category);
}

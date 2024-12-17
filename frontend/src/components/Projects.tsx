import React, { useEffect, useState } from "react";
import { createProject, fetchCategories, fetchProjects, updateProject } from "../services/api";


interface Project {
  id: number;
  name: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  useEffect(() => {
    fetchProjects().then(setProjects);
    fetchCategories().then(setCategories);
  }, []);

  const handleCreate = async () => {
    if (!newProjectName || !selectedCategoryId)
      return alert("Projet  name and category sont requis.");
    const project = await createProject(newProjectName, selectedCategoryId);
    setProjects((prev) => [...prev, project]);
    setNewProjectName("");
  };

  const handleUpdate = async (id: number) => {
    const newName = prompt("Entrer le new projet:");
    if (newName) {
      const updatedProject = await updateProject(id, newName, selectedCategoryId || 0);
      setProjects((prev) =>
        prev.map((proj) => (proj.id === id ? updatedProject : proj))
      );
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <select onChange={(e) => setSelectedCategoryId(Number(e.target.value))}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New project name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <button onClick={handleCreate}>Add Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} (Category ID: {project.category_id})
            <button onClick={() => handleUpdate(project.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
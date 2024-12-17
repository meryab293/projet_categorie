const API_URL = "http://localhost:3001";

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  return response.json();
};

export const createCategory = async (name: string) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
};


    export const updateCategory = async (id: number, name: string) => {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      return response.json();
    };
    
    export const fetchProjects = async (categoryId?: number) => {
      const url = categoryId ? `${API_URL}/projects?categoryId=${categoryId}` : `${API_URL}/projects`;
      const response = await fetch(url);
      return response.json();
    };
    
    export const createProject = async (name: string, categoryId: number) => {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, categoryId }),
      });
      return response.json();
    };
    export const updateProject = async (id: number, name: string, categoryId: number) => {
        const response = await fetch(`${API_URL}/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, categoryId }),
        });
        return response.json();
      }
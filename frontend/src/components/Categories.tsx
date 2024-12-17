import React, { useEffect, useState } from "react";
import { fetchCategories, createCategory, updateCategory } from "../services/api";


interface Category {
  id: number;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleCreate = async () => {
    if (!newCategory) return alert("la cétégorie nom ne peut pas être vide");
    const category = await createCategory(newCategory);
    setCategories((prev) => [...prev, category]);
    setNewCategory("");
  };

  const handleUpdate = async (id: number) => {
    const updatedName = prompt("Entrer nouveau nom de catégorie:");
    if (updatedName) {
      const updatedCategory = await updateCategory(id, updatedName);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <input
        type="text"
        placeholder="Nouvelle catégorie"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleCreate}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleUpdate(category.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
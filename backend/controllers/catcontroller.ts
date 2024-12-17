import { Request, Response } from 'express';
import pool from '../app';


export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
    return res.status(201).json(result.rows[0]);
  } catch (err:any) {
    console.error('Erreur lors de la création de la catégorie', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    return res.status(200).json(result.rows); 
  } catch (err:any) {
    console.error('Erreur lors de la récupération des catégories', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


export const getCategoryById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err:any) {
    console.error('Erreur lors de la récupération de la catégorie', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    return res.status(200).json(result.rows[0]); 
  } catch (err:any) {
    console.error('Erreur lors de la mise à jour de la catégorie', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }
    return res.status(200).json({ message: 'Catégorie supprimée avec succès' });
  } catch (err:any) {
    console.error('Erreur lors de la suppression de la catégorie', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

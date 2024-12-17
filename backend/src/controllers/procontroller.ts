import { Request, Response } from 'express';
import pool from '../app';


export const createProjet = async (req: Request, res: Response): Promise<Response> => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (name) VALUES ($1) RETURNING *',
      [name]
    );
    return res.status(201).json(result.rows[0]); 
  } catch (err:any) {
    console.error('Erreur lors de la création du projet', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const getProjets = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    return res.status(200).json(result.rows); 
  } catch (err:any) {
    console.error('Erreur lors de la récupération des projets', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const getProjetById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    return res.status(200).json(result.rows[0]);
  } catch (err:any) {
    console.error('Erreur lors de la récupération du projet', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const updateProjet = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { name} = req.body;
  try {
    const result = await pool.query(
      'UPDATE projects SET name = $1 WHERE id = $3 RETURNING *',
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    return res.status(200).json(result.rows[0]); 
  } catch (err:any) {
    console.error('Erreur lors de la mise à jour du projet', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};


export const deleteProjet = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    return res.status(200).json({ message: 'Projet supprimé avec succès' });
  } catch (err:any) {
    console.error('Erreur lors de la suppression du projet', err.stack);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

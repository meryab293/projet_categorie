import { Router } from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/catcontroller';
import {
  getProjets,
  getProjetById,
  createProjet,
  updateProjet,
  deleteProjet,
} from '../controllers/procontroller';

const router: Router = Router();

const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch(next);
  };
};

router.get('/categories', asyncHandler(getCategories));


router.get('/categories/:id', asyncHandler(getCategoryById));


router.post('/categories', asyncHandler(createCategory));


router.put('/categories/:id', asyncHandler(updateCategory));


router.delete('/categories/:id', asyncHandler(deleteCategory));

                                                                // pour les projets "routes"

router.get('/projets', asyncHandler(getProjets));


router.get('/projets/:id', asyncHandler(getProjetById));


router.post('/projets', asyncHandler(createProjet));

router.put('/projets/:id', asyncHandler(updateProjet));

router.delete('/projets/:id', asyncHandler(deleteProjet));

export default router;
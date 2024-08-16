import express from 'express';
import { getAllBeneficios, createBeneficio, getBeneficioById, updateBeneficio, deleteBeneficio } from '../controllers/BeneficioController.js';

const beneficioRouter = express.Router();

beneficioRouter.route('/beneficio/')
    .get(getAllBeneficios)
    .post(createBeneficio);

beneficioRouter.route('/beneficio/:id')
    .get(getBeneficioById)
    .put(updateBeneficio)
    .delete(deleteBeneficio);

export default beneficioRouter;
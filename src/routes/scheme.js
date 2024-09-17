import express from 'express';
import { createScheme, deleteScheme, getSchemeById, getSchemes, updateScheme } from '../controllers/scheme.js';

const router = express.Router();

router.route('/')
  .post(createScheme)
  .get(getSchemes);

router.route('/:id')
  .get(getSchemeById)
  .put(updateScheme)
  .delete(deleteScheme);

export const schemeRouter =  router;

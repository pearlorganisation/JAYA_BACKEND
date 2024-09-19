import express from 'express';
import { addSchemeToBookmarks, deleteBookmark, getBookmarksByUser, removeSchemeFromBookmarks } from '../controllers/bookmark.js';

const router = express.Router();


router.route('/:userId')
  .get(getBookmarksByUser)
  .delete(deleteBookmark);

router.route('/addScheme')
  .put(addSchemeToBookmarks);

router.route('/removeScheme')
  .put(removeSchemeFromBookmarks);

export const bookmarkRouter =  router;

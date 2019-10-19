import { Router, static as staticDir } from 'express';
import { join } from 'path';

import renderer from './renderer';

const router = Router();

router.use('/static', staticDir(join('build/client', 'static')));
router.use(renderer);

export default router;

import express from 'express';

import disatanceRouter from './api/distance/distance';
import helloRouter from './api/hello';
import healthRouter from './api/health/health';
import popularSearchRouter from './api/popular-search/popular-search';

const router = express.Router();

router.use("/hello", helloRouter);
router.use("/distance", disatanceRouter);
router.use("/health", healthRouter);
router.use("/popularsearch", popularSearchRouter);

export default router;
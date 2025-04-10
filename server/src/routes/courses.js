import express from 'express';
import { Course } from '../models/Course';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().cache({ key: 'all-courses' });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

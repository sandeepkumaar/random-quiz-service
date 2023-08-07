import express from 'express';
import randomiseArray from './randomise-array.js';
import {questions} from './list.js'

let storage = new Map();

const router = express.Router();


router.post(`/create`, async function(req, res, ctx) {
  await storage.clear();
  const {count} = req.body;
  let randomQuizList = randomiseArray(questions, Number(count));
  //randomQuizList = randomQuizList.map((q, index) => ({
  //  ...q,
  //  index
  //}));

  await storage.set('randomQuizList', randomQuizList);
  let ids =  randomQuizList.map(({question_id}) => question_id);
  return res.status(200).json({
    ok: true,
    totalCount: randomQuizList.length,
    ids,
  })
})



export default router;

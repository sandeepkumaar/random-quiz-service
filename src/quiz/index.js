import express from 'express';
import randomiseArray from './randomise-array.js';
import {questions} from './list.js'

let storage = new Map();
storage.set('randomQuizList', []);

const router = express.Router();


router.post(`/create`, function(req, res, next) {
  storage.clear();
  const {count} = req.body;
  let randomQuizList = randomiseArray(questions, Number(count));
  //randomQuizList = randomQuizList.map((q, index) => ({
  //  ...q,
  //  index
  //}));

  storage.set('randomQuizList', randomQuizList);
  let ids =  randomQuizList.map(({question_id}) => question_id);
  return res.status(200).json({
    ok: true,
    totalCount: randomQuizList.length,
    ids,
  })
})

router.get(`/:id`, function(req, res, next) {
  let {id} = req.params;
  let randomQuizList = storage.get('randomQuizList');
  let quiz = randomQuizList.find(({question_id}) => {
    return question_id === Number(id);
  })

  res.status(200);
  return res.json({
    ok: true,
    quiz
  })
});

router.get(`/`, function(req, res, next) {
  let randomQuizList = storage.get('randomQuizList');
  //let values = Object.values(questionsById);

  return res.status(200).json({
    ok: true,
    randomQuizList
  })
})

router.put(`/`, function(req, res, next) {
  let {id, userAnswerIndex} = req.body;
  let randomQuizList = storage.get('randomQuizList');
  log.debug({randomQuizList, id}, 'randomQuizList');
  let quiz = randomQuizList.find(({question_id}) => {
    //console.log(question_id);
    return question_id === Number(id);
  })
  if(!quiz) {
    res.status(500)
    return res.json({
      ok: false,
      statusText: 'Internal Server Error',
      message: 'Cannot find the Item to update'
    })
  }

  
  let isCorrect = false;
  if(quiz.answer_index === userAnswerIndex) {
    isCorrect = true;
  };
  quiz = {...quiz, isCorrect, userAnswerIndex};
  
  let quizIndex = quiz.index;
  randomQuizList[quizIndex] = quiz;
  storage.set('randomQuizList', randomQuizList);

  res.status(200)
  return res.json({
    ok: true,
    quiz,
  })

})

export default router;

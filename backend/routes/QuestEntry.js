const router = require('express').Router();
let QuestEntry = require('../models/QuestEntry.model');

router.route('/').get((req, res) => {
    QuestEntry.find()
    .then(quests => res.json(quests))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const description = req.body.description;
  const isDone = Boolean(req.body.isDone);
  const pictureURL = req.body.pictureURL;

  const newQuestEntry = new QuestEntry({
    description,
    isDone,
    pictureURL
  });

  newQuestEntry.save()
  .then(() => res.json('Quest added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    QuestEntry.findById(req.params.id)
      .then(quest => res.json(quest))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    QuestEntry.findByIdAndDelete(req.params.id)
      .then(() => res.json('Quest deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    QuestEntry.findById(req.params.id)
      .then(quest => {
        quest.description = req.body.description;
        quest.isDone = Boolean(req.body.isDone);
        quest.pictureURL = req.body.pictureURL;
  
        quest.save()
          .then(() => res.json('Quest updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
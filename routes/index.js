'use strict';

var express = require('express');
const fs = require('fs');
var router = express.Router();
let rawquestions = fs.readFileSync('questions.json');
let questions = JSON.parse(rawquestions);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Proust questionaire generator', questions: questions });
});


module.exports = router;

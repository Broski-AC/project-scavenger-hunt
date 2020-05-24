const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const db = config.get('mongoURI');

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const taskRouter = require('./routes/QuestEntry');

app.use('/quests', taskRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/myapp';

// database connection
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log('connect to mongodb ');
    })
    .catch((err) => {
        console.log('somthing went wrong with mongodb \n' + err);
    });


const projectRoutes = require('./route/project');
const taskRoutes = require('./route/task');

app.use(express.json());

app.use('/api', projectRoutes); 
app.use('/api', taskRoutes);


app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

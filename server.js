const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log('App is running on port ' + port);
})

app.use(express.static(path.join(__dirname, 'dist', 'Cloud-Drive')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist', 'Cloud-Drive', 'index.html'));
})
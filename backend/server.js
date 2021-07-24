const express = require('express');
const cors = require('cors')
const data = require('./data.js');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.get('/api/product',(req,res)=>{
    res.send(data.products);
})

app.listen(PORT,()=>{
    console.log(`Server start at http://localhost:${PORT}`);
});
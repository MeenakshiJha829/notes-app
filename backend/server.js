const app =require('./app');
const cors=require('cors');

const port=3000;

app.use(cors());

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);

})
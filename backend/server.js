const app =require('./app');
const core=require('cors');

const port=3000;

app.use(cors());

app.listen(port,()=>{
    console.log(`Server is running at ${port}`);

})
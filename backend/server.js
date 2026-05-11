const app =require('./app');
const cors=require('cors');
require("dotenv").config();

const port= process.env.PORT||3000;

app.use(cors());

console.log("ENV CHECK:", process.env.DATABASE_URL);


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);

})
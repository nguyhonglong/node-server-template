import 'dotenv/config'
import connectDB from './configs/db.js';
import  express  from "express";
import cors from "cors";
import auth from "./routes/authRoute.js";
import post from "./routes/postRoute.js";
import errorHandler from './middlewares/errorHandler.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', auth)
app.use('/api/v1/posts', post)

app.all('*', (req,res,next) => {
    const err = new Error('The route cannot be found')
    err.statusCode = 404;
    next(err);
})

app.use(errorHandler);

const port = process.env.APP_PORT;
app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})
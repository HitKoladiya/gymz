import express from 'express';
import {loginRouter} from './auth.js'
import {fitnessCenterApp} from './FitnessCenter/index.js'
import { paymentRouter } from './payment.js';
// import {testRouter} from './testFolder/test1.js'
// import cors from 'cors'
const app = express()
const port = 5000

// app.use(cors())


//testing
// app.use(testRouter)

app.use(loginRouter);

app.use(fitnessCenterApp);

app.use(paymentRouter);

app.get('/', (req, res) => {
  res.send('Hello World!') 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
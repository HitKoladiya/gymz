import express from 'express';
import {formRouter} from './form.js'
import {fitnessCenterRouter} from './fitnessCenter.js'
const fitnessCenterApp = express()

fitnessCenterApp.use(formRouter);

fitnessCenterApp.use(fitnessCenterRouter);

export {fitnessCenterApp}
import express from 'express';
import { initApp } from './src/modules/app.router.js';
import 'dotenv/config';
const PORT = process.env.PORT || 3000;
const app = express();
initApp(app,express);
app.listen(PORT , ()=> {
    console.log(`Server is running ........ ${PORT}`);
});

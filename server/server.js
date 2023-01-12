import app from './app.js'
import connectDB from "./config/db.js";
connectDB()
app.listen(4000, () => {
    console.log('server is up')
})
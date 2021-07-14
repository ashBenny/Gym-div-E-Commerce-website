const app = require('./app');
const cloudinary = require('cloudinary');
// const bodyparser = require('body-parser');
// app.use(bodyparser.urlencoded({ extended:true}))
const connectDatabase = require('./config/dataBase');

const PORT = process.env.PORT || 7777


// DATABASE CONNECTION
connectDatabase()


//CLOUDINARY SETUP (need to add to .env later)
cloudinary.config({
    cloud_name: 'dy0tqwsxl',
    api_key: '369279267149985',
    api_secret: 'JJQiKM1rVKT_NpIEsvlrkNBp5lM'
});


const server =  app.listen(PORT, () => {
    console.log(`SERVER START LISTENING ON PORT: ${PORT}`)
})
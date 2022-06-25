const express= require('express')
const dotenv  = require('dotenv')
const connectDB = require('./config/db')
const exphbs = require("express-handlebars");
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const storiesRouter = require('./routes/stories')
const morgan = require('morgan')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')
const PORT = process.env.PORT || 5000
//setting up the view engine
dotenv.config({path:'config/.env'})
const app  = express();
if(process.env.NODE_ENV.toLowerCase()==="development"){
  app.use(morgan('dev'))
}
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
require("./config/passport")(passport);
app.use(session({
  secret:'whatever',
  resave:false,
  saveUninitialized:true,
  store:MongoStore.create({mongoUrl:process.env.URI})
  

}))
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//setting up static public folder
app.use(express.static(path.join(__dirname,'public')))
//handle bars helpers 
const {formateDate,truncate,stripTags,editIcon} = require('./helpers/hbs')
 //GLOBAL USER 
 app.use((req,res,next)=>{
  res.locals.user =req.user || null
  next()
 })
app.engine(
  ".hbs",
  exphbs.engine({
    helpers:{
      formateDate,
      truncate,
      stripTags,
      editIcon
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
 app.set('view engine','.hbs')

 


//connect to the database
connectDB();
//Handling the routes
app.use('/',indexRouter)
app.use('/auth',authRouter)
app.use('/stories',storiesRouter)

app.listen(PORT,()=>{console.log(`SERVER IS  running in ${process.env.NODE_ENV} MODE on port ${process.env.PORT}`)})
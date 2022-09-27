const express = require('express')
const colors = require('colors')
const cors = require('cors')
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const path = require('path')


const app = express()

//Connect to the database
connectDB()

//Enable cors
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

//Serve the static files
if(process.env.NODE_ENV === 'production'){
    //Set the static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    })
}

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server running on port ${port}`))

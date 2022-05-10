import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose  from 'mongoose'
import { HTTP_PORT, MONGO_URL } from './config'

import schema from './graphql/schema'
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

mongoose.connect(MONGO_URL)
mongoose.connection.once('open', () => {
  console.log('connected to database')
})

app.listen(HTTP_PORT, () => {
  console.log(`🚀 Server ready at  http://localhost:${HTTP_PORT}/graphql`)
})
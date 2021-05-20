import express from 'express'
import {ApolloServer} from 'apollo-server-express'

import {buildSchema} from 'type-graphql'
import { PingResolver } from './resolvers/ping'
import {ProductResolver} from './resolvers/ProductResolver'
export async function startServer( ){
    const app = express();

    //creando servidor de apollo
    const  server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PingResolver,ProductResolver],
            validate: false
        }),
        context: ({req,res}) => ({req,res})
    })
    
    // API de graph y va a correr dentro de express
    server.applyMiddleware({app, path: '/graphql'});
    
    return app;   
}

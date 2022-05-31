// src/index.ts
import * as dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import {buildSchema} from "type-graphql";
import {runner} from './workers/queueRunner'

let res =  [__dirname + "/resolvers/*.ts"]
console.log(res, "OK")
const corsOptions = {
  origin: '*',
  credentials: true
}

async function main() {
  console.log("Launching DB Server")
  const connection = await createConnection()
  const schema = await buildSchema({
  
      //resolvers: [UserResolver, UserBillingResolver, UserMessageResolver, UserPondResolver]
      resolvers:  [__dirname + "/resolvers/*.ts"]
  })
  const server = new ApolloServer({ schema,cors: corsOptions })

  console.log("Launching GraphQL Server")
  await server.listen(process.env.SERVER_PORT || 4003)
  console.log(new Date(new Date().toUTCString()), "on ", process.env.SERVER_PORT)
  console.log("API Server is Ready!")
  const queueRunner = await runner()
  queueRunner().catch((err: any) => console.log(`Queue exited ${err}`))
}
main();
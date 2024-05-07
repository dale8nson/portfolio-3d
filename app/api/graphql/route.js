import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import clientPromise from '@/lib/mongodb'

const resolvers = {
  Query: {
    hello: () => 'world',
    cases: async () => {
      const client = await clientPromise
      const db = client.db('vaccination-data')
      console.log('db: ', db)
      const collection = db.collection('cases')
      const cases = collection.find() || []
      console.log('cases: ', cases)
      const caseList = await  cases.toArray()
      return await caseList
    },
    // case: async (parent, args) => {
    //   const { date } = args
    //   const client = await clientPromise
    //   const db = client.db('vaccination-data')
    //   const cases = db.collection('cases')
    //   const cse = cases.findOne({ date })
    //   console.log('cse: ', cse)
    //   return cse
    // }
  },
  Mutation: {
    addCase: async (parent, args) => {
      console.log(`args: `, args.case)
      const client = await clientPromise
      const db = await client.db('vaccination-data')
      const cases = await db.collection('cases')
      const insert = await cases.insertOne({...args.case, recordId: await cases.countDocuments() + 1 })
      if (insert.acknowledged)
        return args.case
      return null
    }
  }
}

const typeDefs = gql`
type Case {
    _id: ID,
    recordId: Int
    date: Date
    population: Int
    vaccinated: Int
    unvaccinated: Int
    deaths: Int
    vaccinatedDeaths: Int
    unvaccinatedDeaths: Int
  }

  fragment all on Case {
    _id
    date
    population
    vaccinated
    unvaccinated
    deaths
    vaccinatedDeaths
    unvaccinatedDeaths
  }

  type Date {
    day: Int
    month: Int
    year: Int
  }

  input DateInput {
    day: Int
    month: Int
    year: Int
  }

  type Mutation {
    addCase(case:CaseInput): Case
  #   updateCase(date: DateInput): Case,
  #   removeCase(date: DateInput): Case
  }

  type Query { 
    hello: String
    cases: [Case]
    # case(date: String): Case
  }

  input CaseInput {
    date: DateInput!
    population: Int
    vaccinated: Int
    unvaccinated: Int
    deaths: Int
    vaccinatedDeaths: Int
    unvaccinatedDeaths: Int
  }
`

const server = new ApolloServer({
  resolvers,
  typeDefs,
})

console.log(`server: `, server)

const handler = startServerAndCreateNextHandler(server)

console.log(`handler: `, handler)

export { handler as GET, handler as POST }
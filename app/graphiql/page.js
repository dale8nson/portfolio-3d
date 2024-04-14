'use client'
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';

import 'graphiql/graphiql.css';

const fetcher = createGraphiQLFetcher({ url: '/api/graphql' })

export default function Page () {
  return <GraphiQL fetcher={fetcher} /> 
}
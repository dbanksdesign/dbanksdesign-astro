## Amplify AI Kit

### Plot

* My involvement and the team roles and responsibilities
* Problem statement
* Set the stage

Fullstack TypeScript for data, auth, storage, and functions
Built on top of the AWS CDK, so it’s fully extensible
Deploy on every git push
Per developer sandboxes for development


### Approach

Amplify Gen2 Developer Experience
Full-stack TypeScript
Define data models, relationships and authorization rules in a typescript-based schema
Get a fully-typed client to interact with
Deploys AWS AppSync (managed GraphQL service) and DynamoDB tables (NoSQL)
Per-developer cloud sandboxes allow for rapid iteration and testing without affecting other developers

```ts
import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    isDone: a.boolean()
  })
  .authorization(allow => [
    allow.owner(),
    allow.guest().to(['read'])
  ])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  }
});
```

```ts
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>();

// Now you should be able to make CRUDL operations with the data client
const fetchTodos = async () => {
  const { data: todos, errors } = await client.models.Todo.list();
};
```


### Solution

### Outcome

### Impact

3 months after launch, customers are sending 45k requests per month to the Amplify AI Kit API. The team is working on some new feature requests from customers as we get more feedback.

I am working with a Solutions Architect and Technical account manager to help a customer build their own ChatGPT using the Amplify AI kit that their 150-person team will use, for much cheaper than the monthly cost of 150 ChatGPT licenses.

### Failures / Shortcomings
* Debuggability
* Tool Use DX
* Constraints

### Who are the customers?

Front-end and fullstack developers who want to build AI-powered applications.


### What problems do they have?

Authentication and authorization
Data retrieval
Storing message history


### What are the solutions?

Amplify AI Kit provides a unified solution for building AI-powered apps with TypeScript, no prior experience in cloud architecture or AI needed. Provision Amazon Bedrock, connect an LLM to your data, then use a frontend client and UI components to interact with your end users.

### Where it started

This project started from a re:Invent chalk talk I gave in 2023 that showed attendees how to build generative AI functionality in their full-stack Amplify projects easily. It did require setting up a Lambda or an AppSync resolver to talk to Bedrock and it lacked a lot of key functionality like data retrieval and storing message history, but it was a good foundation to get started using Bedrock from a frontend/full-stack perspective. But we thought we could do more to make building generative AI functionality easier with Bedrock and Amplify.

We started to see a pattern emerging in the community where developers were coalescing around a shared archictecture for building AI-powered applications. They were using AWS AppSync as an API and authorization layer and AWS Amplify as a frontend client. We wanted to make it easier for developers to build AI-powered applications with this architecture, so we built Amplify AI Kit.



```ts
export function request(ctx) {

  // Define a system prompt to give the model a persona
  const system =
    "You are a an expert at crafting a haiku. You are able to craft a haiku out of anything and therefore answer only in haiku.";

  const prompt = ctx.args.prompt

  // Construct the HTTP request to invoke the generative AI model
  return {
    resourcePath: `/model/${ctx.env.MODEL_ID}/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        system,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.5,
      },
    },
  };
}

// Parse the response and return the generated haiku
export function response(ctx) {
  const res = JSON.parse(ctx.result.body);
  const haiku = res.content[0].text;

  return haiku;
}
```

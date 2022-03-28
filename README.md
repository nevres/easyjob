# easyjob
Job application web app

## About
This application is created as a basis for job searching site like upwork.
Application is writtien in .net and nextjs (react).

## Identity management
Identity management is provided by IdentityServer4 library. IdentityServer4 is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core.

## Backend
Backend applications is written as a microservice web app consisting of following microservices: 
  - identity
  - jobprocessing
  - profile
  - document. 
  
In front of microservices there is API gateway. Primary responsibility is to perform aggregate logic for the app. API gateway does not encapsulate other microservices behind, which some implementations of API gateway do. All microservices within solution are public APIs, and are protected by oauth2/openid auth. 

### Security
All microservices are registered as API resources in respect to identity provider. All clients that want to communicate with particular microservice need to have allowed microservice scope, and are acccessing the resource using code oauth flow. All microservices, through swagger UI, are also registered as a clients, so that we can execute direct calls and test using swagger UI.
### Implementation
Depending on different complexity and requirement of microservices, multiple architectural styles can be found in solution design. 
Job Microservice is most complex one, with lot of domain logic, so we decided to go with Domain-Driven-Design. API endpoint is decopled from the application layer using mediatr. Application logic is divided into commands and queries, in order to improve readability and single-responsibility-principle. 
### OpenAPI specification
Based on swagger and openAPI specification, API is easily documented. API definition that is generated, can be used as a basis for creation typescript API Client for the UI. For this purpose FrontendClientGenerator project exists. 


## Frontend 
Web app is written in react using hooks and typescript. For development of react app, nextjs is used. Decission is made mostly due to importance of server side rendering. API client is automatically generated with both fetch client and models. 

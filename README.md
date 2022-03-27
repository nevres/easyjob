# easyjob
Job application web app

## About
This application is created as a basis for job site like upwork.
Application is writtien in .net and nextjs (react).
Backend applications is written as a microservice web app consisting of following microservices: identity, jobprocessing, profile, document. 
Communication between microservices is done using rabbitmq. 
In front of microservices we have API gateway. 
Web app is written in react using hooks and typescript. 

Technology stack consists of:
- domain driven design
- cqrs
- grpc
- open api specification
- oauth authentication based on identity microservice.


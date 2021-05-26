Title: API Gateway and Lambda - Full CRUD<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# API Gateway and Lambda - Full CRUD

<!-- <img src="https://i.imgur.com/0pExHXm.png" width=200/> -->



This lecture will focus on creating AWS Lambda functions and configuring them to work with API Gateway. 

- creating and testingLambda functions
- deploying Lambda functions
- configuring API Gateway to trigger Lambda functions

## Prerequisites

- An AWS (Amazon Web Services) account

If you do not have an account, open AWS and click Create a Free Account. Amazon provides a free tier for twelve months,with some limitations,  after you sign-up for an AWS account.

### AWS Lambda

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers.  With Lambda, you can run code for virtually any type of application or backend service - all with zero administration.

Here are some of the main benefits of working with Lambda:

- Virtual functions - no servers to manage
- Integrated with many programming languages
- Limited by time - short executions
- Event Driven and Run on-demand 
- Automated scaling

#### RESTful Routes to CRUD Mapping

Since the gateway we are building will be specific to projects we will make sure to follow the same **RESTful Routes to CRUD Mapping** schema we implemented in the previous unit. 

HTTP Method<br>(Verb) | URI (endpoint)  | CRUD Operation | Typical<br>Controller Action | Has Data<br>Payload
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | index | No
GET     | /projects/:id      | Read a specific _project_ | show | No
POST    | /projects          | Create a new _project_ | create | Yes
PUT     | /projects/:id      | Update specified _project_  | update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | delete | No

# Pokemon API

![](https://i.imgur.com/rRKtN1B.jpg)

### Routing Table

Here is the entire routing table for our Pokemon API.  You will first create the Lambda functions and then the API to assign the **GET /pokemon** and **POST /pokemon** routes only. 

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /pokemon          | Read all _pokemon_ | pokemon-get | No
GET     | /pokemon/:id      | Read a specific _project_ | pokemon-show | No
POST    | /pokemon          | Create a new _project_ | pokemon-create | Yes
PUT     | /pokemon/:id      | Update specified _project_  | pokemon-update | Yes
DELETE  | /pokemon/:id      | Delete specified _project_ | pokemon-delete | No

### Lambda

- Create all Lambda functions based on the following routing table.
- The functions should only return a message such as **GET /pokemon route working successfully** text with the method and route name specific to the route it is meant to support. 
- Create a new test for each Lambda function to confirm that each function works as expected

### API GATEWAY

You will now create a REST API called **pokemon** and only focus on the routes below:

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /pokemon          | Read all _pokemon_ | pokemon-get | No
POST    | /pokemon          | Create a new _project_ | pokemon-create | Yes


#### GET /projects Route
- Create a new Rest API called **pokemon** 
- Create the **GET /pokemon** route and assign it's corresponding Lambda function
- Test that the route works locally and that you receive the correct message
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman

#### POST /projects Route
- Create the **POST /pokemon** route and assign it's corresponding Lambda function
- Test that the route works locally and that you receive the correct message
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman

# Pokemon API

![](https://i.imgur.com/rRKtN1B.jpg)

### Routing Table

Here is the routing table for our Pokemon API.  You will now create the remaining routes that require a **path param**

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /pokemon          | Read all _pokemon_ | pokemon-get | No
GET     | /pokemon/:id      | Read a specific _project_ | pokemon-show | No
POST    | /pokemon          | Create a new _project_ | pokemon-create | Yes
PUT     | /pokemon/:id      | Update specified _project_  | pokemon-update | Yes
DELETE  | /pokemon/:id      | Delete specified _project_ | pokemon-delete | No

### Create Mapping Template

We will only focus on the following 3 routes: 

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /pokemon/:id      | Read a specific _project_ | pokemon-show | No
PUT     | /pokemon/:id      | Update specified _project_  | pokemon-update | Yes
DELETE  | /pokemon/:id      | Delete specified _project_ | pokemon-delete | No

Do the following:
- Create a new **Mapping Template** for each of the above routes
- Configure it to pass the value of the **/:id** path param 
- Test the routes in API Gateway
- Test the routes in Postman

### Create A Model And Body Mapping Template

- Create a model that will enforce the following Pokemon schema

```js
{
    name: "Bulbasaur",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
}
```

**POST /projects route**
- Apply the model to the **Method Request** of the **POST /projects** route
- Create a new **Mapping Template** to the **Integration Request** of the **POST /projects** 
- Apply the model to the **Mapping Template**
- Test that the route works locally and that you receive the correct message
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman

**PUT /projects/:id route**
- Apply the same model to the **Method Request** of the **POST /projects** route
- Create a new **Mapping Template** to the **Integration Request** of the **POST /projects** 
- Apply the model to the **Mapping Template** and make sure to include the path param value
- Test that the route works locally and that you receive the correct message
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman

### Lambda

- Create all Lambda functions based on the following routing table.
- The functions should only return a message such as **GET /pokemon route working successfully** text with the method and route name specific to the route it is meant to support. 
- Create a new test for each Lambda function to confirm that each function works as expected

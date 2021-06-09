# Pokemon API

![](https://i.imgur.com/rRKtN1B.jpg)


<!-- ### Add Items

Add the following items where the **Primary Key** composed of a **Partition Key** set to **PokeId**.

```js
{
    "pokeId": "1",
    "name": "ditto",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
},
{
    "pokeId": "2",
    "name": "ivysaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
},
{
    "pokeId": "3",
    "name": "venusaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
}
``` -->

### Updating Routes 

We will only focus on the following routes. 

HTTP | Resource  | CRUD Operation | Lambda | DynamoDB | Has Data
-----------|------------------|------------------|:---:|:---:|:---:
POST    | /projects          | Create a new _project_ | projects-create | putItem | Yes
PUT     | /projects/:id      | Update specified _project_  | projects-update | updateItem | Yes


Update the Lambda functions to import the AWS SDK and instantiate a new instance of DynamoDB.  The use the corresponding DynamoDB method to work through each route based on how it was done in the lecture. 


**POST /pokemone route**
- Update the Lambda function to import the AWS SDK 
- Instantiate a new instance of DynamoDB.   
- Create a new item in the DB
- Test that Lambda function 
- Add a new **Mapping Template** to **Integration Response** 
- Format the data as expected by the front end
- Test that the route works as expected in the API Gateway
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman

**PUT /pokemon/:id route**
- Update the Lambda function to import the AWS SDK 
- Instantiate a new instance of DynamoDB.   
- Create a new item in the DB
- Test that Lambda function 
- Add a new **Mapping Template** to **Integration Response** 
- Format the data as expected by the front end
- Test that the route works as expected in the API Gateway
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman
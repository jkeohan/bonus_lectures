# Pokemon API

![](https://i.imgur.com/rRKtN1B.jpg)


### Create A DynamoDB Table

Create a new DynamoDB Table called **pokemon**. 

### Add Items

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
```

### Updating Routes 

We will only focus on the following 3 routes. 

HTTP | Resource  | CRUD Operation | Lambda | DynamoDB | Has Data
-----------|------------------|------------------|:---:|:---:|:---:
GET     | /pokemon         | Read all _pokemon_ | pokemon-get | scan| No
GET     | /pokemon/:id      | Read a specific _project_ | pokemon-show | getItem | No
DELETE  | /pokemon/:id      | Delete specified _project_ | pokemon-delete | deleteItem | No

Update the Lambda functions to import the AWS SDK and instantiate a new instance of DynamoDB.  The use the corresponding DynamoDB method to work through each route based on how it was done in the lecture. 


**GET /pokemone route**
- Update the Lambda function to import the AWS SDK 
- Instantiate a new instance of DynamoDB.   
- Retrieve all the items in the DB
- Format the data as to return only the required key:values 
- Test that Lambda function to confirm that it works
- Test that the route in API Gateway to confirm that it works
- Test the route works via Postman

**GET /pokemon/:id route**
- Update the Lambda function to import the AWS SDK 
- Instantiate a new instance of DynamoDB.   
- Retrieve a single item based on the ID from the DB
- Format the data as to return only the required key:values 
- Test that Lambda function to confirm that it works
- Test that the route in API Gateway to confirm that it works
- Test the route works via Postman

**DELETE /pokemon/:id route**
- Update the Lambda function to import the AWS SDK 
- Instantiate a new instance of DynamoDB.   
- Delete a single item based on the ID from the DB
- Test that Lambda function to confirm that it works
- Test that the route in API Gateway to confirm that it works
- Test the route works via Postman
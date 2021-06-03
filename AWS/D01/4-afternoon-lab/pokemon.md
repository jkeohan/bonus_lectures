# Pokemon API

![](https://i.imgur.com/rRKtN1B.jpg)


### Create Mapping Template

We will only focus on the following 3 routes which are configured with a **path param**

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /pokemon/:id      | Read a specific _project_ | pokemon-show | No
PUT     | /pokemon/:id      | Update specified _project_  | pokemon-update | Yes
DELETE  | /pokemon/:id      | Delete specified _project_ | pokemon-delete | No

Do the following:
- Create a new **Mapping Template** for each of the above routes
- Configure the template to create an object that will pass the value of the **/:id** captured in the path param 
- Test each route in API Gateway
- Deploy the API and add an appropriate deployment message
- Test each route in Postman

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
- Create a new **Mapping Template** in the **Integration Request** of the **POST /projects** 
- Apply the model to the **Mapping Template**
- Update the code to reference the keys the route expects to receive
- Test that the route works locally and that you receive the correct message
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman

**PUT /projects/:id route**
- Apply the same model to the **Method Request** of the **POST /projects** route
- Create a new **Mapping Template** in the **Integration Request** of the **POST /projects** 
- Apply the model to the **Mapping Template**
- Update the code to reference the keys the route expects and make sure to include the path param value
- Test that the route works locally and that you receive the correct message
- Deploy the API and add an appropriate deployment message
- Test the route works via Postman


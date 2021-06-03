Title: API Gateway Path Params - Full CRUD<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# API Gateway Path Params

<img src="https://i.imgur.com/0pExHXm.png" width=200/>



This lecture will focus on the following: 

- creating the remaining API Gateway routes
- assigning each one a Lambda function
- implementing full CRUD  

## Prerequisites

- An AWS (Amazon Web Services) account
- A working API Gateway
- Working Lambda functions

### Adding Remaining CRUD Routes

#### RESTful Routes to CRUD Mapping

Here is our **RESTful Routes** table we are using for **/projects** API. Some of the routes include **path params** which are represented by **/:id**. 

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | No
GET     | /projects/:id      | Read a specific _project_ | projects-show | No
POST    | /projects          | Create a new _project_ | projects-create | Yes
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No

<!-- ### Seed Data

Let's import some data to use in order to return it via our routes.  The same seed data will be used later to populate the DynamoDB database. 


#### Projects GET Route

Open the **projects-get** route and click on **File > New File**.

<img src="https://i.imgur.com/pS2zaoi.png" />

Copy/paste the seed data into the file and then save the file as **projectData.js**

<details><summary>Seed Data</summary>


```js
module.exports = [
    {
        "title": "Instagram Quotes",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1582134376/Screen_Shot_2020-01-30_at_8.57.12_AM_cnrvug.png",
        "description": "Add project description here..."
    },
    {
        "title": "Startup Matchmaker",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1533402294/startup-matchmaker.png",
        "description": "Add project description here..."
    },
    {
        "title": "CSS Grid Image Gallery",
        "image": "https://i.imgur.com/L9K6hli.png",
        "description": "Add project description here..."
    },
    {
        "title": "GA Press Release",
        "image": "https://i.imgur.com/V2BP6Nf.png",
        "description": "Add project description here..."
    },
    {
        "title": "Fashion Blog",
        "image": "https://i.imgur.com/orjmTFP.jpg",
        "description": "Add project description here..."
    },
    {
        "title": "FoodSense",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1565124419/food-sense-logo.png",
        "description": "Food Sense...love it..."
    },
    {
        "title": "StreetBall Mecca",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1553206861/streetball-mecca.png",
        "description": "This project was built in D3 and recreates a tabelau dashboard"
    }
]
```
</details>


<img src="https://i.imgur.com/eguUiVT.png">

We should see the new file in the left pane. 

<img src="https://i.imgur.com/rr0pf6F.png">

#### Import And Return The Projects Array

As with all node projects the resource must be imported using the **require** keyword. Also replace any previous content that was assigned to **body** with the imported **projects** array. 

<img src="https://i.imgur.com/dbcOvGX.png" >

Make sure to **Deploy** the new changes made to the Lambda function. 

### Testing The GET Route 

Let's test the route in AWS Gateway and Postman to confirm that it returns the data set. 

**AWS GATEWAY**

<img src="https://i.imgur.com/3pwTDgF.png" width=500>



**POSTMAN**

<img src="https://i.imgur.com/kLqKSSm.png" width=500/> -->

<!-- 
### Exercise - Import Dataset For All Lambda Functions - 5min

- import the dataset into each of the remaining lambda functions -->

## Working With Route Params 

The intent of using **/:id** as the path param will be to target an item based on a specific database id.  The name of the param could be anything but should represent the unique property of the item to be targeted. 

### Creating A Path Param 

Since the **path param** is part of a route we will need to create a new **resource** and associate the corresponding **method**.  

Click on the **/projects** route and then click on **Actions > Create Resource**.

<img src="https://i.imgur.com/SLbZETW.png" width=300/>

Defining the route as a **path param** requires that the **Resource Path** be wrapped in curly braces. 

<img src="https://i.imgur.com/GmdxLhi.png" width=700/>

Once the route is created we should see the resources list updated to include the new route. 

<img src="https://i.imgur.com/QJWb96G.png" />

As with all routes we need to add an HTTP method, in this case it will bee  **GET**.

<img src="https://i.imgur.com/3vzsQQ6.png" />

#### Testing The Route

Of course we should to test that the route works. The testing page now includes a reference to the path we just created.  Let's add a value that represents the ID of the element and run the test to see what it returns. 

<!-- <img src="https://i.imgur.com/lvQD1r9.png" /> -->

<img src="https://i.imgur.com/1a40WdD.png" />

As we can see the test returns our original message, which is expected as we hard coded the message in the response body.  


#### Updating The Lambda Function 

Let's update the **projects-show** Lambda function to pass the event back that it receives. 

As we can see the async function is configured to accept a single **event** argument so let's **console.log** the event and return it in the response. 

```js
exports.handler = async (event) => {
    console.log('event', event)
    const response = {
        statusCode: 200,
        body: event,
    };
    return response;
}
```

#### Testing In Lambda
If we test the function using the Lambda test we should see that it returns the values that have been passed via the test. 

<img src="https://i.imgur.com/1lMlksx.png" />

#### Testing In API Gateway

Let's test the **GET /projects/:id** route once again and see if it returns the value.

<img src="https://i.imgur.com/soLqTBA.png">

This time we see that it passes back an empty object.  That is because the we must configure the route to examine the incoming data and pass the path param value to the function. 




### Passing Path Params To Lambda

In order for the Lambda function to receive the value stored in the path param we need to configure the **Integration Request** to pass this value.  This flow is visible in the pic below where we can clearly see that the **Integration Request** passes data to **Lambda** and then **Lambda** passes it's response to **Integration Response**. 

<img src="https://i.imgur.com/P4CoI8q.png" >

The **Integration Request** can pass the path param value to the Lambda function using a **Mapping Template**.  

<!-- <img src="https://i.imgur.com/DXYIwVg.png"> -->

Open the **Integration Request** and in the **Mapping Templates** section let's do the following:

- Click the radio button: **When there are no templates defined**
- Click the **Add mapping template** and assign **application/json**
- Click the check mark to create the template

<img src="https://i.imgur.com/UponVtN.png" />

#### AWS Documentation

It's as this point we will need to edit the template and should take a look at the [AWS Documentation](https://docs.amazonaws.cn/en_us/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#input-variable-reference) regarding what this involves.  

We will look specifically at **input variables** we can see that the route retrieves the value of the path, query string or header using **$input.params(x)**.  


<img src="https://i.imgur.com/2RBQFCj.png">

In the template section let's add the following:

```js
{ "id": $input.params("id") }
```

**NOTE:** A mapping template is a script expressed in [Velocity Template Language (VTL)](https://docs.amazonaws.cn/en_us/apigateway/latest/developerguide/models-mappings.html).  We won't delve into this language any more than whats in the AWS documentation. 

<!-- ### Updating Lambda Function

Back in our Lambda function let's update it to access the values that are now being passed to it from the API Gateway via the **Integration Request**.  

As we can see the async function is configured to accept a single **event** argument so let's console.log the event and  return it in the response. 

```js
exports.handler = async (event) => {
    console.log('event', event)
    const response = {
        statusCode: 200,
        body: event,
    };
    return response;
}
```



In order for Lambda to console.log the **path param** value we will need the API Gateway to trigger the Lambda function as it will pass the path param value as the event.   -->

Before we do so let's take a moment to look at the **AWS CloudWatch** service to see how it creates logs fo each triggered event. 



<!-- <img src="https://i.imgur.com/hedrwrW.png" /> -->

### Testing Via API Gateway

Let's run another test via the API gateway and confirm that the id in the path params is being passed to the Lambda function. If the test is successful then we should see the results below:

<img src="https://i.imgur.com/lr2dTCg.png">

### AWS CloudWatch Logs

Many of the AWS services save their log information in a central service called **CloudWatch**.  We can access the logs for this specific Lambda function by clicking on the **Monitor** tab. 

<img src="https://i.imgur.com/78oMNUP.png">

Here we can see the log streams that have been captured by **CloudWatch**.

<img src="https://i.imgur.com/CjnUqRM.png">

If we click on the first link in the list it will take us to the most recent logs captured for this service.  Here we should see the previous events from testing Lambda. 

<img src="https://i.imgur.com/wtGD30c.png" />

The CloudWatch logs should now also contain the console log message for the event containing the id and value. 

<img src="https://i.imgur.com/f0hQpvo.png" /> 


## Exercise - Create Remaining Routes And Update The Lambda Functions - 15min

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No

#### API GATEWAY

- Add new **PUT** and **DELETE** methods to the **{id}** route.
- Create new **Mapping Templates** for each method
- Configure them to pass the **id** to the Lambda function

#### Lambda

- Configure each Lambda function to return the id value


#### Testing

- Test the routes using the **API Gateway**
- Test the routes using **Postman**


### Resources 

- [AWS Documentation](https://docs.amazonaws.cn/en_us/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html) 
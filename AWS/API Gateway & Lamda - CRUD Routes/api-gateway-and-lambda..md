Title: API Gateway and Lambda - Full CRUD<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# API Gateway and Lambda - Full CRUD

<!-- <img src="https://i.imgur.com/0pExHXm.png" width=200/> -->



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

Since the gateway we are building will be specific to projects we will make sure to follow the same **RESTful Routes to CRUD Mapping** schema we implemented in the previous unit.  

Although the route names are different, the routes themselves represent CRUD routes. 

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | No
GET     | /projects/:id      | Read a specific _project_ | projects-show | No
POST    | /projects          | Create a new _project_ | projects-create | Yes
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No
#### Seed Data

We will be using the following data set for testing our routes as well as populating our DynamoDB database.  

<details><summary>Project Data</summary>


```js
module.exports = [
    {
        "id": 1,
        "title": "Instagram Quotes",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1582134376/Screen_Shot_2020-01-30_at_8.57.12_AM_cnrvug.png",
        "description": "Add project description here..."
    },
    {
        "id": 2,
        "title": "Startup Matchmaker",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1533402294/startup-matchmaker.png",
        "description": "Add project description here..."
    },
    {
        "id": 3,
        "title": "CSS Grid Image Gallery",
        "image": "https://i.imgur.com/L9K6hli.png",
        "description": "Add project description here..."
    },
    {
        "id": 4,
        "title": "GA Press Release",
        "image": "https://i.imgur.com/V2BP6Nf.png",
        "description": "Add project description here..."
    },
    {
        "id": 5,
        "title": "Fashion Blog",
        "image": "https://i.imgur.com/orjmTFP.jpg",
        "description": "Add project description here..."
    },
    {
        "id": 6,
        "title": "FoodSense",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1565124419/food-sense-logo.png",
        "description": "Food Sense...love it..."
    },
    {
        "id": 7,
        "title": "StreetBall Mecca",
        "image": "https://res.cloudinary.com/jkeohan/image/upload/v1553206861/streetball-mecca.png",
        "description": "This project was built in D3 and recreates a tabelau dashboard"
    }
]
```
</details>

#### Projects GET Route

Open the **projects-get** route and click on **File > New File**.

<img src="https://i.imgur.com/pS2zaoi.png" />

Copy/paste the seed data into the file and then save the file as **projectData.js**



<img src="https://i.imgur.com/eguUiVT.png">

We should see the new file in the left pane. 

<img src="https://i.imgur.com/rr0pf6F.png" width=500>

#### Import And Return The Projects Array

As with all node projects the resource must be imported using the **require** keyword. Also replace any previous content that was assigned to **body** with the imported **projects** array. 

<img src="https://i.imgur.com/dbcOvGX.png" width=500>

Make sure to **Deploy** the new changes made to the Lambda function. 

### Testing The GET Route 

Let's test the route in AWS Gateway and confirm that it does return the data set. 

<img src="https://i.imgur.com/3pwTDgF.png" width=500>

<!-- #### Redeploy The API

Let's make sure to redeploy the API so that 

<img src="https://i.imgur.com/88xrRav.png"> -->

Also make sure that the route also returns data via Postman. 

<img src="https://i.imgur.com/kLqKSSm.png" width=500/>


### Exercise - Import Dataset For All Lambda Functions - 5min

- import the dataset into each of the remaining lambda functions

## Working With Route Params (Resources) 

Let's take a look at the routing table once again and our focus will be on the following routes, all of which make use of a **path params**.  This works in the same way as was configured in express.  

The path param in all of the routes is represented as **/:id**

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects/:id      | Read a specific _project_ | projects-show | No
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No

### Creating A Path Param 

Since the path param is part of a route we will need to create a new **resource**. So click on **Actions > Create Resource**.

<img src="https://i.imgur.com/SLbZETW.png" width=300/>

Defining the route as a param requires that the **Resource Path** be surrounded in curly braces. 

<img src="https://i.imgur.com/GmdxLhi.png" width=700/>

Once the route is created we should see the resources list updated to include the new route. 

<img src="https://i.imgur.com/QJWb96G.png" />

Now let's add a  **GET** method.

<img src="https://i.imgur.com/3vzsQQ6.png" />

Of course we need to test that the route works. The testing page now includes a reference to the path we just created.  Let's add some value and run the test to see what it returns. 

As we can see the test returns our original message which is expected as we hard coded the message in the body.  

<!-- <img src="https://i.imgur.com/lvQD1r9.png" /> -->

<img src="https://i.imgur.com/1a40WdD.png" />


### Passing Path Params To Lambda

In order for the Lambda function to receive the value stored in the path param we need to configure the **Integration Request** to pass this value.  This is done by creating new **Mapping Template** 

<!-- <img src="https://i.imgur.com/DXYIwVg.png"> -->

In **Mapping Templates** sections let's do the following:

- Click **When there are no templates defined**
- Click the **Add mapping template** and assign **application/json**

<img src="https://i.imgur.com/UponVtN.png" />

#### AWS Documentation

It's as this point we should take a look at the [AWS Documentation](https://docs.amazonaws.cn/en_us/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#input-variable-reference), specifically **input variables**.  Here we see that the route retrieves the value of the path using **$input.params(x)**.  

<img src="https://i.imgur.com/2RBQFCj.png">

Now in the template section let's add the following:

```js
{ "id": $input.params('id') }
```

### Updating Lambda Function

Back in our Lambda function let's update it to access the values that will be passed to it from the API Gateway via the **Integration Request**.  

As we can see the async function is configured to accept a single **event** argument so let's console.log the event and return it in the response. 

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

If we test the function using the lambda test we should see that it returns the values that have been assigned passed via the test. 

<img src="https://i.imgur.com/1lMlksx.png" />

### AWS CloudWatch Logs

Many of the AWS services also save their log information in a central service called **CloudWatch**.  We can access the logs for this specific Lambda function by clicking on the **Monitor** tab. 

<img src="https://i.imgur.com/78oMNUP.png">

Here we can see the log stream that have been captured by **CloudWatch**

<img src="https://i.imgur.com/CjnUqRM.png">

If we click on the first link in the list it will take us to the most recent logs captured for this service. 

<img src="https://i.imgur.com/wtGD30c.png" />


<!-- <img src="https://i.imgur.com/hedrwrW.png" /> -->

### Testing Via API Gateway

Let's run another test via the API gateway and confirm that it now returns the id passed via the path params. We should see the following:

<img src="https://i.imgur.com/lr2dTCg.png">

If we take a look at the Lambda logs we should now see an entry where the console log for the event contains the id and value. 

<img src="https://i.imgur.com/f0hQpvo.png" /> 


## Exercise - Create Remaining Routes And Assign A Lambda Functions - 10min

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects/:id      | Read a specific _project_ | projects-show | No
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No

#### API GATEWAY

- Add new **PUT** and **DELETE** methods to the API
- Configure them to pass the **id** to the Lamba function

#### Lambda
- Configure the Lambda function to return the value


#### Testing

- Test the remaining routes using **Postman**

<img src="" />


<img src="" />

<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />
<img src="" />


### Resources 

- [AWS Documentation](https://docs.amazonaws.cn/en_us/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html) 
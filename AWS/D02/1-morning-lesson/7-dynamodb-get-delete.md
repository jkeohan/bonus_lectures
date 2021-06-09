
Title: Intro To AWS Lambda<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

## Get All, Get One and Delete & Data From DynamoDB

<img src="https://i.imgur.com/cavueI1.png" /> 



This lecture will focus on working with DynamoDB and Lambda and will cover the following: 

- using the **DynamoDB SDK** within Lambda 
- getting all items from the DB
- getting a single item from the DB
- Delete a single item from the DB


## Accessing DynamoDB From Lambda

In order to access DynamoDB from a Lambda function we will need to make use of the [AWS SDK](https://aws.amazon.com/sdk-for-javascript/). Clicking on the link Here we can see that there is an option to use it in **Node** so let's click on that option. 


<img src="https://i.imgur.com/W2k5vY9.png" >

This takes us to the in **Getting Started** however because we will be working within Lambda we won't need to install any NPM packages as the SDK is already available in the Lambda environment. 


<!-- <img src="https://i.imgur.com/hjJqcuv.png"> -->

## DynamoDB Methods

Let's take a look at the documentation on how to work with DynamoDB via the JavaScript SDK by going to the [AWS Services SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html) page.  On the left pane we can see all the of the services available via the SDK.  Scroll down to find the DynamoDB service. 

There are currently **2 DynamoDB versions** to choose from and we will need to make reference the latest version once we setup DynamoDB in the Lambda function. 

<img src="https://i.imgur.com/tnShsuv.png">

#### RESTful Routes to CRUD Mapping

Let's revisit the **RESTful Routes** table. An additional column has been added to reflect the actual **DynamoDB methods** that we will use for each corresponding route. 

HTTP | Resource  | CRUD Operation | Lambda | DynamoDB | Has Data
-----------|------------------|------------------|:---:|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | scan| No
GET     | /projects/:id      | Read a specific _project_ | projects-show | getItem | No
POST    | /projects          | Create a new _project_ | projects-create | putItem | Yes
PUT     | /projects/:id      | Update specified _project_  | projects-update | updateItem | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | deleteItem | No

### Get All Projects 

Let's start with retrieving all the items currently in the table.   Since the **projects-get** Lambda function is will return all projects let's open that function. 

<img src="https://i.imgur.com/Z91ClQU.png">

#### AWS SDK

Before we can access any of the AWS services we must first import the **AWS SDK** into the Lambda function. 


```js
const AWS = require('aws-sdk');
```

The SDK provides access to all of the AWS services so we must instantiate a new instance of service we want to work with, in this case DynamoDB.  

Here we need to define the  **apiVersion** and **region** as DynamoDB is a Regional service and tables created in one region aren't visible in another region. 

```js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});
```

#### The Scan Method

According the **Routing Table** the method we will use to return all items is **scan**. 

HTTP | Resource  | CRUD Operation | Lambda | DynamoDB | Has Data
-----------|------------------|------------------|:---:|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | scan| No

If we do a quick search for **scan** in the [AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) we should see the following:

<img src="https://i.imgur.com/CVWnqlE.png">

We can see that the scan method takes in a **params** object and a **callback** function. 

Clicking on it should take us to the details section on how to use the method. There are quite a few additional key:values that can be used to filter the scan. 

The example provided scans the entire Music table, and then narrows the results to songs by the artist "No One You Know" and for each item, only the album title and song title are returned. 

<img src="https://i.imgur.com/WRRTWPW.png" width=500/>




#### Working With The Scan Method

Let's begin by creating a **params** object and add a single key of **TableName** and assign it the value of our table name. 

```js
const params = {
    TableName: 'projects'
}
```

Before we write our code based on the callback example they provided let's take a look at the official [AWS docs on using-async-await](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/using-async-await.html).

Let's give the **async/await** approach a try and of course add a console.log for good measure. 

```js
try {
    const data = await dynamodb.scan(params)
    console.log('data', data)
    
    response.body = data
    
} catch(err) {
    response.body = err
}
```

If we give this Lambda function a test run we should see the following error.  This is because nothing is being returned from the scan.

<img src="https://i.imgur.com/T2OHYxw.png">

But if we look at the **CloudWatch** logs we should also see that the **console.log** output is not there as well. 

<img src="https://i.imgur.com/U6SfnGd.png">

<!-- <img src="https://i.imgur.com/bQAe7vz.png"> -->

This is because the **dynamodb.scan()** method is running as promise but it's not being resolved.  In order to resolve the promise we must include **.promise()**. 
This solution was curtesy of [Stack Overflow](https://stackoverflow.com/questions/55993448/async-await-is-not-working-javascript-dynamodb)

```js
try {
    const data = await dynamodb.scan(params).promise()
    console.log('data', data)
    
    response.body = data
    
} catch(err) {
    response.body = err
}
```

**NOTE:** The JavaScript SDK version we are using is [V2](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-async-await.html) however AWS has released [V3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/using-async-await.html). 



#### Assigning Lambda Permissions To DynamoDB

Deploy the changes and run the test again.  It should fail once again but with an **AccessDeniedException** error.  

<img src="https://i.imgur.com/J7Xsynz.png">

This is because our Lambda function doesn't have permissions to read data from DynamoDB.  



Adding permissions to our Lambda function requires that we do so using **IAM**.  Let's open the service and choose roles and then search for all roles that contain **project** in their name.  

We should see a role for each of the Lambda functions we have created thus far. 

<img src="https://i.imgur.com/8JbXmeD.png">

Clicking on the **projects-get-role** will take us to it's configuration page.  Click on **Attach policies** button. 

<img src="https://i.imgur.com/3u3qvnO.png">


Here we will search for **dynamo** and we should see the following policies. 

<img src="https://i.imgur.com/tQDBoyH.png">

Since the lambda function will only need **Read** access let's check off **AmazonDynamoDBReadOnlyAccess** and click **Attach Policy**.

We should now see that the Lambda role has the newly assigned permission.

<img src="https://i.imgur.com/NmTVCZT.png">

Let's run the Lambda function one more time to confirm that it now able to retrieve the data. 

<img src="https://i.imgur.com/DRtoZ2D.png">

#### Formatting The Data

We can see that **data** returned via the callback is an object and that it has a key of **Items** that is assigned an array containing all of our projects.  

Let's console.log the firsts item in the array and see what it contains. 

```js
console.log('success - data', data.Items[0])
```

We should see the following.  This is the same format we saw earlier after creating the item and choosing to see it in JSON format. 

<img src="https://i.imgur.com/v0k3FbV.png">

So now we understand how the data is structured we can format it in a way that is a bit more intuitive and how our front end dev team expects to receive it.  

```js
const items = data.Items.map( (data,index) => {
    return {
        projectId: data.ProjectId.S,
        title: data.Title.S,
        image: data.Image.S,
        description: data.Description.S
    }
})
```

Let's also assign the **items** array to the **response.body**

```js
const items = data.Items.map( (data,index) => {
    //...more code
})
response.body = items
```

If we run one final Lambda test we should see the following:

<img src="https://i.imgur.com/0ZHAhSM.png">

### Projects-Get Lambda Solution 

<details><summary>Here is the final codebase for the lambda function.</summary>


```js
const projects = require('projectData')
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});


exports.handler = async (event) => {
    
    const response = {
        statusCode: 200,
    };
    
    const params = {
        "TableName": "projects"
    }
    
    try {
        const data = await dynamodb.scan(params).promise()
    
        const items = data.Items.map( (data,index) => {
            return {
                projectId: data.ProjectId.S,
                title: data.Title.S,
                image: data.Image.S,
                description: data.Description.S
             }
    
        })
        
        response.body = items
        
    } catch(err) {
        response.body = err
    }
    
     return response 
};

```

</details>

<!-- ```js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});


exports.handler = async (event) => {
    
    const response = {
        statusCode: 200,
    };
    
    const params = {
        "TableName": "projects"
    }
    
    await dynamodb.scan(params, function(err, data) {
            if(err){
                console.log('failure - err', err)
            } else {
                console.log('success - data', data.Items)
                const items = data.Items.map( (data,index) => {
                    return {
                        projectId: data.ProjectId.S,
                        title: data.Title.S,
                        image: data.Image.S,
                        description: data.Description.S
                    }
                })
                response.body = items
            }
        }).promise()
        
     return response 
};
``` -->

### Get A Single Project 

Open up our **projects-show** Lambda function and add the following to it so that we can work with the AWS SDK. 

```js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});
```

Just as before we will need to pass in a **params** object and will include an additional **Key** parameter that will reference the column name.  It is also assigned a value as an object. 

```js
const params = {
    Key: {"ProjectId": { S: event.id } },
    TableName: 'projects'
    }
```  

According to the routing table we can see that the DynamoDB method to use to return a single item is **getItem**

HTTP Method | URI (endpoint)  | CRUD Operation | Controller Action | DynamoDB | Has Data
-----------|------------------|------------------|:---:|:---:|:---:
GET     | /projects/:id      | Read a specific _project_ | projects-show | getItem | No


#### Formatting The Data

Let's setup DynamoDB to do the following:

- retrieve a single item
- format the data in a way the front end expects 
- return that item in the body 

**Examine Returned Results**

Let's first console.log the results returned the single item. 

```js
    const params = {
        Key: {"ProjectId": { S: event.id } },
        TableName: 'projects'
     }
     
    try {
        const data = await dynamodb.getItem(params).promise()
        console.log('data', data)
    
    } catch(err) {
    response.body = err
    }

return response;
```

#### Update Initial Lambda Test 

In order to pass in the **project_id** value we will need to click on the **Test** tab and update the Lambda test as follows:

<img src="https://i.imgur.com/JVgXXLy.png">

#### Assigning Lambda Permissions To DynamoDB

If we test this we should receive the same error message as before being that this Lambda role hasn't been assigned the **AmazonDynamoDBReadOnlyAccess** policy. 

<img src="https://i.imgur.com/XxamPe4.png">

Based on how we previously assigned the role take a moment to do so now. 

- Open **IAM** and click on **Roles**
- Search for **project-show** role and click on it
- Click **Attach policy** and attach the **AmazonDynamoDBReadOnlyAccess** policy
- Run another test to confirm it works

If we run the test now that permissions have been assigned we should see the item returned how the data is structured

<img src="https://i.imgur.com/XzvSlhB.png">


As we can see the data returned is an object with a key of **Item** which contains all the properties of our item. 

Now that we know the structure of the data we can format it to meet the expectations of the front end. 

```js
try {
    const data = await dynamodb.getItem(params).promise()
    console.log('data', data)
    const item =  {
        projectId: data.Item.ProjectId.S,
        title: data.Item.Title.S,
        image: data.Item.Image.S,
        description: data.Item.Description.S
    }
    response.body = item
} catch(err) {
    response.body = err
}

return response;
```



### Testing Via API Gateway and Postman

Let's take a moment to test both the **/projects** and **/projects/:id** routes via:

- The API Gateway
- Postman

### Projects-Show Lambda Solution 

<details><summary>Here is the final codebase for the lambda function.</summary>

```js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    console.log('event', event)
    const response = {
        statusCode: 200,
    };
    
    const params = {
        Key: {"ProjectId": { S: event.id } },
        TableName: 'projects'
     }
     
    try {
        const data = await dynamodb.getItem(params).promise()
        console.log('data', data)
         const item =  {
            projectId: data.Item.ProjectId.S,
            title: data.Item.Title.S,
            image: data.Item.Image.S,
            description: data.Item.Description.S
         }
       response.body = item
    } catch(err) {
       response.body = err
    }

    return response;
}
```

</details>

### Exercise - Delete A Single Project - 20min

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No

1. Take a moment to review the routing table and confirm the name of the Lambda function to edit
2. Review the [AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) and find the method used to delete a single item from the DynamoDB database. (hint: deleteItem )
3. Update the Lambda function to include all the code needed to delete an item
4. Create a Lambda test to verify this works
4. It should fail as the Lambda role doesn't have permissions to delete
4. Assign the  **AmazonDynamoDBFullAccess** security policy to the lambda role
5. Test the route this using **API Gateway** route
6. Test the route using Postman

<details><summary>Solution Code</summary>

```js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-west-1', apiVersion: '2012-08-10'});


exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: event
    };
    
    const params = { 
        TableName: 'projects',
        Key: { "ProjectId": {S: event.id} }
    }
    
    try {
        await dynamodb.deleteItem(params).promise()
        response.body = "item deleted"
    }catch(err){
        response.body = err
    }
    return response;
};
```

<img src="https://i.imgur.com/GaEt7K7.png">

</details>


  ### Resources

  - [DynamoDB Services Page](https://aws.amazon.com/dynamodb/)
  - [What is DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
  - [DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)
  - [DynamoDB On Demand Pricing](https://aws.amazon.com/blogs/aws/amazon-dynamodb-on-demand-no-capacity-planning-and-pay-per-request-pricing/)
  - [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
  - [Async/Await Lambda](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/using-async-await.html)

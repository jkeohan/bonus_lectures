
### Seed Data


#### The batchWriteItem Method

According the **Routing Table** the method we will use to return all items is **scan**. 

HTTP | Resource  | CRUD Operation | Lambda | DynamoDB | Has Data
-----------|------------------|------------------|:---:|:---:|:---:
GET     | /projects/seed   | Seed _project_ data| projects-seed | batchWriteItem | No

If we do a quick search for **batchWriteItem** in the [AWS Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html) we should see the following:

**ADD IMAGE HERE**
<img src="">


### Lambda projects-seed 

Open up our **projects-seed** Lambda function and add the following to it so that we can work with the AWS SDK. 

```js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});
```

Next let's create a new file called **seedData.js** paste the following seed data: 

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

Now import the data into the lambda function

```js
const projects = require('projectData')
```

Let's loop over the array and create the items as DynamoDB expects to receive them. 

```js
// format the projects data to be created
let seedData = projects.map( project => {
    return {
        PutRequest: {
            Item: {
                "ProjectId": { S: `project_${Math.random()}` },
                "Title": { S: project.title }, 
                "Image": { S: project.image }, 
                "Description": { S: project.description }
            }
        }
    }
})
```

Let's create the params object and create the items

```js
// params includes the project data
let params = { 
    RequestItems: { "projects": seedData }
};

// create the items in bulk using .batchWriteItems()
try{
    await dynamodb.batchWriteItem(params).promise()
} catch(err) {
    console.log('err', err)
}
```

We can verify the items have been created either via DynamoDB, the GET route or we have the option to run a **scan** and return them via the **projects-seed** function. 

Let's first test using:

- GET Route
- Postman



<details><summary>Solution Code</summary>

```js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-1', apiVersion: '2012-08-10'});
const projects = require('projectData')

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    };
    
    // format the projects data to be created
    let seedData = projects.map( project => {
        return {
            PutRequest: {
                Item: {
                   "ProjectId": { S: `project_${Math.random()}` },
                    "Title": { S: project.title }, 
                    "Image": { S: project.image }, 
                    "Description": { S: project.description }
                }
            }
        }
    })
    
    // params includes the project data
    let params = { 
        RequestItems: { "projects": seedData }
    };
    // create the items in bulk using .batchWriteItems()
    try{
      await dynamodb.batchWriteItem(params).promise()
    } catch(err) {
      console.log('err', err)
    }
    // retrieve all the created items usin .scan()
    try {
      const data = await dynamodb.scan({"TableName": "projects"}).promise()  
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
 
    return response;
};
```

</details>
Title: API Gateway Data Models - Full CRUD<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---



# API Gateway Data Models For Post & Put Routes

If we examine the routing table we can see that both the **POST** and **PUT** routes accept data.  This makes sense as  **POST** is used to create new items and **PUT** to updated an existing item. 


HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | No
GET     | /projects/:id      | Read a specific _project_ | projects-show | No
POST    | /projects          | Create a new _project_ | projects-create | Yes
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No


### POST Route

Let's start with the **POST** route.  We will take the following approach to set this up: 

- configure the **projects-create** Lambda function to return the data it receives
- update the API Gateway to perform some form of validation
- configure the route to transform the data before passing it to the Lambda

### Lambda projects-create Function 

Open the **projects-create** Lambda function and let's make one edit to the incoming data to give it a **project_id** so that it's unique in the database. 

<img src="https://i.imgur.com/a1nFvDq.png">

#### Test Via Lambda

Let's perform a test against **projects-create** using the below JSON.  If no Lambda test has been configured than let's take a moment to create one called **newItem** and configure it to use the JSON.

```json
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here..."
}
```

Copy/Paste the above JSON to the body of the test. 

<img src="https://i.imgur.com/fSKRCfH.png">

Run the test and successful we should see the following response. We can confirm this by examining the **projectId** which should have a random number appended to **project_**. 

<img src="https://i.imgur.com/bSub8Yk.png">


#### Test Via API Gateway

Once we have confirmed Lambda is working as expected let's now test the **Post** route in API Gateway.  Simply copy/paste the above JSON into the **Request Body** of the test. 

<img src="https://i.imgur.com/W56zvXh.png">

Click on the **test** button and if this successful we should see the item returned with another random projectId. 

<img src="https://i.imgur.com/bSub8Yk.png">

### Adding Validation

Although this works the current configuration offers no way of validating the data received. So if the data sent is missing a **key:value** or includes a **new key:value** that we don't expect, Lambda will create the item regardless. 

Lets test this out in the API Gateway using JSON snippets.  

**Missing A Key**

```js
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png"
}
```

**New Key Introduced**

```js
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here...",
  "status": "active"
}
```



Although we could add some form of validation to the Lambda function this would require Lambda to do more than it needs to do.  We also must keep in mind the cost of executing a Lambda function, including time and RAM. 

Anything we can offload from the Lambda to another service would help reduce those costs.  Feel free to play with the [Lambda Simulation](https://console.aws.amazon.com/lambda/home?region=us-east-1#/begin) again to see how the costs can add up. 


### Standardize Data Using Models
It just so happens that this type of validation can be done in the API Gateway using **Model** and applying them in **Mapping Templates**.

**Model** are used to define a standardize schema that represents the data.  This include key names, value data types and which keys are required.  Once the Model has been created it is then applied via a **Mapping Template** 

 Let's create a new **Model** by clicking on **Model** from the left navigation and then **Create**. 

<img src="https://i.imgur.com/Zuh0bJI.png" width=300>

Since this model will be used to define incoming project data let's name the model **Project** and give it a **Content type** of **application/json**. 

<img src="https://i.imgur.com/TwZCupt.png" width=600>


Below is the format we will use to define the **Model**.  One thing to make note of here is that we have included a **required** key that denotes the keys required for the data to be validated before being passed to the Lambda function. 

It uses the [JSON Schema](https://json-schema.org/draft-04/json-schema-core.html#json-reference) structure.  Below is the schema we will uss for the project data which requires all the keys be present in the object in order to meet the requirements of this model. 


<img src="https://i.imgur.com/FBSmjFq.png">

No need to write all this out just copy/paste the code snippet below. 

<details><summary>Model Code Snippet</summary>

```js
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Project",
  "type": "object",
  "properties": {
    "title": {"type": "string"},
    "image": {"type": "string"},
    "description": {"type": "string"}
  },
  "required": ["title", "image", "description"]
}
```


</details>

### Apply Model Via Method Request

We will apply this Model to the **Method Request** associated with the **POST** route.  Here we will add the **Model** by clicking on **Add Model** and chose **Project** from the drown down. 

<img src="https://i.imgur.com/K8l61hL.png">

<!-- <img src="https://i.imgur.com/Dr9U6W8.png"> -->

Since this route will receive data via the body we also need to set the **Request Validator** to **Validate body** and click the **check mark** to accept this choice. 

<img src="https://i.imgur.com/7CbXZsq.png">


<!-- <img src="https://i.imgur.com/4yCDlfJ.png"> -->

#### Testing The Model

Let's run another test via the API Gateway and confirm that the model does indeed validate those keys are present. 

```json
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here..."
}
```

Try removing a key and let's see the validation in action.

```json
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
}
```

As we can see the validation works as the API Gateway responds with the following:

<img src="https://i.imgur.com/SS0qitV.png">

#### Model Limitation

Although the Model provides some degree of validation it does have the limitation of not being able to enforce additional keys that were not expected. 

Let's confirm this by sending JSON that includes a new key.

```json
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here...",
  "hackerAttempt": "going to hack your system"
}
```

We should see the entire JSON returned including the additional **hackerAttempt** key. 

<img src="https://i.imgur.com/RRsx8Yh.png" >


### Apply A Mapping Template

In order for the API to ignore additional keys we can apply this same model as a **Mapping Template** in the **Integration Request**.  

Creating the template is done exactly as it was done for path params. 

<img src="https://i.imgur.com/OnklVrh.png">

<!-- Since we already create a Model we can choose that option here as well. 

<img src="https://i.imgur.com/cYg1iSc.png" > -->

<!-- ```js
{
    "title": $input.json('$.title')
    "image": $input.json('$.image')
    "description": $input.json('$.description')
}
``` -->



Since we've already created a Model for this type of incoming data we can just choose the **Project** Model from the drop down. 

<img src="https://i.imgur.com/lUq4XJX.png">

#### AWS Documentation

As we can see it's added some code which we will need to edit.  The one portion of thee code that we are now most interested in is:

```js
$input.path('$')
```

This is very similar to what we used for capturing the path params:

```js
$input.params("id") 
```

If we take a look at the [AWS Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html) we will see they are both included in the same section on **$input variables**.  

<img src='https://i.imgur.com/vBweOMf.png'>

The description states that it is used to access and manipulate elements of the payload.

<img src="https://i.imgur.com/7SktWxE.png">

It also appears that the **#set** method is defining some sort of global variable called **$inputRoot**.  All we need to do now is replace the default placeholder values of **"foo"** with the keys stored in the JSON. 

<!-- <img src="https://i.imgur.com/PkCh8jE.png"> -->

```json
#set($inputRoot = $input.path('$'))
{
  "title" : "$inputRoot.title",
  "image" : "$inputRoot.image",
  "description" : "$inputRoot.description"
}
```

**NOTE:** A mapping template is a script expressed in [Velocity Template Language (VTL)](https://docs.amazonaws.cn/en_us/apigateway/latest/developerguide/models-mappings.html).  We won't delve into this language any more than whats in the AWS documentation. 

### Validating The Model and Integration Request 

Test the **POST** route via the API Gateway for each of the below JSON objects. 

**All Keys**
```json
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here..."
}
```
**Missing Key**
```json
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
}
```

You should see the follow message in Postman with **400 Bad Request** status code. 


<img src="https://i.imgur.com/DJ1V74y.png">


**Unexpected New Key**
```json
{
  "title": "New Project",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here...",
  "hackerAttempt": "going to hack your system"
}
```

## Exercise - Testing Via Postman - 5min

- Deploy the API to the **dev** stage leaving an appropriate deployment message
- Run the same tests via Postman


## Exercise - Add Validation To The PUT Route - 15min

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes

#### API GATEWAY

- Assign the existing **Project** model to the **PUT** route
- Update the existing **Mapping Template** in the PUT **Integration Request** to include the model

**HINT:** you may need to add quotes around $input.params()

```js
 "id": "$input.params('id')"
``` 

#### Lambda
- Configure the Lambda function to update and return the new element 


#### Testing

- Test using **API Gateway**
- Test using using **Postman**


Title: API Gateway and Lambda - Full CRUD<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# API Gateway Data Models For Post & Put Routes

Let's configure the **projects-create** Lambda function to accept data it receives for a new project. 

<img src="https://i.imgur.com/F1ZXEZR.png">

```json
{
    "title": "Instagram Quotes",
    "image": "https://res.cloudinary.com/jkeohan/image/upload/v1582134376/Screen_Shot_2020-01-30_at_8.57.12_AM_cnrvug.png",
    "description": "Add project description here..."
}
```

If we open the **Post** method in API Gateway we can add a new project, as JSON, in the **Request Body**.

<img src="https://i.imgur.com/GQdQtdR.png">

If this successful we should see all items returned with the very newest entry first in the array. 

<img src="https://i.imgur.com/MCGO2wV.png">

### Adding Validation

Although this works with very little configuration it offers no way of validating the data being sent. 

So if the data sent is missing a key:value or includes a new key:value that we don't expect, Lambda will add it to the array regardless. 

Lets test this out using the following JSON and confirm this is the case. 

**Missing A Key**

```js
{
  "title": "CSS Grid Image Gallery",
  "image": "https://i.imgur.com/L9K6hli.png",
}
```

**New Key Introduced**

```js
{
  "title": "CSS Grid Image Gallery",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here...",
  "status": "active"
}
```



Although we could add some form of validation to the Lambda this would require require the Lambda function to do more than it needs to as this type of validation should happen in the API Gateway


### Standardize Data Using Models and Body Mapping Templates

**Model** are used to provide a standardize data structure that will then be applied via a **Body Mapping** template.   

Let's create a new **Model**. 

<img src="https://i.imgur.com/Zuh0bJI.png" width=300>

Since this model will be used for project data let's name the model **Project** and give it a Content type of **application/json**. 

<img src="https://i.imgur.com/TwZCupt.png" width=600>


Here is the format we will use for the **Model**.  One thing to make note of here is that we have included a **required** key that denotes which keys are required in order to be pass this test and be passed onto the Lambda function. 


<img src="https://i.imgur.com/FBSmjFq.png">

<details><summary>code snippet</summary>

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

Open the **Method Request** associated with the **POST** route.  Here we will add the **Model** by clicking on **Add Model** and choosing **Project** from the drown down. 

<img src="https://i.imgur.com/K8l61hL.png">

<!-- <img src="https://i.imgur.com/Dr9U6W8.png"> -->

We also need to set the **Request Validator** to **Validate body** and click the **check mark**. 

<img src="https://i.imgur.com/7CbXZsq.png">


<!-- <img src="https://i.imgur.com/4yCDlfJ.png"> -->

Although there is some degree of validation using the model there is the limitation of it not being able to enforce new keys from being introduced. 


### Apply A Body Mapping Template

In order for the API to ignore additional keys we can apply this same model as a **Body Mapping Template** in the **Integration Request**.  Creating the template is done exactly as it was done for path params. 

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



Since we've already created a Model for this type of incoming data we can just choose that from the drop down. 

<img src="https://i.imgur.com/lUq4XJX.png">

The only thing we need to do is replace the default placeholder values of **"foo"** with the following:

<!-- <img src="https://i.imgur.com/PkCh8jE.png"> -->

```json
#set($inputRoot = $input.path('$'))
{
  "title" : "$inputRoot.title",
  "image" : "$inputRoot.image",
  "description" : "$inputRoot.description"
}
```

### Validating The Model and Integration Request 

Test the POST route using the following:

- API Gateway
- Postman


## Exercise - Add Validation To The PUT Route - 10min

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes

#### API GATEWAY

- Assign the existing **Project** model to the **PUT** route
- Add a **Body Mapping** template to the **Integration Request**

#### Lambda
- Configure the Lambda function to update and return the new element. 


#### Testing

- Test using **API Gateway**
- Test using using **Postman**

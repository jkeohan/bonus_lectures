
POST route to accept and respond

<img src="https://i.imgur.com/F1ZXEZR.png">

```json
{
    "title": "Instagram Quotes",
    "image": "https://res.cloudinary.com/jkeohan/image/upload/v1582134376/Screen_Shot_2020-01-30_at_8.57.12_AM_cnrvug.png",
    "description": "Add project description here..."
}
```

<img src="https://i.imgur.com/GQdQtdR.png">

<img src="https://i.imgur.com/MCGO2wV.png">

There is no validation at this point so if we remove a key:value or add a new key:value then the Lambda function will add the new element to the array. 

Test the following JSON objects and confirm this is the case. 

```js
{
  "title": "CSS Grid Image Gallery",
  "image": "https://i.imgur.com/L9K6hli.png",
  "description": "Add project description here...",
  "status": "active"
}
```

```js
{
  "title": "CSS Grid Image Gallery",
  "image": "https://i.imgur.com/L9K6hli.png",
}
```

### Extract Data With Body Mapping Template

<img src="https://i.imgur.com/Zuh0bJI.png">

<img src="https://i.imgur.com/TwZCupt.png">


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

<img src="https://i.imgur.com/FBSmjFq.png">

<img src="https://i.imgur.com/Dr9U6W8.png">

<img src="https://i.imgur.com/7CbXZsq.png">

<img src="https://i.imgur.com/4yCDlfJ.png">

Although there is some degree of validation against the model any new keys being introduced fall outside the scope of this type of validation. 

In order for the API to ignore additional keys we can apply this same model as a **Body Mapping Template** in the **Integration Request**. 

<img src="https://i.imgur.com/OnklVrh.png">

We could map the json properties manually if we wanted to as in the following:

<img src="https://i.imgur.com/cYg1iSc.png" >

<!-- ```js
{
    "title": $input.json('$.title')
    "image": $input.json('$.image')
    "description": $input.json('$.description')
}
``` -->



This however since we've already created a Model for this type of incoming data we can just choose that from the drop down. 

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


## Exercise - Add Validation To The PUT Route - 10min

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes

#### API GATEWAY

- Assign the existing **Project** model to the PUT route
- Add additional validation to the **Integration Request**

#### Lambda
- Configure the Lambda function to return the id value


#### Testing

- Test the remaining routes using the **API Gateway**
- Test the remaining routes using **Postman**

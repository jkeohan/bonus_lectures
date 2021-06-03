Title: AWS-React-Deployment<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---



# AWS API Gateway 

<!-- <img src="https://i.imgur.com/0pExHXm.png" width=200/> -->

<img src="https://i.imgur.com/ywVhNKz.png">



This lecture is focused on introducing the AWS API Gateway service and will be covering the following topics:

- creating API resources (aka routes)
- adding HTTP methods to a resource
- Work through the Request/Response cycle
- Testing the API

## Prerequisites

- An AWS (Amazon Web Services) account

If you do not have an account, open AWS and click Create a Free Account. Amazon provides a free tier for twelve months,with some limitations,  after you sign-up for an AWS account.

## Intro To The AWS Global Network 

AWS has become the premier cloud service provider and provides companies with a global infrastructure and pay as you go service model helping companies to lower their TCO. 

Their infrastructure currently contains 24 geographic Regions around the world with a total of 77 Availability Zones. They have also announced plans for 6 more AWS Regions in Australia, India, Indonesia, Japan, Spain, and Switzerland which will includes 18 Availability Zones.  


<img src="https://i.imgur.com/ZVH2bAl.jpg" width=800>

**Regions** are used to aggregate and/or segment many of the services, as well as provide a level of redundancy using one or more Availability Zones.  Their network also has **Point Of Presence** locations that increase the availability of services and reduces latency by geographically placing those locations in closer proximity to the end users.  

Let's take a closer look at the **N.Virginia Region**. 

<img src="https://i.imgur.com/xZkVBM5.png" width=800>


<br>


### AWS Services

AWS offers in the range of 175 products and services. We can browse those services via the **Products** tab on [https://aws.amazon.com/](https://aws.amazon.com/).

### Free Tier

AWS offers **12 months** of free tier support for many of their product and services.   It's important to mention that you will be charged accordingly once the 12 months expires OR if you exceed the limits of the tier of support provided by the service. 

So before we begin lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) of services and then search for **api gateway**.

<img src="https://i.imgur.com/Gplt0Ma.png"/>

### API Gateway

The API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain and secure APIs.  It allows them to create standalone **RESTful APIs** that can integrate with other AWS services, such as Lambda, in order to provide a full backed infrastructure. 

<img src="https://i.imgur.com/ziCSBw7.png" />

<!-- Routes, which AWS refers to as **resources**, can accept data either using **path params (/:id)** or **query strings (?id=1)**.   -->

### Getting Started

Lets get started with the **API Gateway** by clicking the **Get started with Amazon API Gateway** button.

<img src="https://i.imgur.com/ZEPfxAC.png">
<br>

#### API Options


API Gateway extends it's versatility by providing the following 4 options to create and API:


<img src="https://i.imgur.com/Lu2tDpW.png" >

#### Creating A REST API

We will focus on creating a **REST API** which refers to a collection of resources(routes) and methods that can be invoked through **URL endpoints** and **HTTP methods**. 

Let's create our first **REST API** by clicking on the **Build** button. 

<img src="https://i.imgur.com/vj9nTHx.png" />

On the next configuration page we will choose **REST** as the **protocol** and **New API** from the list of options provided.

<img src="https://i.imgur.com/lkCRCgW.png"/>


We need to give it an **API name** and **Description** but will leave the **Endpoint Type** as **Regional**.  

The API we will be building will allow us to get,create,update and delete info about the projects in our portfolio so let's give it an appropriate name and description. 

Then click **Create API**. 

<img src="https://i.imgur.com/8mpqxbF.png"/>

### Creating Resources (aka Routes)

This will take us to the main API dashboard and highlights the default **Resource** for our newly created API denoted by a single forward slash **/**.  

AWS refers to the **routes** as **resources**, which makes sense as they are meant to provide some type of resource requested by the user.  

<img src="https://i.imgur.com/omo32kJ.png" width=600>

#### RESTful Routes to CRUD Mapping

The API we are building will be used to Create/Read/Update/Delete (CRUD) portfolio projects.  That being the use case we will use **/projects** as the resource name and we will make sure to follow the standard **RESTful Routes** schema we implemented in the previous unit.  

We will update it slightly to reflect the AWS services replacing **Controllers** with **Lambda**.

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | No
GET     | /projects/:id      | Read a specific _project_ | projects-show | No
POST    | /projects          | Create a new _project_ | projects-create | Yes
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No

Based on the above RESTful routing table let's create our first **resource** which will be **/projects**.  

In order to do that click on the **Action** dropdown and choose **Create Resource**.

<img src="https://i.imgur.com/L08bRYl.png">

Here we will choose **projects** as both the name and path.  Once complete click on **Create Resource** button to create the resource.

<img src="https://i.imgur.com/33snxEy.png" />

Once the resource is created we are now presented with the resource and a message stating that **No methods defined for the resource** so we need to do that next.  

<!-- <img src="https://i.imgur.com/B196Eqk.png" > -->

<img src="https://i.imgur.com/QaCVlEC.png">

### Adding HTTP Methods

As we can see from the routing table the **/projects** route we will be associated with the **GET** method so let's add that method to this route. 

HTTP  | URI  | CRUD Operation | Controller | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | No

We add the HTTP method by clicking on the **Actions** dropdown and choosing **Create Method**.  

This presents a dropdown list of methods to choose from, of which we will choose **GET** and then click on the **checkmark** to assign the method. 

<img src="https://i.imgur.com/NshdtNF.png"/>

Now there are several options for us to choose from and, although we will be configuring Lambda for all of the RESTFul routes, we will choose **Mock** for now.  

Mock is only being used temporarily to setup the resource and doesn't provide any real functionality for the API. 

<img src="https://i.imgur.com/HLYiy4S.png" >

Once the method is in place we will be presented with the following screen.  This follows the **request/response** cycle that you have already worked with in the previous unit. 

<img src="https://i.imgur.com/ZPVnYNy.png" >

AWS divides an API's **Request/Response** into subsets of **Method** and **Integration**. 

As this is a **Mock** endpoint we will see that the **Integration Request** ends at the **Mock Endpoint**.  The Mock endpoint is unable to pass data from **Integration Requests** to **Integration Response** and they both act independently in this configuration. 

Once **Mock** is replaced with a **Lambda** function we will be able to pass data from the **Request** to the **Lambda** function which will then pass data to the **Response**. 

#### Testing The API

Before we proceed to make our API public we should first give it a test run by clicking on the **Test** button. 

<!-- In order to respond to an API request using our **Mock** setup we will need to configure the **Integration Response**.  

Clicking on **Integration Response**  will provide the following configuration options. 
<img src="https://i.imgur.com/7uOkZGF.png" width=700/>

 Continue to expand **Mapping Templates** and then click on **application/json**. 

 <img src="https://i.imgur.com/N0vrMRU.png" width=700/>

This will open a side panel where we can send our mock response as JSON. 

<img src="https://i.imgur.com/tdS7XYm.png" width=700/>

Here we will add the following JSON and click on **Save**

<img src="https://i.imgur.com/oepgmax.png" width=700/> -->

<!-- <img src="https://i.imgur.com/Vz4575X.png" > -->

We are presented with some test configuration options, some of which you might be familiar with such as **Path**, **Query Strings** and **Request Body**.  We will leverage some of these testing options later but for now click on the blue **Test** button. 

<img src="https://i.imgur.com/Rv4PAN6.png" >

As mentioned before there really isn't much we can do with the Mock endpoint and testing it at this point should return **no data**.  It does however provide us enough to walk through some of the additional requirements for the API, such as deployment. 

### Deploying The API

If we want the API to be available outside the AWS environment then it needs to be deployed.  We can do that by clicking on the **Actions** button and selecting **Deploy API**.  

<img src="https://i.imgur.com/qSMpOBI.png" />

Here we will need to add a new **Deployment Stage**.  Stages are used to segment versions of our API such as **production**, **development** or **testing**.  You can think of these as **git branches**.  

In our case we will opt to create a development stage and choose the name of **dev** and then click **Deploy**.

<img src="https://i.imgur.com/gr67gTk.png">

This now takes us to our **Stages** and we should see the following:

<img src="https://i.imgur.com/Rzcn3C5.png" >

Let's take a look at the **Deployment History** tab and we should see info about this deployment. This is similar to **git commit** messages. 

<img src="https://i.imgur.com/PxNVg3Y.png" >

#### Testing The API

Located at the very top is the url to the dev version of our API.  If we **copy/paste** that into Chrome we should receive the following:

<img src="https://i.imgur.com/jAKC7Sr.png" >

Thats because there is no route configured for **/dev**. Let's append **/projects** to the url.  The error message will be gone and we should now see nothing as the route isn't configured to send any data. 

<img src="https://i.imgur.com/FLiLLsq.png" >

We can confirm that the request did go through by checking our the **Network** tab in **DevTools**.  Here we should see that we received a status code of **200**. 

<img src="https://i.imgur.com/9K6E498.png">

### Testing The API Using Postman

Open **Postman** and create a new **Collection** for our **Projects** routes.  Here we will once again test the **GET** route and save it to our new collection. 

<img src="https://i.imgur.com/NvuQsAP.png">

## Exercise - Configure a POST Route - 15min


Let's revisit the **RESTful Routes** table and focus on just the **POST** route. 

HTTP Method | URI (endpoint)  | CRUD Operation | Controller Action | Has Data
-----------|------------------|------------------|:---:|:---:
POST    | /projects          | Create a new _project_ | projects-create | Yes

Perform the following:

- Add a new **POST** method to the the **/projects** route. 
- Set it up as a **Mock Endpoint**
- Run a test to confirm that it responds locally
- Deploy the API once and leave a good deployment message 
- Test the route in Postman and confirm that you receive a status code 200 


#### References

- [AWS Global Infrastructure](https://jayendrapatil.com/aws-regions-availability-zones-and-edge-locations/)
- [Free Tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc)
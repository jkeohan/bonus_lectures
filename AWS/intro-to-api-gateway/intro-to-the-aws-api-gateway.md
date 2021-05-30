Title: AWS-React-Deployment<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---



# AWS API Gateway 

<img src="https://i.imgur.com/0pExHXm.png" width=200/>



This is a mini lecture focused on deploying an API using AWS API Gateway service. 

 We will be covering the following topics:

- creating API paths (aka resources)
- adding HTTP Methods to a resource
- Work through the Request/Response cycle
- Working with url params and query string
- Testing the API

## Prerequisites

- An AWS (Amazon Web Services) account

If you do not have an account, open AWS and click Create a Free Account. Amazon provides a free tier for twelve months,with some limitations,  after you sign-up for an AWS account.

## Intro To The AWS Global Network 

AWS has become the premier cloud service provider and provides companies with a global infrastructure and pay as you go service model helping companies to lower their TCO. 

Their infrastructure currently contains 24 geographic Regions around the world with a total of 77 Availability Zones. They have also announced plans for 6 more AWS Regions in Australia, India, Indonesia, Japan, Spain, and Switzerland which will includes 18 Availability Zones.  


<img src="https://i.imgur.com/ZVH2bAl.jpg" width=600>

Let's take a closer look at a region.

<img src="https://i.imgur.com/xZkVBM5.png" width=600>


<br>


### AWS Services

Along with their global infrastructure AWS offers in the range of 175 products and services. We can browse those services via the Products tab on [https://aws.amazon.com/](https://aws.amazon.com/).

**Free Tier**

AWS offers a 12months of free tier of support for many of their product and services.   Its important to mention that you will be charged accordingly once the 12months expires or you exceed the limits of the tier of support.  

So before we begin lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) of services.

<img src="https://i.imgur.com/Gplt0Ma.png" width=500/>

### API Gateway

The AWS API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain and secure APIs.  It allows them to create standalone RESTful APIs that can work with AWS backend services, Lambda being the most popular, to execute code once a url and method have been called.  

<img src="https://i.imgur.com/ziCSBw7.png" width=700/>

The routes, which AWS refers to as **resources**, can accept data either using **path params (/:id)** or **query strings (?id=1)**.  

#### Creating An API

Let's go ahead and create a new API by choosing **APIs** from the left menu and clicking the **Create API** all the way to the right. 

<img src="https://i.imgur.com/dK4tu18.png" />

API Gateway provides 4 options for building an API server. 
- HTTP
- WebSockets
- REST
- REST (private)


We will focus on creating a RESTful API which refers to a collection of resources and methods that can be invoked through HTTP endpoints. We will do so by clicking on the **Build** button. 

<img src="https://i.imgur.com/vj9nTHx.png" width=500/>

On the next configuration page we will choose **REST** as the **protocol** and create a **New API**.

<img src="https://i.imgur.com/lkCRCgW.png" width=500/>


We need to give it a **API name** and **Description** and will leave the **Endpoint Type** as **Regional**.  The app we will be building will allow us to store info about the projects in our portfolio so let's give it an appropriate name and description. 

Then click **Create API**. 

<img src="https://i.imgur.com/2ZDalPx.png" width=700/>

<!-- The app we will be building will allow us to store info about the projects in our portfolio, including the following:

- project_name	
- live_url	
- github_url	
- image_url	
- description -->

### Resources

This will take us to the **Resources** configuration page for our newly created API.  As we can see there is a single default route (aka resource) for the API and is assigned a single forward slash **/**.  

AWS refers to the **routes** as **resources**, which makes sense as they are meant to provide some type of resource to the requesting user.  

<img src="https://i.imgur.com/omo32kJ.png" width=600>

#### RESTful Routes to CRUD Mapping

Since the gateway we are building will be specific to projects we will make sure to follow the same **RESTful Routes to CRUD Mapping** schema we implemented in the previous unit. 

HTTP Method | URI (endpoint)  | CRUD Operation | Controller Action | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | index | No
GET     | /projects/:id      | Read a specific _project_ | show | No
POST    | /projects          | Create a new _project_ | create | Yes
PUT     | /projects/:id      | Update specified _project_  | update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | delete | No

Based on the above routes lets create our first **resource** which will be **/projects**.  

In order to do that click on the **Action** dropdown and choose **Create Resource**

<img src="https://i.imgur.com/L08bRYl.png" width=200/>

Here will choose **projects** as the name and path and the click on **Create Resource** button. 

<img src="https://i.imgur.com/33snxEy.png" />

Once the resource is created we are now presented with the resource and a message stating that **No methods defined for the resource** so we need to do that next.  

<img src="https://i.imgur.com/B196Eqk.png" >

### HTTP Methods

As we can see from the routing table the **index** route we will be associated with the **GET** method. 

We will do that by clicking on the **Actions** dropdown once again and choosing **Create Method** which will then present a dropdown list of methods to choose from, of which we will choose **GET** and then click on the **checkmark**. 

<img src="https://i.imgur.com/NshdtNF.png" width=300/>

Now there are several option for us to choose from and, although we will be configuring Lambda for all of the routes we will first choose **Mock** for now so that we can get it initially setup. 

<img src="https://i.imgur.com/HLYiy4S.png" width=700/>

Once the method is in place we will be presented with the following screen.  This follows the **request/response** cycle that you have already worked with in the previous unit. 

<img src="https://i.imgur.com/ZPVnYNy.png" width=700/>

A request is received and a response is returned and AWS divides each into it's corresponding type of **Method Request** and **Integration Request**. 

As this is a **Mock** endpoint we will see that the **Integration Request** ends at the **Mock Endpoint**.  Since there is nothing there to pass data to **Integration Response** they both act independently in this configuration. 

Once **Mock** is replaced with a **Lambda** function we will be able to pass data from **request** to **response**. 

#### Testing The API

Before we proceed to make our API public we should first give it a test run and we will do so by clicking on the **Test** button. 

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

We are presented with some test configuration options and by clicking on the **Test** button we should see the following: 

<img src="https://i.imgur.com/Rv4PAN6.png" >

### Deploying The API

Our API isn't available to the general public as of yet and needs to be deployed.  We can do that by clicking on the **Actions** button and selecting **Deploy API**.  

<img src="https://i.imgur.com/qSMpOBI.png" width=200/>

Here we will need to add a new **Deployment State** and in our case we will choose the name of **dev** and then click **Deploy**.

<img src="https://i.imgur.com/gr67gTk.png" width=400/>

This now takes us to our **Stages** and we should see the following:

<img src="https://i.imgur.com/Rzcn3C5.png" width=500/>

Let's take a look at the **Deployment History** tab and we should see info about this deployment. 

<img src="https://i.imgur.com/PxNVg3Y.png" >

#### Testing The API

Located at the very top nis the url to the dev version of our API.  If we copy/paste that into Chrome connect we should receive the following:

<img src="https://i.imgur.com/jAKC7Sr.png" width=400/>

Thats because there is no route configured for **/dev**. If append **/projects** to the url then we should see nothing as the route isn't configured to send any data. 

<img src="https://i.imgur.com/Wye9Sy6.png" width=400/>

We can confirm that the request did go through by checking our the **Network** tab in **DevTools**.  Here we should see that we received a status code of **200**. 

<img src="https://i.imgur.com/9K6E498.png">

#### Testing The API Using Postman

Open **Postman** and create a new **Collection** for our **Projects** routes.  

Here we will once again test the **GET** route and save it to our new collection. 

## Exercise - Configure a POST Route - 5min


Let's revisit the **RESTful Routes to CRUD Mapping** schema and focus on just the **POST** route. 

HTTP Method | URI (endpoint)  | CRUD Operation | Controller Action | Has Data
-----------|------------------|------------------|:---:|:---:
POST    | /projects          | Create a new _project_ | projects-create | Yes

Perform the following:

- Add a new **POST** method to the the **/projects** route. 
- Set it up as a **Mock Endpoint**
- Run a test to confirm that it works using Postman


### Next Steps -> Creating Lambda Functions

So we have created our very first route however it doesn't do very much at this point. In order to start responding to requests we will need to setup up a **Lambda** function.  So let's do that now.

#### References

- [AWS Global Infrastructure](https://jayendrapatil.com/aws-regions-availability-zones-and-edge-locations/)
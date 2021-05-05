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
<br>

The best way to convey their global network is through their [AWS Infrastructure](https://infrastructure.aws/) web site. 

### AWS Services

Along with their global infrastructure AWS offers in the range of 175 products and services. We can browse those services via the Products tab on [https://aws.amazon.com/](https://aws.amazon.com/).

**Free Tier**

AWS provides a free tier of support for many of their services.  Its important to mention that if you exceed the limit you will be charged accordingly. 

So before we begin lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) of services.

### API Gateway

The AWS API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain and secure APIs.  It allows them to create standalone RESTful APIs that can work with AWS backend services, Lambda being the most popular, to execute code once a url and method have been called.  

<img src="https://i.imgur.com/ziCSBw7.png" width=500/>

It can accepts data either via the ```body```, as ```params``` or as ```query strings```, all of which is the current standard for RESTFull APIs. 

#### Creating An API

In this lecture we will focus on building a **REST API**.   

Let's open the API Gateway and create a new API by clicking on the **Create API** button. 

<img src="https://i.imgur.com/yZLccWs.png" width=700/>

The API Gateway provides the following 4 ways for creating an API. 

- HTTP
- WebSockets
- REST
- REST (private)

We will focus on creating a RESTful API which refers to a collection of resources and methods that can be invoked through HTTP endpoints. We will do so by clicking on the **Build** button. 

<img src="https://i.imgur.com/vj9nTHx.png" />

Here we have the option to create the API via the following ways:

- New API
- Clone from existing API
- Import from Swagger or Open API 3
- Example API

We will choose **New API** and give it a name and description.  The app we will be building will allow users to store fun facts about themselves such as their age, fav color, fav food, dream destination. 

### Create An API
Let's use the following configurations for the API and click **Create API**. 

<img src="https://i.imgur.com/R9EGN0S.png">

### Resources

This will take us to the **Resources** configuration page for our newly created API.  As we can see there is a single default route (aka resource) for the API and is assigned a single **/**.  

AWS refers to the routes as resources which makes sense as they are meant to provide some type of resource to the user.  

<img src="https://i.imgur.com/omo32kJ.png" width=600>

### HTTP Methods

Since this is a RestFul API we will need to also configure an HTTP method for this resource (aka...route).   We can do that by clicking on the **Action** button and choosing **Create Method**

<img src="https://i.imgur.com/yAsZ1rK.png" width=400>

Here we are provided all the available methods of which we will choose **GET**

<img src="https://i.imgur.com/TCsgYv5.png">

There are several option for us to choose from and, although we will be configuring Lambda for the remainder of this lecture, we will first choose **Mock** so that we can easily test the API.  

<img src="https://i.imgur.com/5rz1cJr.png">

Once the method is in place we will be presented with the following screen.  This follows the request/response cycle that you have already worked with in express. A request is received and a response is returned.  As this is a **Mock** endpoint we will only send back mock data for the time being. 

<img src="https://i.imgur.com/Cc2IXzP.png">

In order to return (aka respond) we will configure the **Integration Request** so click on that to configure additional options.  Once it opens we will click the the drop down to configure the request. 

<img src="https://i.imgur.com/7uOkZGF.png" />

 Continue to expand **Mapping Templates** and then click on **application/json**. 

 <img src="https://i.imgur.com/N0vrMRU.png" />

This will open a side panel where we can send our mock response data. 

<img src="https://i.imgur.com/tdS7XYm.png" />

Here we will add the following JSON and click on **Save**

<img src="https://i.imgur.com/oepgmax.png">


#### Testing The API

Before we proceed to make our API public it's probably best that we test it first. Click on the back arrow **<- Method Execution** and there we can click on **Test**

<img src="https://i.imgur.com/Vz4575X.png" />

If the test is successful we should see the following: 

<img src="https://i.imgur.com/lDuAQqh.png" />

### Deploying The API

Our API isn't available to the general public as of yet and needs to be deployed.  We can do that by clicking on the **Action** button and then **Deploy API**.  

<img src="https://i.imgur.com/8eiKEJf.png" />

Here we will need to add a new **Deployment State** and in our case we will choose the name of **dev** and then click **Deploy**

<img src="https://i.imgur.com/bQoLpNB.png" />

AWS then provides us a url to access the dev version of our API.  

<img src="https://i.imgur.com/NaVCAue.png" />

If we open that in a new browser we should receive the following JSON.

<img src="https://i.imgur.com/NkEXOPR.png" />

And there you have it.  Your very first AWS API created using the API Gateway service. AWS provides us an easy way to setup an API along with a visual representation of the the request/response cycle. 

#### References

- [AWS Global Infrastructure](https://jayendrapatil.com/aws-regions-availability-zones-and-edge-locations/)
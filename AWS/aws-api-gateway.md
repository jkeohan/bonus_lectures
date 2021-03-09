Title: AWS-React-Deployment<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# AWS API Gateway

This is a mini lecture focused on deploying an API using AWS API Gateway service. 

 We will be covering the following topics:

- creating API paths (aka resources)
- adding HTTP Methods to a resource
- Work through the Request/Response cycle
- Working with url params and query string
- Testing the API

## Prerequisites

- An AWS (Amazon Web Services) account

If you do not have an account, open AWS and click Create a Free Account. Amazon provides a free tier, with some limitations, for twelve months after you sign-up for an AWS account.

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

So before we begin lets take a look at their free tier (https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) of services.

### API Gateway

The AWS API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain and secure APIs.  It allows them to create standalone RESTful APIs that can work with AWS backend services, Lambda being the most popular, to execute code once a url and method have been called.  

<img src="https://i.imgur.com/ziCSBw7.png" width=500/>

It can also accept data either via the ```body```, as ```params``` or as ```query strings```, all of which is the current standard for RESTFull APIs. 

#### Creating An API

In this lecture we will focus on building a REST API where we aim to gain complete control over the request/response cycle.  

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

Let's use the following configurations for the API and click **Create API**. 

<img src="https://i.imgur.com/R9EGN0S.png">

This will take us to the configuration page for our newly created API.

<img src="https://i.imgur.com/afXQ7UM.png" >

<img src="https://i.imgur.com/yAsZ1rK.png">

<img src="https://i.imgur.com/TCsgYv5.png">

For the time being we will create a **Moock** API 

<img src="https://i.imgur.com/5rz1cJr.png">

<img src="https://i.imgur.com/Cc2IXzP.png">




#### References

- [AWS Global Infrastructure](https://jayendrapatil.com/aws-regions-availability-zones-and-edge-locations/)
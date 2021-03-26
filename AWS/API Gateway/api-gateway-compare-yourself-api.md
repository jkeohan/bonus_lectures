### API Gateway

The AWS API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain and secure APIs.  It allows them to create standalone RESTful APIs that can work with AWS backend services, Lambda being the most popular, to execute code once a url and method have been called.  

<img src="https://i.imgur.com/ziCSBw7.png" width=500/>

It can also accept data either via the ```body```, as ```params``` or as ```query strings```, all of which is the current standard for RESTFull APIs. 

#### Creating An API

In this lecture we will focus on building a **RESTful API**.   

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

This will take us to the **Resources** configuration page for our newly created API.  As we can see there is a single default route (aka resource) for the API is a single **/**.  AWS refers to the routes as resources which makes sense as they are meant to provide some type of resource to the user.  

<img src="https://i.imgur.com/omo32kJ.png" >

Since this is a RestFul API we will need to also configure an HTTP method for this resource (aka...route).   We can do that by clicking on the **Action** button and choosing **Create Method**

<img src="https://i.imgur.com/yAsZ1rK.png">

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

Before we proceed to make our API public it's probably best that we test it first. Click on the back arrow **<- Method Exccution** and there we can click on **Test**

<img src="https://i.imgur.com/Vz4575X.png" />

If the test is successful we should see the following: 

<img src="https://i.imgur.com/lDuAQqh.png" />

### Deploying The API

Our API isn't yet available to the general public as of yet and needs to be deployed.  We can do that by clicking on the **Action** button and then **Deploy API**.  

<img src="https://i.imgur.com/8eiKEJf.png" />

Here we will need to add a new **Deployment State** and in our case we will choose the name of **dev** and then click **Deploy**

<img src="https://i.imgur.com/bQoLpNB.png" />

AWS then provides us a url to access the dev version of our API.  

<img src="https://i.imgur.com/NaVCAue.png" />

If we open that in a new browser we should recieive the following JSON.

<img src="https://i.imgur.com/NkEXOPR.png" />

And there you have it.  Your very first AWS API created using the API Gateway service. No node/express servers needed and a clean GUI that provides us access to a visual representation of the the request/response cycle and all the configuration options available in each. 

#### References
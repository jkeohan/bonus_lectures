Title: Intro To AWS Lambda<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# AWS Lambda and API Gateway Integration

<img src="https://i.imgur.com/V8ZPBkF.png" />



This lecture will focus on creating **AWS Lambda functions** and configuring them to work with the **API Gateway**.  We will perform the following:

- creating and testing Lambda functions
- editing and deploying Lambda functions
- configuring API Gateway to trigger Lambda functions

## Prerequisites

- An AWS (Amazon Web Services) account
- An AWS Gateway RESTFul API

## AWS Lambda

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers.  With Lambda, you can run code for virtually any type of application or backend service - all with zero administration.

Here are some of the main benefits of working with Lambda:

- Virtual functions with no servers to manage
- Integrated with many programming languages such as JS, Ruby, Python
- Event Driven and triggered by other services
- Automated scaling


### Free Tier

Lambda falls into the **Always Free** tier of services so lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) page, scroll down a bit, and search for Lambda.  

<img src="https://i.imgur.com/lUFJYPL.png" >
<br>
<br>

Although free, Lambda's free tier of support is limited to the following, none of which we will exceed during the process of creating and supporting our API. 

  - 1,000,000 requests (then .20C per 1mil additional requests)
  - 400,000 GBs of compute time (3,200,000 sec if functions are configured to use 128 MB)

The **compute time** is an important consideration here as the Lambda functions run time is limited and may time out after a certain point.  The other consideration is how many Lambda functions have been called with each making use of the 400,000 GB of free tier provided RAM. 

### Lambda Overview

Let's click on the [AWS Lambda](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=tier%23always-free&awsf.Free%20Tier%20Categories=*all&all-free-tier.q=lambda&all-free-tier.q_operator=AND) link and review what the service can do for us. The page provides multiple use cases describing how Lambda can be used.  The pic below is just one example of where it can be placed in the serverless framework.

<img src="https://i.imgur.com/O1Pb0jM.png">

AWS also provides a [Lambda Simulation](https://console.aws.amazon.com/lambda/home?region=us-east-1#/begin) tool to help visualize how Lambda gets called and processes each request. 

<img src="https://i.imgur.com/sYm3Wlp.png">

### Getting Started

Lets get started with Lambda by clicking the **Get started with AWS Lambda** button.

<img src="https://i.imgur.com/lLIPK2t.png">
<br>



On the left we will see the navigation pane and here let's click on **Functions**. 

<img src="https://i.imgur.com/PyTDHzK.png" >

### Creating A Lambda Function

Now click on **Create Function**.

<img src="https://i.imgur.com/FyvHGTb.png"  />

There are several options to choose from when creating a function.  We will be choosing **Author from scratch**.

<img src="https://i.imgur.com/CIttKLB.png">

Here we must give the function a **name** and a **runtime environment**.  
The naming convention we will use is based on the routing table so let's take a look at the name assigned for that route. 

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | No

<img src="https://i.imgur.com/DFhf4mB.png">

Since we will be working with JavaScript let's choose the latest version of **Node.js**.  

<img src="https://i.imgur.com/dfvdycF.png">


<!-- <img src="https://i.imgur.com/Xzz0yCa.png"/> -->

<!-- <img src="https://i.imgur.com/etHLoft.png" width=500> -->


Create the function by clicking on the **Create Function** button. 

<img src="https://i.imgur.com/0bSqU4q.png" >



### Working With A Lambda Function 

The function provides us a single **index.js** file with some initial starter code,  so click on the file and let's take a look at the code. 

<img src="https://i.imgur.com/oretBOl.png">

Here we can see that the function is exporting a **handler**.  We've worked with the **exports** keyword before, in both Node and React, however  **exports.handler** is unique to Lambda.  

<img src="https://i.imgur.com/Ejm6ELQ.png" width=500>



When the function is invoked, Lambda runs the function specified in it's **Runtime Settings**, in this case **index.handler**.  We can verify this by looking over the **Runtime settings**.

<img src="https://i.imgur.com/E4E9LC8.png">

When the handler exits, or returns a response, it then becomes available to be called via the next trigger. 

There is quite a bit for us to cover as it pertains to Lambda so let's leave the defaults for now and configure our AWS Gateway API replacing the MOCK endpoint with this newly created Lambda function.  

### AWS Gateway Integration With Lambda

On the **GET** route let's click on **Integration Request** and change the option from **Mock** to **Lambda**, choosing the Lambda function we just created. 

Lambda functions are associated with **Regions** so make sure to choose your region. 

<img src="https://i.imgur.com/xn5KuPw.png">

Click **OK** on the pop up message regarding integration. 

<img src="https://i.imgur.com/aOPQMNL.png">

Click **OK** to the additional pop up message regarding providing AWS Gateway permissions to invoke the Lambda function.  

<img src="https://i.imgur.com/CNj3GrR.png">

**NOTE:** Permissions are very important in AWS and we will be adding additional permissions to the role created for this Lambda function in IAM once we set it up to connect to DynamoDB. 



There are quite a few new configuration options available after changing the integration type.  Some of which you are already familiar with such as **URL Path and Query String Parameters**. 

 They work in the same way as node/express and the routes can be configured to accept data either using **path params (/:id)** or **query strings (?id=1)**.   

<img src="https://i.imgur.com/yskbFNz.png">

We will take a look at several of these settings a later point when we configure the remaining routes. 


### Testing 

Let's click on the **<- Method Execution** link to go back to the main **GET** configuration page.  Once there click on the **TEST** button. 

<img src="https://i.imgur.com/BplYN3q.png" >


If successful we should see the following message.

<img src="https://i.imgur.com/tEabvg3.png" >

### Redeploy 

Let's redeploy the app and, in line with best practices, provide a description as to the changes we've made to the API. 

<img src="https://i.imgur.com/IwXUZ87.png">

Open the URL and confirm that you receive the same message as when tested via the API.



<img src="https://i.imgur.com/MdwHyVn.png">

### Redeploying Lambda

Let's go back to our Lambda function and try changing the message. The first thing we might notice is that the page has been updated to include **API Gateway** as a new trigger. 

**INSTRUCTOR TO UPDATE THE PIC TO REFEReNCE projects-get**

<img src="https://i.imgur.com/s81bYZk.png">

Click on the **index.js** file and make the following edit: 

```js       
body: JSON.stringify('GET /project route working successfully'),
```
#### Testing Lambda

Just as we tested the API before deployment we can also test the changes made to the Lambda function by clicking on the **Test** button. 

This requires that we first configure a new test.  Let's use the **hello-world** template and call our test **initialTest**.  By default it passes the function an object which we can edit at any time.

<img src="https://i.imgur.com/RnbbmkC.png">

#### Running The Test

Clicking on the test button we can examine the execution results. 

<img src="https://i.imgur.com/YF4Dq4j.png">

It seems however that it still shows the previous message. That is because anytime we make changes to the Lambda function it must be re-deployed, just like the API Gateway. 

<img src="https://i.imgur.com/z33XiDk.png">



Click on the **Deploy** button. 

<img src="https://i.imgur.com/fU1riF0.png" >

Now run the test again and we should see our changes. 

<img src="https://i.imgur.com/sZnt0t7.png" >

Of course confirm that testing the API externally also displays the new changes.  Since we didn't make any changes to the API itself there is no need to re-deploy the API. 

<img src="https://i.imgur.com/FN2DpYf.png"> 

That completes creating our first Lambda function and configuring it to be triggered by the AWS Gateway API. 

## Exercise - Create Lambda Functions - 30min

Since our API will require additional routes this means we will need to create additional supporting Lambda functions. 

#### RESTful Routes to CRUD Mapping

Let's revisit the **RESTful Routes** table we saw in the previous API lecture. The **Lambda** column contains the name of the functions we will need to create to support our API.  

HTTP  | Resource  | CRUD Operation | Lambda | Has Data
-----------|------------------|------------------|:---:|:---:
GET     | /projects          | Read all _projects_ | projects-get | No
GET     | /projects/:id      | Read a specific _project_ | projects-show | No
POST    | /projects          | Create a new _project_ | projects-create | Yes
PUT     | /projects/:id      | Update specified _project_  | projects-update | Yes
DELETE  | /projects/:id      | Delete specified _project_ | projects-delete | No


#### Lambda

- Create each of the remaining Lambda functions needed to support the rest of our routes.  **Don't create the routes only the Lambda functions**
- The functions should only return same message as before however replace the **GET /projects** text with the method and route name, such as **Post /projects**
- Create a new test for each Lambda function to confirm that each function works as expected

#### API GATEWAY

- Update only the **POST** method for the **/projects** resource and assign the **projects-create** Lambda function
- Test the new route locally 
- Deploy the changes made to the API and add an appropriate deployment message
- Test the API is working externally using **Postman**.  You should only receive receive the following:

<img src="https://i.imgur.com/6ln3Ft5.png">

### Resources

- [Free Tier Page](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc)
- [Lambda Simulation](https://console.aws.amazon.com/lambda/home?region=us-east-1#/begin)
- [AWS Lambda](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=tier%23always-free&awsf.Free%20Tier%20Categories=*all&all-free-tier.q=lambda&all-free-tier.q_operator=AND)
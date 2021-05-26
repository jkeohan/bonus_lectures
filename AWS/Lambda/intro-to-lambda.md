Title: Intro To AWS Lambda<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# AWS Lambda and API Gateway Integration

<!-- <img src="https://i.imgur.com/0pExHXm.png" width=200/> -->



This lecture will focus on creating AWS Lambda functions and configuring them to work with API Gateway. 

- creating and testing Lambda functions
- editing and deploying Lambda functions
- configuring API Gateway to trigger Lambda functions

## Prerequisites

- An AWS (Amazon Web Services) account

If you do not have an account, open AWS and click Create a Free Account. Amazon provides a free tier for twelve months,with some limitations,  after you sign-up for an AWS account.

### AWS Lambda

AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers.  With Lambda, you can run code for virtually any type of application or backend service - all with zero administration.

Here are some of the main benefits of working with Lambda:

- Virtual functions with no servers to manage
- Integrated with many programming languages such as JS, Ruby, Python
- Event Driven and triggered by other services
- Automated scaling




**Free Tier**

Lambda falls into the **Always Free** tier of services so lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) page search for Lambda to confirm this is still the case.  

<img src="https://i.imgur.com/lUFJYPL.png" width=300/>
<br>
<br>

Lambda is free but limited to the following:

  - 1,000,000 requests (then .20C per 1mil additional requests)
  - 400,000 GBs of compute time (3,200,000 sec if functions are configured to use 128 MB)

### Lambda Overview

Let's click on the [AWS Lambda](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=tier%23always-free&awsf.Free%20Tier%20Categories=*all&all-free-tier.q=lambda&all-free-tier.q_operator=AND) link and review what the service can do for us. Below is just one example of where Lambda can be placed in the serverless framework.

<img src="https://i.imgur.com/O1Pb0jM.png" width=500>

### Getting Started

Lets get started with Lambda by clicking the **Get started with AWS Lambda** button.

<img src="https://i.imgur.com/lLIPK2t.png" width=500>
<br>
<br>


On the left we will see the navigation and let's click on **Functions**. 

<img src="https://i.imgur.com/PyTDHzK.png" width=200>

### Creating A Function

Click on **Create Function**

<img src="https://i.imgur.com/FyvHGTb.png" width=500 />

There are several options to choose from when creating a function so let's choose **Author from scratch**.



Here we must give the function a **name** and a **runtime environment**.  Since we will be working with JavaScript let's choose the latest version of **Node.js**.  


<img src="https://i.imgur.com/etHLoft.png" width=500>


Now click on the **Create Function** button. 

<img src="https://i.imgur.com/0bSqU4q.png" width=500>



### Working With A Lambda Function 

The function provides us a single **index.js** file with some initial code so click on that file.

<img src="https://i.imgur.com/fDI6L9D.png" width=500>

Here we can see that the function is exporting a handler.  We've worked with the **exports** keyword before, in both Node and React, however  **exports.handler** is unique to Lambda.  

The Lambda function handler is the method in your function will call that processes events. 

When your function is invoked, Lambda runs the handler method. When the handler exits or returns a response, it then becomes available to handle another event.

<img src="https://i.imgur.com/Ejm6ELQ.png" width=500>

There is quite a bit for us to cover using Lambda but let's leave the defaults for now and go back and configure our AWS Gateway API to use this newly created Lambda function. 

### AWS Gateway Integration With Lambda

On the **GET** route let's click on **Integration Request** and change the option from **Mock** to **Lambda** and then choose the Lambda function we created earlier. 

<img src="https://i.imgur.com/2rAtJHz.png" width=500>

Click **OK** on the pop up message regarding integration.  

<img src="https://i.imgur.com/aOPQMNL.png" width=500>

Click **OK** on the pop up message regarding providing AWS Gateway permissions to invoke the Lambda function.  

<img src="https://i.imgur.com/CNj3GrR.png" width=500>

**NOTE:** Permissions are very important in AWS and we will be adding additional permissions to Lambda once we get to working with DynamoDB. 



There are quite a few new configuration options available after changing the integration type.  Some of which you have already worked with such as **URL Path and Query String Parameters**. 

We will take a look at them at a later point as we configure the remaining routes. 
<img src="https://i.imgur.com/yskbFNz.png" width=500>

### Testing 

Let's click on the **<- Method Execution>** link to go back to the main **GET** configuration page.  

Once there click on the **TEST** button. 

<img src="https://i.imgur.com/BplYN3q.png" width=500>


If successful we should see the following message.

<img src="https://i.imgur.com/tEabvg3.png" width=300>

### Redeploy 

Let's redeploy the app and, in line with best practices, provide a description as to the changes we've made to the API. 

<img src="https://i.imgur.com/IwXUZ87.png" width=500>

Open the URL and confirm that you receive the following message. 



<img src="https://i.imgur.com/bh9AJYM.png" width=500>

### Redeploying Lambda

Let's go back to our Lambda function and try changing the message. The first thing we might notice is that the page has been updated to include **API Gateway** as a new trigger. 

<img src="https://i.imgur.com/s81bYZk.png" width=400>

Click on the **index.js** file and make the following edit: 

```js       
body: JSON.stringify('GET route working successfully'),
```
#### Testing Lambda

Just as we tested the API before deployment we can also test the changes made to the Lambda function by clicking on the **Test** button. 

Here we must first configure a new test.  Let's use the **hello-world** template and call our test **initialTest**

<img src="https://i.imgur.com/RnbbmkC.png">

#### Running The Test

Clicking on the test button we can examine the execution results. 

<img src="https://i.imgur.com/YF4Dq4j.png">

It seems however it still shows the previous message. 

<img src="https://i.imgur.com/z33XiDk.png">

That is because anytime we make changes to the Lambda function it must be re-deployed. 

Click on the **Deploy** button. 

<img src="https://i.imgur.com/fU1riF0.png" width=500>

Now run the test again and we should see our changes. 

<img src="https://i.imgur.com/sZnt0t7.png" >

Of course confirm that testing the API externally also displays the new changes. 

<img src="https://i.imgur.com/FN2DpYf.png" width=500> 

That completes creating our firs Lambda function and configuring it to be triggered by the AWS Gateway API. 

### Resources

- [Lambda Simulation](https://console.aws.amazon.com/lambda/home?region=us-east-1#/begin)
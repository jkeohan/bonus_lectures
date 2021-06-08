Title: AWS-React-Deployment<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# AWS Deployment Using Aplify

This lecture is focused on deploying a React app using AWS Amplify.

 We will be covering the following topics:

- using IAM to create users/groups
- create and configure an S3 bucket
- connect to the S3 bucket via our terminal
- add a new startup script to build & push the React app

## AWS Amplify

AWS Amplify is a set of products and tools that enable mobile and front-end web developers to build and deploy secure, scalable full-stack applications, powered by AWS.

<img src="https://i.imgur.com/rlFi44o.png">

## Free Tier

Amplify falls into the **12 Months Free** tier of services so lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) page search for Amplify to confirm this is still the case.  



<img src="https://i.imgur.com/h6VLwWH.png" >
<br>

### Getting Started

Click on the **Get stared for free** button. 

<img src="https://i.imgur.com/e3mp8uZ.png">
<!-- <img src="https://i.imgur.com/SZ6sSyv.png"> -->

<!-- <img src="https://i.imgur.com/yO5cljm.png"> -->

We are presented with several ways to deploy the app from an existing code repository.  Since we will be using **Github** choose that option. 

<img src="https://i.imgur.com/KgHpAJ0.png">

Amplify now needs to authenticate to Github so click on the **Authorize aws-amplify console** button. 

<img src="https://i.imgur.com/CCxlMSI.png">

<!-- We must now choose the repo that contains our project. 

<img src="https://i.imgur.com/bF1L5Ys.png"> -->

Choose the repo from the dropdown and the branch. 

<img src="https://i.imgur.com/5i1Ukkg.png">

Amplify will create build settings based on our project. 

<img src="https://i.imgur.com/1xojV2i.png">

Let's review and click **Save and deploy**. 

<img src="https://i.imgur.com/1suHSH5.png">

<img src="https://i.imgur.com/z0pxnIL.png">

Now Aplify will work through the build and deploy process. 

<img src="https://i.imgur.com/DYXiIlo.png">

Once complete our project will be accessible via the web. 

<img src="https://i.imgur.com/MGQ0I52.png">

### Resources

- [Aplify vs Netlify](https://harrisonmilbradt.com/blog/netlify-vs-amplify-a-look-at-modern-web-application-platforms/)
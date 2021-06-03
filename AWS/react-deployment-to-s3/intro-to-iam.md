his is a mini lecture focused on deploying a React app to an AWS S3 bucket configured as a static web server.

 We will be covering the following topics:

- using IAM to create users/groups
- create and configure an S3 bucket
- connect to the S3 bucket via our terminal
- add a new startup script to build & push the React app

## Prerequisites

- An AWS (Amazon Web Services) account
- A Credit card is required to verify your AWS account.

If you do not have an account, open AWS and click Create a Free Account. Amazon provides a free tier, with some limitations, for twelve months after you sign-up for an AWS account.

## Intro To The AWS Global Network 

AWS has become the premier cloud service provider and provides companies with a global infrastructure and pay as you go service model helping companies to lower their TCO. 

Their infrastructure currently contains 24 geographic Regions around the world with a total of 77 Availability Zones. They have also announced plans for 6 more AWS Regions in Australia, India, Indonesia, Japan, Spain, and Switzerland which will includes 18 Availability Zones.  


<img src="https://i.imgur.com/ZVH2bAl.jpg" >
<br>

The best way to convey their global network is through their [AWS Infrastructure](https://infrastructure.aws/) web site. 

### AWS Services

Along with their global infrastructure AWS offers in the range of 175 products and services. We can browse those services via the Products tab on [https://aws.amazon.com/](https://aws.amazon.com/).

**Free Tier**

AWS provides a free tier of support for many of their services.  Its important to mention that if you exceed the limit you will be charged accordingly. 

So before we begin lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) of services.

## Creating User/Groups Using IAM

The first service we will use is **IAM**, which stands for **Identity and Access Management**.  It is used for managing user and group accounts, along with creating roles and policies in AWS.  

The one golden rule to follow is that we should never use the **Root** account when connecting to AWS and for that reason  we will create a separate admin account and assign it the appropriate permissions. 

Creating an account involves the following steps:

- Defining a user name and the type of access
- Adding the user to a group and assigning group permissions
- Download the `credentials.csv` file that contains access & secret keys

AWS has made it easy to search for a service by using typing in the service name, in this case **IAM**. 

<img src="https://i.imgur.com/TDjx7Uj.png">

### Adding A User

Once the tool opens let's click on **Users** and the **Add User** button. 

<img src="https://i.imgur.com/8R2M1iN.png">

Create a **User name** and choose **Programatic access**.  This access allows the user to connect via the CLI.

Once complete click **Next**. 

<img src="https://i.imgur.com/yBsbLQq.png">

Groups are a key part to security in AWS and, by default, there are no predefined groups so we will need to create one. 

Click on **Create group**. 

<img src="https://i.imgur.com/Lx3ah8x.png">

For this demo we will create a group called **seir-admins** and assign the **AdministratorAccess** policy. 

<img src="https://i.imgur.com/4gsJoZU.png">

 We need to add the user to the appropriate group.  For now we will add them to the default **admins** group. Once the group is created it will have already added the user the newly created group.

<img src="https://i.imgur.com/IIg6Ce5.png" >

We have the option to assign tags to this user but we will not do so at this time so click **Next**. 

On the review page we must make sure to download the security keys as they contain both the **Access key id** and **Secret access key** we will use when we connect via the CLI. 


<img src="https://i.imgur.com/3MLmPNM.png" />


## Creating An S3 Bucket

S3 stands for **Simple Storage Service** and is the most basic of the storage options in AWS. It is used for general purpose and frequent access to data. Besides simple storage an S3 bucket can also be configured as a static web server. 

We can find the service by using their search option once again and typing in **S3**. 

<img src="https://i.imgur.com/aZQH1hG.png" >

**NOTE**: accessKeys.csv contains secrets! Do not share them or store them in git. The .gitignore in this repository explicitly ignores this file. Altering the .gitignore file in this repository could result in your AWS credentials (credentials linked to your credit card information) being visible on Github. NEVER COMMIT SECRETS TO GIT
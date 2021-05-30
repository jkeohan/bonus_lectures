Title: AWS-React-Deployment<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# AWS Deployment 

This is a mini lecture focused on deploying a React app to an AWS S3 bucket configured as a static web server.

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


<img src="https://i.imgur.com/ZVH2bAl.jpg" width=600>
<br>

The best way to convey their global network is through their [AWS Infrastructure](https://infrastructure.aws/) web site. 

### AWS Services

Along with their global infrastructure AWS offers in the range of 175 products and services. We can browse those services via the Products tab on [https://aws.amazon.com/](https://aws.amazon.com/).

**Free Tier**

AWS provides a free tier of support for many of their services.  Its important to mention that if you exceed the limit you will be charged accordingly. 

So before we begin lets take a look at their[free tier] (https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) of services.

## Creating User/Groups Using IAM

The first service we will use is **IAM**, which stands for **Identity and Access Management**.  It is used for managing user and group accounts, along with creating roles and policies in AWS.  

The one golden rule to follow is that we should never use the **Root** account when connecting to AWS and for that reason  we will create a separate admin account and assign it the appropriate permissions. 

Creating an account involves the following steps:

- Defining a user name and the type of access
- Adding the user to a group and assigning group permissions
- Download the `credentials.csv` file that contains access & secret keys

AWS has made it easy to search for a service by using typing in the service name, in this case **IAM**. 

<img src="https://i.imgur.com/TDjx7Uj.png" width=600>

### Adding A User

Once the tool opens let's click on **Users** and the **Add User** button. 

<img src="https://i.imgur.com/8R2M1iN.png" width=600>

Create a **User name** and choose **Programatic access**.  This access allows the user to connect via the CLI.

Once complete click **Next**. 

<img src="https://i.imgur.com/yBsbLQq.png" width=600>

Groups are a key part to security in AWS and, by default, there are no predefined groups so we will need to create one. 

Click on **Create group**. 

<img src="https://i.imgur.com/Lx3ah8x.png" width=600>

For this demo we will create a group called **seir-admins** and assign the **AdministratorAccess** policy. 

<img src="https://i.imgur.com/4gsJoZU.png" width=600>

 We need to add the user to the appropriate group.  For now we will add them to the default **admins** group. Once the group is created it will have already added the user the newly created group.

<img src="https://i.imgur.com/IIg6Ce5.png" width=600>

We have the option to assign tags to this user but we will not do so at this time so click **Next**. 

On the review page we must make sure to download the security keys as they contain both the **Access key id** and **Secret access key** we will use when we connect via the CLI. 


<img src="https://i.imgur.com/3MLmPNM.png" width=600/>


## Creating An S3 Bucket

S3 stands for **Simple Storage Service** and is the most basic of the storage options in AWS. It is used for general purpose and frequent access to data. Besides simple storage an S3 bucket can also be configured as a static web server. 

We can find the service by using their search option once again and typing in **S3**. 

<img src="https://i.imgur.com/aZQH1hG.png" width=600>

**NOTE**: accessKeys.csv contains secrets! Do not share them or store them in git. The .gitignore in this repository explicitly ignores this file. Altering the .gitignore file in this repository could result in your AWS credentials (credentials linked to your credit card information) being visible on Github. NEVER COMMIT SECRETS TO GIT


### Creating An Simple Storage Bucket (S3)

Creating an S3 bucket will involve the following steps:

- Define a Bucket name and assigning it a region
- Define Bucket Access permissions


Let's get started by clicking on the **Create Bucket** button. The first option we will configure is the **Bucket Name** and **Region**.

<img src="https://i.imgur.com/QpUsfzP.png" width=600>

Then we will uncheck the **Block all public access** and then check the **I acknowledge** option. 

<img src="https://i.imgur.com/amttek1.png" width=600>

Once the bucket is created we must now add a custom **Bucket Policy**.  We will do this by clicking on the Bucket and clicking the **Permissions** tab. 

<img src="https://i.imgur.com/XYnVQeP.png" width=600>

Now browse down to **Bucket Policy** and click on **Edit**. 

<img src="https://i.imgur.com/pdK5NXR.png" width=600/>

On the **Edit Policy Page** click on **Policy Generator**

<img src="https://i.imgur.com/zJQfjLa.png" width=600/>


#### On the AWS Policy Generator page

- For `Select Type of Policy` use `S3 Bucket Policy`.
- Under `Add Statement(s)`:
    - Select `Allow` for `Effect`.
    - In the `Principal` box type `*`
    - Select `GetObject` for `Actions`.
    - Enter `arn:aws:s3:::bucket_name/*` into the `Amazon Resource Name (ARN)` box.

Once the info is in place click **Add Statement**

<img src="https://i.imgur.com/fZWru8z.png" width=600>

Now click on **Generate Policy**

<img src="https://i.imgur.com/3XtV5Od.png" width=600>

Copy the JSON.  You can use the below JSON as well if you didn't perform the previous steps. The only thing we will need to customize here is the name of the S3 Bucket name you defined. 


```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::ga-p2-react/*"
        }
    ]
}
```

Paste the JSON into the **Bucket Policy** and click **Save Changes**

<img src="https://i.imgur.com/9AVi9WY.png" width=600>

<!-- Here is a breakdown of what those options mean. 

|Configurration| Description|
|-----|------|
|Version | Defines the type of policy
| Statement | An array of key:values that define the permissions
| Sid | Defines the level of permissions
| Effect | Set to Allow or Deny
| Principle | Acecss the entire object
| Action | Defines the type of action that can be performed
| Resource | Defines the resource that you are providing access
 -->


### Configure S3 As A Static Website

As mentioned before S3 buckets can be used as general storage containers or as static web servers.  We can make that configuration by clicking on the **Properites** and scrolling to the very bottom of the page. 

Here we will click **Edit** on the **State webstie hosting** section.

<img src="https://i.imgur.com/VgPFqXN.png" width=600>

Once **Enabled** we will need to type a document name for both **index document** and **error document**.  Since our React app is already configured to render an **index.html** file we will use that. 

<img src="https://i.imgur.com/dhZBLM1.png" width=600>

Once the settings have been saved we can now access the site via the url it provies. 

<img src="https://i.imgur.com/xQIAm7Q.png" width=600>

However since we haven't yet pushed an index.html file we should receive the following error.

<img src="https://i.imgur.com/lbjVxuO.png" width=600>

## Setting Up CLI Access

Let's now install the Install the **AWS CLI** tool.  AWS provides installers for either [Mac, Windows or Linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html). 

Once it's installed open a **terminal** and type the following to confirm the cli was successfully installed. 

```
aws -- version

=> aws-cli/2.0.7 Python/3.8.2 Darwin/19.5.0 botocore/2.0.0dev11
```

Let's configure our access keys stored in the .csv file we downloaded earlier. 

In order to do this we will type: **aws configure** and follow the prompts to provide the **Access** and **Secret Access** keys which you can copy/paste.

<img src="https://i.imgur.com/yV9UDuf.png" width=600>

We can test that our account now has admin access by typing: 

```
aws iam list-users
```

If successful you should see something similar to the following output.

<img src="https://i.imgur.com/FAjneMe.png" width=400>

## Deploying The React App

Now that AWS is configured all we have to do is configure a new startup script in the **package.json** of the React app and push it all up to our S3 bucket. 

In **package.json** add the following **deploy** script. Make sure to change the s3 bucket name to that which you created earlier. 

```
"deploy": "aws s3 sync build/ s3://seir1207-p2"
```

All that is left if is to first run the **build** script, wait for the build to complete, and then run **deploy**.
```
npm run build

npm run deploy
```

Confirm that your site has been pushed up and is accessible by refreshing the page. 

#### References

- [AWS Global Infrastructure](https://jayendrapatil.com/aws-regions-availability-zones-and-edge-locations/)
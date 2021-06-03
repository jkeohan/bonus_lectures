Title: Intro To DynamoDB<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# AWS DynamoDB

<img src="https://i.imgur.com/Wmp6bps.png" width=700/> 



This lecture will focus on working with DynamoDB and will over the following: 

- providing an introduction to DynamoDB
- creating tables
- adding rows of data


### AWS DynamoDB

Amazon DynamoDB is a NoSQL Database that uses key-values to create and manage entries.  It provides the following:

- delivers single-digit millisecond performance at any scale
- it's a fully managed, multi-region, multi-active, durable database with built-in security, backup and restore, and in-memory caching for internet-scale applications. 
- it can handle more than 10 trillion requests per day and can support peaks of more than 20 million requests per second.

Many of the world's fastest growing businesses such as Lyft, Airbnb, and Redfin as well as enterprises such as Samsung, Toyota, and Capital One depend on the scale and performance of DynamoDB to support their mission-critical workloads.

<img src="https://i.imgur.com/sJgLXRl.png">

<!-- <img src="https://i.imgur.com/ldOTWqq.png"> -->


### Primary Key = Partition Key
An **item** in DynamoDB refers to a single entry that is referenced using only a **Partition Key**.

<img src="https://i.imgur.com/AxjGVug.png" >

Creating a table like this would be consistent with the following:

<img src="https://i.imgur.com/iLbf8X6.png">

### Primary Key = Partition Key + Sort Key


Many developers apply relational design patterns with DynamoDB even though they don’t have the relational tools like the join operations. This means they put their items into different tables according to their type. However, since there are no joins in DynamoDB, they’ll need to make multiple requests to fetch both the Orders and the Customer record.

<img src="https://i.imgur.com/cXQNw1k.png">

Being that this DB is non relational we can create relationships using an **item collection** which refers to all the items in a table or index that share a partition key. 

<img src="https://i.imgur.com/BmxMgUS.png">

#### Relational Design Patterns With DynamoDB 

In the example below, we have a DynamoDB table that contains actors and the movies in which they have played. The primary key is a composite primary key where the partition key is the actor’s name and the sort key is the movie name.

<img src="https://i.imgur.com/sSeYYZB.png">




### Free Tier

Lambda falls into the **Always Free** tier of services so lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) page search for Lambda to confirm this is still the case.  



<img src="https://i.imgur.com/HuIKHvJ.png" >
<br>
<br>

Although DynamoDB is a free service we still must be conscious of when we exceed those limits otherwise we will incur charges.  We won't have to worry about that for our current use case but changes are applied based on either read or write capacity units.  In this case it's 5 per second. 


<img src="https://i.imgur.com/oWyQYHk.png">


It should be mentioned that cost is measured across all tables so the more you create the greater chance you have of exceeding the free tier. 


<!-- <img src="https://i.imgur.com/6JAOefX.png"> -->

<!-- <img src="https://i.imgur.com/yBbGBPQ.png"> -->

<!-- <img src="https://i.imgur.com/sJgLXRl.png"> -->

### Creating A DynamoDB Table

Let's get started with creating our first DynamoDB table by clicking on the big orange button. 

<img src=https://i.imgur.com/lD1OpKf.png >

This takes us to the DynamoDB services page where we can create tables and manage the DynamoDB database. 

<img src="https://i.imgur.com/6kMrAyL.png">

Add a **Table Name** and **Primary Key**.  The **Primary Key**, like all databases, will be unique for each entry in the DB.  

<!-- <img src="https://i.imgur.com/AxjGVug.png" width=500> -->

<!-- <img src="https://i.imgur.com/BPVzVtf.png"> -->

Here we will assign the **Primary Key** a name of **ProjectId** and of type **String**. 

<img src="https://i.imgur.com/lV90zBp.png">

Here we should make note of the Read and Write capacity units.  This allows us to determine assign resources as to how the DB will be used.  This is an important concept in DynamoDB and will need to be calculated for both performance and cost. We will leave the default as they are. 

<img src="https://i.imgur.com/WsmezJD.png">




Our table is created and we should be presented with the following: 


<img src="https://i.imgur.com/ZvG2nhC.png">



### Create A New Item 
<!-- 
When we first add a new item we will have to decide the name of the **Primary Key** which is almost always the **Partition Key**.  -->

<!-- <img src="https://i.imgur.com/AxjGVug.png"> -->

Here is one of the project entries from the projectData.js file and we will use this to create our first entry. 

```js
{
    "title": "Instagram Quotes",
    "image": "https://res.cloudinary.com/jkeohan/image/upload/v1582134376/Screen_Shot_2020-01-30_at_8.57.12_AM_cnrvug.png",
    "description": "Add project description here..."
}
```

Clicking on **Create Item** we can assign the **Primary Key** a new value.  For the sake of simplicity we will assign the item a value of **project_123**.  Later we will use another means of creating a unique key but for now this will do. 

<img src="https://i.imgur.com/rkQmCjm.png">

Add now it's just a matter of **Appending** additional keys based, choosing a data type and the assigning a value. 

<img src="https://i.imgur.com/7B9Ngq8.png" width=300/>

Once complete the item should look like the image below. 

<img src="https://i.imgur.com/GDpAj76.png">

Clicking on **Save** we should see our new item added to the DB

<img src="https://i.imgur.com/klBbRxz.png">

## Exercise - Manually Create The Following Items - 5min

```js
{
    "title": "CSS Grid Image Gallery",
    "image": "https://i.imgur.com/L9K6hli.png",
    "description": "Add project description here..."
},
{
    "title": "GA Press Release",
    "image": "https://i.imgur.com/V2BP6Nf.png",
    "description": "Add project description here..."
},
{
    "title": "Fashion Blog",
    "image": "https://i.imgur.com/orjmTFP.jpg",
    "description": "Add project description here..."
}
```

<!-- ### Accessing DynamoDB From Lambda

Since we will be accessing DynamoDB in a Lambda function we will need to use the [AWS SDK](https://aws.amazon.com/sdk-for-javascript/).  Since we will be using the JavaScript version of the SDK let's take a look at that documentation. 


Here we can see that there is an option to use it in **Node** so let's click on that option. 

<img src="https://i.imgur.com/W2k5vY9.png" width=500/>

The SDK however is already available in Lambda so no need to install it. 


<!-- <img src="https://i.imgur.com/hjJqcuv.png"> -->

### References 

- [DynamoDB Single Table Design](https://www.alexdebrie.com/posts/dynamodb-single-table/)
- [The DynamoDB Paper](https://www.dynamodbguide.com/the-dynamo-paper/)
- [DynamoDB & Node.js](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html)

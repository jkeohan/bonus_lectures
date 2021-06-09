Title: Intro To DynamoDB<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# AWS DynamoDB

<img src="https://i.imgur.com/Wmp6bps.png" width=700/> 



This lecture will focus on working with DynamoDB and will cover the following objectives:

- provide an introduction to DynamoDB 
- review primary key options
- creating tables and adding rows of data



## AWS DynamoDB

Amazon DynamoDB is a NoSQL Database that uses key-values to create and manage entries and offers the following benefits:

- delivers single-digit millisecond performance at any scale
- it's a fully managed, multi-region, multi-active, durable database with backup and restore, and in-memory caching for internet-scale applications. 
- it can handle more than 10 trillion requests per day and can support peaks of more than 20 million requests per second.

Many of the world's fastest growing businesses such as Lyft, Airbnb, and Redfin as well as enterprises such as Samsung, Toyota, and Capital One depend on the scale and performance of DynamoDB to support their mission-critical workloads.

<!-- <img src="https://i.imgur.com/sJgLXRl.png"> -->

<!-- <img src="https://i.imgur.com/ldOTWqq.png"> -->

## Items and Item Collections

DynamoDB stores data using a single **item** or as an **item collection**. The difference is between using only a **Partition Key** or a combination of **Partition Key** + **Sort Key**. 

### An Item
An **item** in DynamoDB refers to a single entry that is referenced using only a **Primary Key** composed of a **Partition Key**.

<img src="https://i.imgur.com/AxjGVug.png" >

Every table we've encountered thus far using **Mongo** or **Postgresql** has created items using the same pattern.  **Mongo** organized data into **Collections** and  **Postgresql** as tables with both using some form of an **id** field as the primary key. 



A DynamoDB wtable here an item make use of a **Primary Key** composed of a **Partition Key** only will resemble both **Mongo** or **Postgresql** and would look like the following: 

<img src="https://i.imgur.com/iLbf8X6.png">

### An Item Collection


Since DynamoDB is a NoSQL Database it doesn't have relational tools like the join operations used in **Postgresql**.  Mongo was able to overcome this with creating **references** and then using the **.populate()** method to retrieve items in another collection, however DynamoDB cannot be configured so.

The basic approach to setting up DynamoDB for such a relationship would be to put itemss into different tables according to their type and then make multiple requests to fetch both the those items.

<img src="https://i.imgur.com/cXQNw1k.png">

In order to create those kinds of relationships DynamoDB stores all data points for the item as an  **item collection**.  This is done using a combination of **Partition Key** + **Sort Key**. 

<img src="https://i.imgur.com/BmxMgUS.png">

In the example below, we have a DynamoDB table that contains actors and the movies in which they have played. The **primary key** is a composite primary key where the partition key is the actor’s name and the sort key is the movie name.

<img src="https://i.imgur.com/sSeYYZB.png">


## Free Tier

DynamoDB falls into the **Always Free** tier of services so lets take a look at their [free tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) page search for DynamoDB to confirm this is still the case.  



<img src="https://i.imgur.com/HuIKHvJ.png" >
<br>
<br>

Although DynamoDB is a free service we still must be conscious of when we exceed those limits otherwise we will incur charges.  We won't have to worry about that for our current implementation. 


<img src="https://i.imgur.com/oWyQYHk.png">


It should be mentioned that cost is measured across all tables for all Regions so the more tables you create the greater chance you have of exceeding the free tier. 


<!-- <img src="https://i.imgur.com/6JAOefX.png"> -->

<!-- <img src="https://i.imgur.com/yBbGBPQ.png"> -->

<!-- <img src="https://i.imgur.com/sJgLXRl.png"> -->

### Creating A DynamoDB Table

Let's get started with creating our first DynamoDB table by clicking on the big orange button. 

<img src=https://i.imgur.com/lD1OpKf.png >

This takes us to the DynamoDB services page where we can create tables and manage the DynamoDB database.  

Click on **Create table**.

<img src="https://i.imgur.com/6kMrAyL.png">

We will add a **Table Name** and a **Primary Key**.  The **Primary Key**, like all databases, will be unique for each entry in the DB.  

<!-- <img src="https://i.imgur.com/AxjGVug.png" width=500> -->

<!-- <img src="https://i.imgur.com/BPVzVtf.png"> -->

Here we will assign the **Primary Key** a name of **ProjectId** and of type **String**. 

<img src="https://i.imgur.com/lV90zBp.png">

We should make note of the **Read and Write** capacity units.  This allows us to determine and assign resources based on how the DB will be used.  This is an important concept in DynamoDB and will need to be calculated for both performance and cost. We will leave the defaults as they are. 

<img src="https://i.imgur.com/WsmezJD.png">




Once the table is created and we should be presented with the following tabs to configure the table. 


<img src="https://i.imgur.com/xMPuhNO.png">



### Create A New Item 
<!-- 
When we first add a new item we will have to decide the name of the **Primary Key** which is almost always the **Partition Key**.  -->

<!-- <img src="https://i.imgur.com/AxjGVug.png"> -->

Let's add a new item to the table.  This is one of the project entries we will use this to create our first entry and it's data structure is what we configured as the **Model** in the API Gateway. 

```js
{
    "title": "Instagram Quotes",
    "image": "https://i.imgur.com/bu033fA.jpg",
    "description": "Add project description here..."
}
```

Clicking on **Create Item** tab we can assign the **ProjectId** a value.  For the sake of simplicity we will assign the item a value of **project_1**.  Later we will use another means of creating a unique key but for now this will do. 

<img src="https://i.imgur.com/KIJ8S3q.png">

Now it's just a matter of **Appending** additional keys based, choosing a data type and the assigning a value. 

<img src="https://i.imgur.com/6knMhB8.png" width=300/>

Once complete the item should look like the image below. 

<img src="https://i.imgur.com/iisJCyN.png">

DynamoDB provides us 2 additional ways to view the item. If we click the drop down and change it from **Item** to **Text** we will see the item displayed as an object. 

<img src="https://i.imgur.com/Tqljj1J.png">

Clicking on the **DynamoDB JSON** check box will change the display to the following format.  This format is important and is how we will need to structure our data when we use the AWS SDK to create an item.  This is also the format that DynambDB will return any data received via the SDK. 

<img src="https://i.imgur.com/vMiKlAV.png">

Clicking on **Save** we should see our new item added to the DB

<img src="https://i.imgur.com/swYOUVS.png">

## Exercise - Manually Create The Following Items - 5min

Perform the same steps create the items below and follow the same pattern as before. 

```js
{
    "projectId": "project_2",
    "title": "CSS Grid Image Gallery",
    "image": "https://i.imgur.com/L9K6hli.png",
    "description": "Add project description here..."
},
{
    "projectId": "project_3",
    "title": "GA Press Release",
    "image": "https://i.imgur.com/V2BP6Nf.png",
    "description": "Add project description here..."
},
{
    "projectId": "project_4",
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

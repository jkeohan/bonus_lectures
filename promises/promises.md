Title: Intro to State<br>
Duration: 1 - 1.5 hrs+ <br>
Creator:  Joe Keohan<br>

---

# Promises

JavaScript is single threaded. This means that two bits of script cannot run at the same time; they have to run one after another. However, there are times that code needs to run asynchronously.  In order to achieve this ES6 introduced the Promise class which has now become a key underlying feature used in many of the tools we've become accustomed to using to perform everyday tasks such as making API calls or updating database entries. 

### What Is A Promise? 

A promise is an object that may produce a single value some time in the future.  A promise can be in one of three states:

- pending - The action has not yet been resolved or rejected 
- resolved - The action relating to the promise succeeded 
- rejected - The action relating to the promise failed

While the promise is active it is in a `pending` state and at some point will be either `resolved` or `rejected`.

<!-- <img src="https://i.imgur.com/SSOowm5.png" alt="" width=300> -->
<img src="https://i.imgur.com/rNg3OkS.png" alt="" width=300>


### Creating A Promise

Creating a promise involves instantiating a new instance of the ES6 `Promise class`.  The Promise takes in a callback with 2 arguments: 

- `resolve`
- `reject`

They are both predefined methods within the Promise object which it will use to update it's state.

Let's create a new Promise in a state of `pending` which includes a console log

```js
const promisePending = new Promise((resolve, reject) => {
  // either resolve or reject must be called at some point. 
});

console.log('promisePending - ', promisePending)
```

We should see the following:

<img src="https://i.imgur.com/xJKX2PB.png" alt="" width=300>

As we can see the `[[PromiseStatus]]` is `pending` and the `[[PromiseValue]]` is `undefined`.  

The `PromiseValue` will not change until we call either the `resolve()` or `reject()` methods.

### A Promise Resolved

Let's create a Promise that resolves itself.  In order to simulate the asynchronous nature of a Promise let's add a `setTimeout` to force the code to wait 1 sec in order to emulate running a task that may take time to complete.  

```sh
const promiseResolved = new Promise((resolve, reject) => {
  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 3000);
});

console.log('promiseResolved - ', promiseResolved)
```

<img src="https://i.imgur.com/weNEoQl.png" alt="" width=300>

Here is the resolved promise however `[[PromiseStatus]]` is still `pending` and the `[[PromiseValue]]` is `undefined`.  

Let's try outputting the variable once more and see if anything has changed.

<img src="https://i.imgur.com/Lixg2Zj.png" alt="" width=300>


It seems that `[[PromiseStatus]]` is `resolved` and the `[[PromiseValue]]` is set to `done`, which was the value passed to the the resolve method. 

### A Promise Rejected

In the same fashion let's emulate a `rejected` promise.

```sh
let promiseRejected = new Promise((resolve, reject) => {
  // after 1 second signal that the job is done with the result "resolved"
  setTimeout(() => reject("resolved"), 3000);
});

console.log('promiseRejected - ', promiseRejected)
```

Of course we should encounter the same issue as before.

<img src="https://i.imgur.com/zh5EWHe.png" width=300/>

If wait 3 seconds and call the variable again we should see:

<img src="https://i.imgur.com/0VshJbf.png" width=300/>

Here is the rejected promise and now the `[[PromiseStatus]]` is `rejected` and the `[[PromiseValue]]` is set to `done`, which was the value passed to the the reject method. 

The Promise will terminate immediately once resolve() or reject() have been called.  Its much like calling the `return` keyword in a function. 

In the example below both reject() and setTimeout() are ignored once resolve() has been called. 

```sh
let promise = new Promise((resolve, reject) => {
  resolve('resolved);

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
```

<img src="https://i.imgur.com/sTVPtKS.png" alt="" width=300>

### Handling A Promise

The Promise will be expected to return some value from either the resolve or reject methods which make use of the following methods:

- **.then()** - works with a resolved promise
- **.catch()** - works with a rejected promise
- **.finally()** - will execute some code regardless

A resolved promise uses `.then()` to handle the data returned via the promise.  Its like saying "I promise that when the thing is done then you can do the thing" 

#### Resolved

```sh
promiseResolved.then( val => console.log('val', val))

=> resolved
```

A rejected promise uses `.catch()` to handle any errors returned via the promise.

#### Rejected

```sh
promiseRejected.catch( val => console.log('val', val))

=> rejected
```

Any resolved or rejected promise can make use of `.finally()` to perform any final action at the end of the promise. 

```sh
promiseRejected
    .then( val => console.log(val))
    .catch( val => console.log(val))
    .finally( () => console.log('finally'))

=> rejected
=> finally
```

#### Chaining Methods

Quite often the return values of a promise are passed to other `.then()` methods that perform some additional task.  

```
let promise = new Promise( (resolve, reject) => {
  resolve(1);
});

promise.then( (val) => {
  console.log('first then:', val); // 1
  return val + 2;
}).then( (val) => {
  console.log('second them:', val); // 3
})
```


### Making An API Call

One of the most common use cases of using promises is when making an API call. Since making a request to an external server will take time we will need to wait for the request to either return the data (resolve) or notify us that there has been an error (reject). 

When we make use of common API tools that retrieve data such as `fetch`, `axios` or `$.ajax` the tool itself is making an underlying XHR request.  All of these tools incorporate a Promise that calls `resolve()` to pass the response data along to the first `then` or `reject()` to pass the error along to `catch()`.

Here is an example of using fetch:

```sh
let someUrl = 'https://pokeapi.co/api/v2/pokemon'

fetch(someurl)
 .then( res => res.json())
 .then( data => console.log('data', data))
 .catch(err => console.log('err', err))
```

In order to get a better understanding of how a Promise is being used under the hood let's write our own `fetcher` function that makes an XHR request.  

### Bonus #1: Writing Our Own Fetcher()

Up to this point you might have used only $.ajax() to make an API request.  But there are other tools that perform the same functionality.  JavaScript has it's own built-in Fetch API which has become the new standard to make server requests. 

For our example we will recreate the $.ajax()/fetch() functionality by building our own `fetcher` function. It makes use of an XHR request and has several helper methods such as `.open()`, `send()` and `onload()`.  We will not go into any depth on XHR and so for now just copy/paste the code below. 

```js
const fetcher= (url) => {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      let data = JSON.parse(xhr.responseText);
      console.log('request successful', data)
    } else {
      console.log('The request failed!');
    }
  };
  xhr.open('GET', url);
  xhr.send();
}
```

If the call is successful we should see something similiar to the following:

```
fetcher('https://pokeapi.co/api/v2/pokemon')

{ count: 964,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: 
   [ { name: 'bulbasaur',
       url: 'https://pokeapi.co/api/v2/pokemon/1/' },
 ...
```

But what if instead of the console we wanted to work with the data outside of fetcher.  Based on what we know about functions we would most likely try to `return` the data and store in a variable or just pass it internally to another function.  Let's try the first route and attempt to return the data.

```js
const fetcher= (url) => {
  let xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      let data = JSON.parse(xhr.responseText);
    //   console.log(data)
      return data
    } else {
    //   console.log('The request failed!');
      return 'The request failed!'
    }
  };
  xhr.open('GET', url);
  xhr.send();
}
```

This however doesn't seem to work as we get `undefined` as the returned result. 

```js
let results = fetcher('https://pokeapi.co/api/v2/pokemon')
console.log('results', results)

=> results undefined
```

Now you can add a few more returns here and there to test and see if you can force fetcher to return the data but this will be all in vain.  

Instead let's refactor to include a Promise.  Besides instantiating a new instance of a Promise we must also carefully place `resovle` and `reject` so that the Promise returns something. 

```js
const fetcher = (url) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject('The request failed!')
      }
      console.log('This always runs...');
    }
    xhr.open('GET', url);
    xhr.send();
  });
}
```

Calling fetcher now allows us to work with the returned value but only via `.then()`. 

```
fetcher('https://pokeapi.co/api/v2/pokemon')
  .then(data => data.results.map(d => d.name))
  .then(data => console.log('data', data))
  .catch(err => console.log('err', err))
```

### Bonus #2: Resolving Multiple Promises

There are times when there is a need to make multiple API calls and work with the data sets once they have all been retrieved.  In an instance like that we can use the `Promise.all()` method.  Here we can pass in an array of promises and when all of them have been resolved (or one fails), it will run either `.then()` or `.catch()` accordingly. 

```js
Promise.all([
	fetch('https://jsonplaceholder.typicode.com/posts'),
	fetch('https://jsonplaceholder.typicode.com/users')
]);
```

`Promise.all()` returns a single array with two elements representing the response data. To get a JSON object from each one, we can map over the array and call `.json()`.  We also need to wrap that in `Promise.all()`, since `.json()` returns a promise as well.

The data argument in our second `then()` callback is now an array of API data, with each item matching the corresponding API call in the Promise.all() array. In this example, the data[0] represents posts and data[1] users.  We've spliced out the first elements only in each array to limit the console log display. 

```js
Promise.all([
	fetch('https://jsonplaceholder.typicode.com/posts'),
	fetch('https://jsonplaceholder.typicode.com/users')
]).then( responses => {
	return Promise.all(responses.map( response => {
		return response.json();
	}));
}).then( data => {
	console.log('posts', data[0].slice(0,1));
        console.log('users', data[1].splice(0,1));
}).catch( error => {
	console.log(error);
});
```

#### Additional Promise.all() Examples

##### Handling Multiple API Calls

 In the below example the app first needs to pull mapping data so that a map can be rendered first and then specific location markers placed on the based on their lat/lon addresses. 

Lets take a look the app: [D3 - Streetball Mecca - Map Only](https://codepen.io/jkeohan/project/editor/DKzvyL)


```js
let mapJSON =
  "https://raw.githubusercontent.com/jkeohan/D3-Tutorials/master/Mapping/nyc.json";
let parks =
  "https://spreadsheets.google.com/feeds/list/14eiNG7WWDDrN-OY4RfbPJjlhu3hJnWQtVJ3s4ZUKOuo/od6/public/values?alt=json";

Promise.all([fetch(mapJSON), fetch(parks)])
  .then(function(responses) {
    return Promise.all(
      responses.map(function(response) {
        return response.json();
      })
    );
  })
  .then(function(files) {
    renderMap(files[0]);
    renderMapCircles(files[1].feed.entry);
  });
```

##### Cascade Delete Using Mongoose

This is an example of using `mongoose` to perform a cascade delete and map over an array of users that have a reference to a specific role id and remove the role from the users roles array prior to removing the role from the db. 

```db
RoleSchema.post("remove", document => {
  const roleId = document._id;
  User.find({ roles: { $in: [roleId] } }).then(users => {
    Promise.all(
      users.map(user =>
        User.findOneAndUpdate(
          user._id,
          { $pull: { roles: roleId } },
          { new: true }
        )
      )
    );
  });
});
```


### Resources

#### Promises

- [javascript.info - promise-basics](https://javascript.info/promise-basics)
- [waiting-for-multiple-all-api-responses-to-complete](https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/)
- [javascript-promises-the-definitive-guide](https://www.nearform.com/blog/javascript-promises-the-definitive-guide/)
- [Inteview Questions - Promises](https://levelup.gitconnected.com/javascript-interview-questions-promises-400c51805cbe)

#### XHR

- [how-to-get-data-with-javascript](https://medium.com/@mattburgess/how-to-get-data-with-javascript-in-2018-f30ba04ad0da)
- [http-requests-xhr](https://attacomsian.com/blog/http-requests-xhr)
- [ajax-and-apis-with-vanilla-javascript](https://gomakethings.com/ajax-and-apis-with-vanilla-javascript/)

#### Mongoose

- [cascade delete using mongoose](https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap)

// LINK TO REPL: https://repl.it/@jkeohan/seair-831-promises-lecture#main.js

//////////////////////////
// PROMISE PENDING
//////////////////////////
// const promisePending = new Promise( (resolve,reject) => {
  
// })
// console.log('promisePending - ', promisePending)

//////////////////////////
// PROMISE RESOLVED
//////////////////////////

// let promiseResolved = new Promise( (resolve, reject) => {
//   setTimeout(() => resolve({key:'data'}), 3000)
// })
// console.log('promiseResolved - ', promiseResolved)

// console.log('this runs before .then')
// promiseResolved.then( (val) => {
//   // renderCards(val)
//   console.log('val is:', val) 
// })
// console.log('this runs after .then')

//////////////////////////
// PROMISE REJECTED
//////////////////////////

// let promiseRejected = new Promise( (resolve, reject) => {
//   setTimeout( () => reject('you have been rejected'), 3000)
// })
// console.log('promiseRejected - ', promiseRejected)

// promiseRejected
// // .then only runs if the promise is resolved
//   .then( val => console.log('val') )
// // .catch only runs if the promise is rejected
//   .catch( err => console.log('this is err:', err) )
// // .finally will run regardless of resolve/reject
//   .finally( () => console.log('this is finally'))


//////////////////////////
// WORKING WITH RESOLVED PROMISES
//////////////////////////

// let promise = new Promise( (resolve, reject) => {
//   resolve(1)
// })


// promise.then( (val) => {
//   console.log('first then:', val)
//   return val + 2
// }).then( (val) => {
//   console.log(('second then:', val))
// })

//////////////////////////
// $.AJAX() EXAMPLE OF PROMISES
//////////////////////////

// $.ajax(googleUrl)
  // .then((val => {
  //   // format the data
  //   // pass the data to the renderCards function
  //   // OR return data and call that function in the next then
  // }).then( val => {
  //   // pass the data to the renderCards function
  // })

//////////////////////////
// RECREATE FETCH TOOL
//////////////////////////

// in unit 2 we will be using a new API tool to retrieve data called: fetch

//   const fetcher = (url) => {
//     return new Promise( (resolve, reject) => { 
//       let xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         if (xhr.status >= 200 && xhr.status < 300) {
//           resolve(JSON.parse(xhr.responseText));
//           // console.log(data)
//         } else {
//           reject('The request failed!');
//         }
//       };
//       xhr.open('GET', url);
//       xhr.send();
//     })
// }

// fetcher('https://pokeapi.co/api/v2/pokemon')
// .then(data => data.results.map(d => d.name))
// .then(data => console.log('data', data))

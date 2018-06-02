## RESTful Design and APIs

## Pre-reading

* [Restful Design Architecture](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming)
* [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
* [JSON](https://www.w3schools.com/js/js_json_intro.asp)
* [What is an API?](https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82)

## Questions

* What's the difference between GET, POST, PUT, DELETE? When do you use each?
* How do CRUD and REST relate?
* Why is JSON represented as a string?
* Why do you think we are using JSON instead of XML?

# Challenge

Today we are going to create an API for a todo list application. That is, we are creating a server that sends and receives HTTP requests. Instead of using a browser, we'll be using [Postman](https://www.getpostman.com/) to send and receive JSON web requests.

## Release 0

[Here](https://github.com/toddmotto/public-apis) is a list of a number of free APIs. Sign up for one and use Postman to query it. 

## Release 1

Using RESTful design architecture, sketch out the RESTful routes and CRUD operations needed to perform the following operations in our todo app:

* get all todos.
* get a single todo by an id.
* get all completed todos.
* get all uncompleted todos.
* add a new todo.
* delete a todo by id.
* mark a todo as complete by id.
* update the text of a todo by id.

## Release 2

In `server.js` implement the following:

* A Mongoose schema for a Todo model.
* All of the routes you defined in _Release 1_.
* Use Postman to test your server.

Once completed with Release 2 you should have a fully functional todo list API. Woohoo!

## Release 3

Most APIs require the developer pass an authKey in with each request. This allows the API owner to control who can and can't use the api and keep track of usage. As a stretch exercise, implement auth into your api.

const mongoose = require("mongoose");
// Connection URL
// TODO Define a schema for Todos
var TodoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      maxlength: 100
    },
    completedOn: {
      type: Date
    },
    createdOn: {
      type: Date
    }
  }
);
mongoose.model('Todo', TodoSchema);
// Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//   // Get the documents collection
//   const collection = db.collection('todos');
  // Insert some documents
  /*for(let i=0; i<20000; i++){
      var randomDescription = faker.lorem.words();
        var randomCompletedOn = faker.date.future();
        var randomCreatedOn = faker.date.past();
        collection.insert({description: randomDescription, completedOn: randomCompletedOn, createdOn: randomCreatedOn});
  }*/

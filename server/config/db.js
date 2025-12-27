const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://prem7456:Xxxrt19987524@cluster1.biu6bh6.mongodb.net/ecommerce?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}

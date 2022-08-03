const mongoose = require('mongoose');
const url = "mongodb+srv://test:test@arhamcluster.vet6e.mongodb.net/arhamDb?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Success");
}).catch(()=>{
    console.log("No Connection");
});
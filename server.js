const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Authenticate = require("./routes/Auth");
const Booking = require("./routes/Bookmark");

const app = express();
const port = 3000;
const secret = "stickey_app";


app.use('/api/auth',Authenticate);
app.use('/api/bookmark', Booking);


app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://shyam18:shyamkumar18@cluster0.wlav0xw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
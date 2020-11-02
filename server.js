require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Transcation = require("./model/transcationSchema");
const { default: Axios } = require("axios");
const https = require('https');


const app = express();

//Middlewares
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());


const port = 5000;

// db connection
const dbURI =
  `mongodb+srv://starprince:${process.env.PASSWORD_DB}@starprince.m9v4i.mongodb.net/Data-ecommerce`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false
  })
  .then((result) => {
    console.log("Connected to the Database!...");
    app.listen(5000, "0.0.0.0", () => {
      console.log(`Server is live on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  console.log("req just came in ");
  res.send("HELLO WORLD");
});

// Order Post request!
app.post("/order", async (req, res) => {

  const { cart, subTotal } = req.body;
  try {
    const order = await Transcation.create({
      cart,
      amount: subTotal,
    });
    order && res.status(201).json(order);
    order && console.log('Items From the DataBase!...',order)
  } catch (error) {
    console.log(error);
  }
});

// Upade the Order, with the remaining details from this very Post request!
app.post("/customer-info", async (req, res) => {

  try {
    const order = await Transcation.findByIdAndUpdate(
      req.body.orderId,
      req.body, {new: true}
    );
    order && res.status(201).send("success");
    order && console.log('From Updatde Transcation', order)
  } catch (error) {
    console.log(error);
  }
});

// Get req for the initialized transcation
app.post("/payment", async (req, res) => {
  console.log('From Payment route.',req.body.id)
  try {
    const items = await Transcation.findById(req.body.id);
    items && console.log('details for front end', items)
    items && res.status(200).send(items)
  } catch (error) {
    res.status(400)
    console.log(error);
  }
});

// Route To verify Paystack Transcation 
app.get('/verify-transcation/:ref', (req, res) => {
  console.log('Request To Verify Paystack Payment Came  In....')
  const ref = req.params.ref
  console.log('Ref: ',ref)
 /*  const options = {
    headers: {
      Authorization: 'sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9'
    }
  } */

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: `/transaction/verify/${ref}`,
    method: 'GET',
    headers: {
      Authorization: 'sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9'
    }
  }

  https.request(options, response => {
    let data = ''

    response.on('data', (chunk) => {
      data += chunk
    });

    response.on('end', () => {
      res.send(JSON.parse(data))
      console.log(JSON.parse(data))
    })

  }).on('error', error => {
    console.error('Error In Verifying Paystack Payment',error)
  })
})
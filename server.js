require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Transcation = require("./model/transcationSchema");
const Axios = require("axios");
const ejs = require('ejs')

const app = express();

//Middlewares
app.use(express.json());

const port = process.env.PORT || 5000;

// db connection
const dbURI = `mongodb+srv://starprince:starprince7@starprince.m9v4i.mongodb.net/Data-ecommerce`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    console.log("Connected to the Database!...");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is live on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Serving Static files to the Client
if (process.env.NODE_ENV === "production") {
  // Make the Client files Public
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    console.log("req just came in to load up React client/Build files ");
    res.sendFile("./client/build/index.html", { root: __dirname });
  });
}

// Order Post request!
app.post("/order", async (req, res) => {
  const { cart, subTotal } = req.body;
  try {
    const order = await Transcation.create({
      cart,
      amount: subTotal,
    });
    order && res.status(201).json(order);
    order && console.log("Items From the DataBase!...", order);
  } catch (error) {
    console.log(error);
  }
});

// Upade the Order, with the remaining details from this very Post request!
app.put("/customer-info", async (req, res) => {
  try {
    const order = await Transcation.findByIdAndUpdate(
      req.body.orderId,
      req.body,
      { new: true }
    );
    order && res.status(201).send("success");
    order && console.log("From Updatde Transcation", order);
  } catch (error) {
    console.log(error);
  }
});

// Get req for the initialized transcation
app.post("/payment", async (req, res) => {
  console.log("From Payment route.", req.body.id);
  try {
    const items = await Transcation.findById(req.body.id);
    items && console.log("details for front end", items);
    items && res.status(200).send(items);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
});

// Route To verify Paystack Transcation
app.get("/verify-transcation/:ref", async (req, res) => {
  console.log("Request To Verify Paystack Payment Came  In....");
  const ref = req.params.ref;
  console.log("Ref: ", ref);

  // Get Transcation details from the Database Here!
  const Receipt_details = await Transcation.findById(ref)
  Receipt_details && console.log('This is the New Receipt Details:', Receipt_details)

  const options = {
    headers: {
      Authorization: `Bearer sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9`,
    },
  };

  const nodemailer = require("nodemailer");
  const nodemailGun = require("nodemailer-mailgun-transport");

  const auth = {
    auth: {
      api_key: "05de05c7aa84acab9a4c8b665692517c-2af183ba-41c8acf9",
      domain: "sandbox0fea1f853ea44ca199a270a246db3d42.mailgun.org",
    },
  };

  const transport = nodemailer.createTransport(nodemailGun(auth));

  const mailOptions = {
    from: "rexxrandolph@gmail.com",
    to: "princeagezinweke@gmail.com",
    subject: `Your Konga Clone Order ${ref} has been confirmed.`,
    text: "testing mailgun on my react application",
  };


  try {
    const response = await Axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      options
    );
    response &&
      console.log("SUCCESS! in verifying Payment...", response.data.data);
    
    // Send mail here!
    if (response) {
        ejs.renderFile(__dirname + "/mail/mail.ejs", { order: Receipt_details })
          .then(data => {
              const mailOptions = {
                  from: 'rexxrandolph@gmail.com',
                  to: Receipt_details.email,
                  subject: 'Konga Clone Receipt!!!',
                  html: data
              }

              transport.sendMail(mailOptions)
              .then(success => console.log("MESSAGE SENT!!!"))
              .catch(err => console.log("ERROR OCCURED!!!"))
          })
          .catch(error => console.log("ERROR CANNOT RENDER EJS TEMPLATE!!!===============", error))

    }

    response && res.send({ msg: "Payment Verified!" });
  } catch (error) {
    console.error("Error In Verifying Paystack Payment", error);
  }


});

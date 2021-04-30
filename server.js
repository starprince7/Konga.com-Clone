const express = require("express");
const mongoose = require("mongoose");
const Axios = require("axios");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Transcation = require("./model/transcationSchema");
const Customer = require("./model/customers");
const requireAuth = require("./middleware/auth");
require("dotenv").config();

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

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

  // app.get("*", (req, res) => {
  //   console.log("req just came in to load up React client/Build files ");
  //   res.sendFile("./client/build/index.html", { root: __dirname });
  // });

// Serving Static files to the Client
if (process.env.NODE_ENV === "production") {
  // Make the Client files Public
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    console.log("req just came in to load up React client/Build files ");
    res.sendFile("./client/build/index.html", { root: __dirname });
  });
}

// Error Handling
const handleErrors = (error) => {
  let refErrors = {
    email: "",
    password: "",
  };

  if (error.code === 11000) {
    refErrors.email = "This email is already registered!";
  }

  if (error.message.includes("Customer validation failed")) {
    // log(Object.values(error.errors))
    Object.values(error.errors).forEach(({ properties }) => {
      refErrors[properties.path] = properties.message;
    });
  }
  return refErrors;
};

const maxAge = 24 * 60 * 60;

// Craete Token here!
const createToken = (id) => {
  return jwt.sign({ id }, "mysecret", { expiresIn: maxAge });
};

// Signup post request here!
app.post("/signup", async (req, res) => {
  // console.log('The Login details came in here ====', req.body)
  try {
    const customer = await Customer.create(req.body);
    customer && console.log(customer);
    const token = createToken(customer._id);
    customer && res.cookie("jwt", token);
    customer && res.status(200).json({customer});
  } catch (err) {
    const error = handleErrors(err);
    // console.log('Err Occured! ====', err)
    res.json({error});
    console.log("Err Occured! ====", error);
  }
});

// Login post request here!
app.post("/login", async (req, res) => {
  console.log("The Login request came in =====", req.body);

  const { email, password } = req.body;
  try {
    const user = await Customer.login(email, password);
    const token = createToken(user._id);
    user && res.cookie("jwt", token);
    user && res.status(201).json({user});
  } catch (err) {
    res.json({ error: err.message });
    console.log("Err Occured in Login ====", err.message);
  }
});

// checking cookie!
app.get("/cookie", requireAuth, (req, res) => {
  console.log("Req made for Cookie!!!");
  console.log("Cookies just came in ====", req.cookies);
  res.send("check cookie route!");
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
  const Receipt_details = await Transcation.findById(ref);
  Receipt_details &&
    console.log("This is the New Receipt Details:", Receipt_details);

  const options = {
    headers: {
      Authorization: `Bearer sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9`,
    },
  };

  const nodemailer = require("nodemailer");
  const nodemailGun = require("nodemailer-mailgun-transport");

  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
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
      ejs
        .renderFile(__dirname + "/mail/mail.ejs", { order: Receipt_details })
        .then((data) => {
          const mailOptions = {
            from: "rexxrandolph@gmail.com",
            to: Receipt_details.email,
            subject: "Konga Clone Receipt!!!",
            html: data,
          };

          transport
            .sendMail(mailOptions)
            .then((success) => console.log("MESSAGE SENT!!!"))
            .catch((err) => console.log("ERROR OCCURED!!! =========", err));
        })
        .catch((error) =>
          console.log(
            "ERROR CANNOT RENDER EJS TEMPLATE!!!===============",
            error
          )
        );
    }

    response && res.send({ msg: "Payment Verified!" });
  } catch (error) {
    console.error("Error In Verifying Paystack Payment", error);
  }
});

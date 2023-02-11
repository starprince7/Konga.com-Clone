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



const getBanks = async () => {
  console.log("Getting Banks...")

  const options = {
    headers: {
      Authorization: `Bearer sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9`, /* sk_live_0f002e93d3456a7e0aaa8d54073a6b65525aef9f */
    },
  };

  try {
    const res = await Axios.get("https://api.paystack.co/bank", options)
    res && console.log("Response of Banks from Paystack --->", res.data)
  } catch (e) {
    console.log("Err! getting banks", e.message)
  }
}

const makeTransfer = async () => {
  // console.log("Making a single transfer...")
  console.log("Making a single transfer (POST)...")

 /*  const params = JSON.stringify({
    "type":"nuban",
    "name" : 'Prince Agezichukwu Nweke',
    "account_number": "2009062964",
    "bank_code": "50211",
    "currency": "NGN"
  }) */

  const params = JSON.stringify({
    "source": "balance",
    "amount": 1000000,
    "account_number": "2009062964",
    "bank_code": "50211",
    "reason": "Holiday Flexing"
  })

  const options = {
    body: params,
    headers: {
      Authorization: `Bearer sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9`,
      'Content-Type': 'application/json'
    },
  };

  const kuda_acct_no = "2009062964"
  const kuda_bnk_code = "50211"
  const url = `https://api.paystack.co/bank/resolve?account_number=${kuda_acct_no}&bank_code=${kuda_bnk_code}`
  const url2 = "https://api.paystack.co/transferrecipient"
  const url3 = "https://api.paystack.co/transfer"
  try {
    const res = await Axios.post(url3, options)
    res && console.log("Response of Bank Account from Paystack --->", res.data)
    res && console.log("Response of Bank Account from Paystack --->", res.data.recipient_code)
  } catch (e) {
    console.log("Err! making bank transfer.", e.message)
  }
}

const createReceiver = () => {
  console.log("Transfering fund...")

  const https = require('https')
   const params = JSON.stringify({
    "type":"nuban",
    "name" : 'Prince Agezichukwu Nweke',
    "account_number": "2009062964",
    "bank_code": "50211",
    "currency": "NGN"
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transferrecipient',
    method: 'POST',
    headers: {
      Authorization: `Bearer sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9`,
      'Content-Type': 'application/json'
    }
  }
  const req = https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      console.log("Data gotten from paystack ===->", JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  req.write(params)
  req.end()
}

const transferFund = () => {
  console.log("Transfering... Scary!")
  
  const https = require('https')
  const params = JSON.stringify({
    "source": "balance",
    "amount": 3794800,
    "recipient": 'RCP_5x545x1if368u13',
    "reason": "Holiday Flexing"
  })
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transfer',
    method: 'POST',
    headers: {
      Authorization: `Bearer sk_test_ae5a8f1422658ab701bcc4cbcb6df61e7be39dc9`,
      'Content-Type': 'application/json'
    }
  }
  const req = https.request(options, res => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    });
    res.on('end', () => {
      console.log("Success! funds transferd.", JSON.parse(data))
    })
  }).on('error', error => {
    console.error(error)
  })
  req.write(params)
  req.end()
}

const getBalance = async () => {
  console.log("Getting Balance...")

  const https = require('https')
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/balance',
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_live_0f002e93d3456a7e0aaa8d54073a6b65525aef9f'  /* sk_live_0f002e93d3456a7e0aaa8d54073a6b65525aef9f */
    }
  }

  try {
    const res = await Axios.get("https://api.paystack.co/balance", options)
    console.log("Paystack Balance gotten", res.data)
  }
  catch (e) {
    console.log("ERR! Getting Balance", e)
  }

}

// getBanks()
// makeTransfer()
// createReceiver()
// transferFund()
getBalance()

/*
Data gotten from paystack ===-> {                       
  status: true,                                         
  message: 'Transfer recipient created successfully',   
  data: {                                               
    active: true,                                       
    createdAt: '2021-09-10T21:30:15.320Z',              
    currency: 'NGN',                                    
    domain: 'test',                                     
    id: 18050238,                                       
    integration: 526220,                                
    name: 'Prince Agezichukwu Nweke',                   
    recipient_code: 'RCP_0h5kg71lx16t9vo',              
    type: 'nuban',                                      
    updatedAt: '2021-09-10T21:30:15.320Z',              
    is_deleted: false,                                  
    details: {                                          
      authorization_code: null,                         
      account_number: '2009062964',                     
      account_name: 'Prince Agezichukwu Nweke',         
      bank_code: '50211',                               
      bank_name: 'Kuda Bank'                            
    }                                                   
  }                                                     
}                                                       
*/

/* {
  name: 'Zenith Bank',
  slug: 'zenith-bank',
  code: '057',
  longcode: '057150013',
  gateway: 'emandate',
  pay_with_bank: true,
  active: true,
  is_deleted: null,
  country: 'Nigeria',
  currency: 'NGN',
  type: 'nuban',
  id: 21,
  createdAt: '2016-07-14T10:04:29.000Z',
  updatedAt: '2021-06-01T11:01:30.000Z'
} */

/* {                                       
  name: 'United Bank For Africa',       
  slug: 'united-bank-for-africa',       
  code: '033',                          
  longcode: '033153513',                
  gateway: 'emandate',                  
  pay_with_bank: true,                  
  active: true,                         
  is_deleted: null,                     
  country: 'Nigeria',                   
  currency: 'NGN',                      
  type: 'nuban',                        
  id: 18,                               
  createdAt: '2016-07-14T10:04:29.000Z',
  updatedAt: '2021-06-19T09:49:44.000Z' 
}                                      */

/*
 {
  name: 'Kuda Bank',
  slug: 'kuda-bank',
  code: '50211',
  longcode: '',
  gateway: 'digitalbankmandate',
  pay_with_bank: true,
  active: true,
  is_deleted: false,
  country: 'Nigeria',
  currency: 'NGN',
  type: 'nuban',
  id: 67,
  createdAt: '2019-11-15T17:06:54.000Z',
  updatedAt: '2020-07-01T15:05:18.000Z'
    }, 
 */
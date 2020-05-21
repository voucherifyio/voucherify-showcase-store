require("dotenv").config();

const express = require("express");
const cors = require("cors");
const voucherifyClient = require("voucherify");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
let storeCustomers = require("./src/storeCustomers.json");

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3001", // REACT_APP_API_URL
    })
  );
}

const voucherify = voucherifyClient({
  applicationId: process.env.APPLICATION_ID,
  clientSecretKey: process.env.CLIENT_SECRET_KEY,
});

app.use(bodyParser.json());
app.use(
  session({
    store: new SQLiteStore({ dir: ".data" }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // month
  })
);

app.get("/init", async (request, response) => {
  if (request.session.views) {
    console.log(
      "[Re-visit] %s - %s",
      request.session.id,
      request.session.views
    );
    request.session.views++;
  } else {
    request.session.views = 1;
    console.log("[New-visit] %s", request.session.id);
    //Create new customers if this is a new session
    await Promise.all(
      storeCustomers.map((customer) => {
        customer.source_id = `${request.session.id}${customer.source_id}`;
        console.log(customer)
        voucherify.customers.create(customer);
      })
    );

  }
  response.json(request.session.id);
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/customer/:source_id", async (request, response) => {
  let source_id = request.params.source_id;
  try {
    const customer = await voucherify.customers.get(source_id);
    response.json(await customer);
  } catch (e) {
    console.error("[Fetching customer][Error] error: %s", e);
    response.status(500).end();
  }
});

app.get("/redemptions/:source_id", async (request, response) => {
  let source_id = request.params.source_id
  try {
    const redemptionLists = await voucherify.redemptions.list({
      customer: source_id,
    });
    response.json(await redemptionLists.redemptions);
  } catch (e) {
    console.error("[Fetching redemptions][Error] error: %s", e);
    response.status(500).end();
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your server is listening on port ${listener.address().port}`);
});

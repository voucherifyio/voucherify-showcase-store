require("dotenv").config();
const express = require("express");
const voucherifyClient = require("voucherify");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
let storeCustomers = require("./src/storeCustomers.json");
const debug = false;

const demostoreVersion = "DEMOSTORE_3"

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

app.get("/", (request, response) => {
  console.log("HELLO!!! does it work?");
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
  }
  response.sendFile(__dirname + "/build/index.html");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

const voucherify = voucherifyClient({
  applicationId: process.env.APPLICATION_ID,
  clientSecretKey: process.env.CLIENT_SECRET_KEY,
});

app.get("/create-customer/:source_id", async (request, response) => {
  let source_id = request.params.source_id;
  try {
    let customer = storeCustomers.find(customer => {return customer.source_id === source_id})
    customer.source_id = `${demostoreVersion}${customer.source_id}${request.session.id}`
    const createCustomer = await voucherify.customers.create(customer);
    response.json(createCustomer);
  } catch (e) {
    console.error("[Creating customer][Error] error: %s", e);
    response.status(500).end();
  }
});

app.get("/customer/:source_id", async (request, response) => {
  let source_id = `${demostoreVersion}${request.params.source_id}${request.session.id}`
  try {
    const customer = await voucherify.customers.get(source_id);
    response.json(customer);
  } catch (e) {
    console.error("[Fetching customer][Error] error: %s", e);
    response.status(500).end();
  }
});

app.get("/redemptions/:source_id", async (request, response) => {
  let source_id = `${demostoreVersion}${request.params.source_id}${request.session.id}`
  try {
    const redemptionLists = await voucherify.redemptions.list({ customer: source_id });
    response.json(redemptionLists.redemptions);
  } catch (e) {
    console.error("[Fetching redemptions][Error] error: %s", e);
    response.status(500).end();
  }
});

app.use(express.static("build"));

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

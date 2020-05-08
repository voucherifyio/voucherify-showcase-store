require("dotenv").config();
const express = require("express");
const voucherifyClient = require("voucherify");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

const debug = false;

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

app.get("/customers", async (request, response) => {
  try {
    console.log("[Fetching customers]");
    voucherify.customers.list().then((customers) => response.json(customers));
  } catch (e) {
    console.error("[Fetching customers][Error] error: %s", e);
    response.status(500).end();
  }
});

app.use(express.static("build"));

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

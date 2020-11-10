require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const enforce = require('express-sslify');
const distributionsRouter = require('./routes/distributions');
const promotionsRouter = require('./routes/promotions');
const redemptionsRouter = require('./routes/redemptions');
const ordersRouter = require('./routes/orders');
const customersRouter = require('./routes/customers');
const campaignsRouter = require('./routes/campaigns');
const startRouter = require('./routes/start');
const webhooksRouter = require('./routes/webhooks');
const qualificationsRouters = require('./routes/qualifications');
const productsRouter = require('./routes/products');
const vouchersRouter = require('./routes/vouchers');
const redisClient = redis.createClient(process.env.REDIS_URL);
const socketIo = require('socket.io');

if (process.env.NODE_ENV !== 'development') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

const sessionMiddleware = session({
	store: new RedisStore({ client: redisClient }),
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 1000 * 3600 * 24 * 30 },
});

app.use(
	sessionMiddleware,
	cors({
		credentials: true,
		origin: process.env.REACT_APP_URL,
	})
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000,
	})
);

app.use('/start', startRouter);
app.use('/promotions', promotionsRouter);
app.use('/redemptions', redemptionsRouter);
app.use('/orders', ordersRouter);
app.use('/customers', customersRouter);
app.use('/campaigns', campaignsRouter);
app.use('/vouchers', vouchersRouter);
app.use('/qualifications', qualificationsRouters);
app.use('/products', productsRouter);
app.use('/distributions', distributionsRouter);
app.use('/webhooks', webhooksRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'));
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve(__dirname + '/../build/index.html'));
	});
} else {
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, 'public', 'index.html'));
	});
}

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log(`[Server][Port] ${listener.address().port}`);
});

// setup for webhook listening. Don't @ me

const io = socketIo(listener);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

app.io = io;

io.on('connect', (socket) => {
	const session = socket.request.session;
	session.connections++;
	session.save();
});

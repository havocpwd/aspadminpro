const express = require('express')
const app = express()
const rateResponse = require('./rates/response');
const bodyParser = require('body-parser')
const cors = require('cors')
var corsOptions  = {
    origin:'*',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models')
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((response) => {
        console.log(`Database Connected! Successfull.`)
    })
    .catch((error) => {
        console.log(`Cannot connect to the database!`,error)
        process.exit()
    })

app.get('/api/rates', function (req, res) {
    rateResponse.response(res);
})

require('./routes/menu.routes')(app)
require('./routes/payment.routes')(app)
require('./routes/customer.routes')(app)
require('./routes/supplier.routes')(app)
require('./routes/currency.routes')(app)
require('./routes/uom.routes')(app)
require('./routes/visitor.routes')(app)
require('./routes/category.routes')(app)
require('./routes/product.routes')(app)
require('./routes/order.routes')(app)
require('./routes/orderdetail.routes')(app)
require('./routes/reports.routes')(app)

//handle production
if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/public/'))

    //handle SPA
    app.get(/.*/,(req,res) => res.sendFile(__dirname + '/public/index.html'));
}


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
const fs = require('fs');
const qs = require('qs');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

const client = require('./client.js');
const { PORT, CLIENT_ID, CLIENT_SECRET } = require('./settings.js');

const app = express();

app.use('/assets', express.static(__dirname + '/assets'));
app.use(bodyParser.json());

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

const allItems = JSON.parse(fs.readFileSync('data.json', 'utf8'));

app.get('/', (req, res) => {
  res.render('index', {
    items: allItems,
    priceDigits() {
      return this.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
  });
});

app.post('/total', async (req, res) => {
  try {
    const { data } = await axios.post('https://service-staging.invescore.mn/merchant/consumer/invoice', {
      amount: req.body.amount,
      consumerToken: req.body.consumerToken,
      info: 'Худалдан авсан барааны нэхэмжлэх',
    }, {
      headers: {
        Authorization: `Bearer ${client.accessToken}`,
      },
    });
    res.send({
      id: data.id,
      info: data.info,
      amount: data.amount,
      terminalId: data.terminalId,
    });
  }catch (e){
    console.log(e);
  }
});

app.post('/webhook', (req, res) => {
  const hook = {
    amount: req.body.amount,
    info: req.body.info,
    invoiceId: req.body.invoiceId,
    invoiceState: req.body.invoiceState,
    phoneNumber: req.body.phoneNumber
  };
  res.send(hook);
});

app.listen(4000, () => console.log(`App listening on ${PORT} port!`));

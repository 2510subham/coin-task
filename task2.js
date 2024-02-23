const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

// app.get('/pushInDb'    , async (req, res) => {


app.post('/price', async (req, res) => {
    console.log(req.body);
    let fromCurrency = req.body.fromCurrency;
    let toCurrency = req.body.toCurrency;
    let date = req.body.date;
    async function fetchPrice(fromCurrency, toCurrency, date) {
        // Your code to fetch the price
    }
    let price = await fetchPrice(fromCurrency, toCurrency, date);
    res.send({ price: price });

})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/company', async (req, res) => {
    console.log(req.body);
    let currencyName = req.body.currency;
    async function fetchCompany(currencyName) {
        let url = `https://api.coingecko.com/api/v3/companies/public_treasury/${currencyName}`;
        let response = await fetch(url);
        let data = await response.json();
        return data.companies;
    }
    let companyData = await fetchCompany(currencyName);
    console.log(companyData);
    res.json({ companies: companyData });
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const modelData = require('./model');
const cron = require('node-cron')
const { mongoose } = require('mongoose');
app.use(bodyParser.json());

const connection = async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
        console.log('Connected to Database');
        // const db = client.db('coinGecko');
        // const modelData = db.collection('coins');
    }).catch(error => console.error(error));
}

async function pushInDb() {
    let response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    let data = await response.json();
    data.map(async (coin) => {
        try {
            const existedcoin = await modelData.findOne({ id: coin.id })
            if (existedcoin) {
                console.log('Coin already exists in DB');
                return;
            }
            const res = new modelData(coin);
            res.save()
            await new Promise(r => { setTimeout(r, 800) })
        } catch (err) {
            console.log(err);
            return;
        }
        console.log(`Data inserted in DB`);
    })
    return data;
}
cron.schedule('0 * * * *', pushInDb);
app.listen(port, async () => {
    await connection();

    console.log(`Server is running at port ${port}`);
})

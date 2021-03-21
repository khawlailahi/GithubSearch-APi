const express = require('express');
const fetch = require('node-fetch');
const Redis = require('redis');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;
const client = Redis.createClient(REDIS_PORT);


//     ** Github Search API for user And for repositories ***

const userSearch = (user) => `https://api.github.com/search/users?q=${user}`
const repoSearch = (repo) => `https://api.github.com/search/repositories?q=${repo}`



//     ** This middleware validates the request body and checks the cache  before requesting from the API***
const checkCash = (req, res, next) => {

    /* validating the request body :
    valid request: {text: "the search name", type :"users or repositories"}
    exemple: {text:"khawla", type: "users"}
    */
    let validTypes = ['users', 'repositories']
    if (!req.body.text) {

        res.status(400).send({ err: 'Invalid input: You Must include a search text' })

    }

    else if (!req.body.type || !validTypes.includes(req.body.type)) {

        res.status(400).send({ err: 'Invalid input: You Must choose a search category: User or Repositories' })

    }
    else {
        const { text } = req.body
        const { type } = req.body

        //checking for response in the cache 
        /*
         cache schema :
            key : type:text 
                exemple: "users:khawla"
            value : data from API 
                type: string
         */
        client.get(`${type}:${text}`, (err, data) => {

            if (err) {
                console.log(err)
            };

            if (data !== null) {
                data = JSON.parse(data)
                res.send(data)
            }
            else {
                next();
            }
        })
    }
}

// ** This middleware is responsible for fetching the data from the API and storing it the cache **
const getData = async (req, res, next) => {
    try {

        const { text } = req.body
        const { type } = req.body
        let resp, data;

        //if the client is searching for repositories
        if (req.body.type === 'repositories') {

            resp = await fetch(repoSearch(text))
        }
        else {
            //if the client is searching for users
            resp = await fetch(userSearch(text))
        }

        data = await resp.json();

        if (!data.items.length)
            res.status(404).send({ err: `Sorry ! No  Matching Result was found for :  ${text}` })
        else {
            //caching the data as a string in Redis cache for 2 hours
            client.setex(`${type}:${text}`, 7200, JSON.stringify(data.items))
            res.send(data.items)
        }

    } catch (err) {
        console.log(err)
        res.status(500);
    }

}

// ** endpoint for the search ** 
app.post("/api/search", checkCash, getData)

// ** endpoint for clearing the cache **
app.delete("/api/clear-cache", (req, res) => {

    client.flushdb(function (err, succeeded) {
        if (err) {
            res.status(500).send('cache not cleared')
        }
        else {

            res.send('Cash Cleared')

        }
    });
})


app.listen(PORT, () => { console.log('app listening on port:', PORT) });
const { default: axios } = require("axios");
const fs = require("fs");
const rpc = axios.create({ baseURL: "http://localhost:50021", proxy: false });
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'hello, api' })
})

module.exports = {
  path: '/api',
  handler: app
}
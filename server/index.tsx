import path from 'path'
import fs from 'fs';
import express from 'express';

const app = express()

app.get('/', (req, res) => {
  console.log('hi')
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('good')
})
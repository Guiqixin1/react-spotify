// const express = require('express');
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://open.spotify.com',
    changeOrigin: true
  })
);

console.log('运行了');
app.listen(5173);

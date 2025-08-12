// server.js
// Simple PeerJS signalling server using express + peer
const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
const PEERJS_PATH = process.env.PEERJS_PATH || '/peerjs';

// Create Peer server
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: PEERJS_PATH,
  proxied: true,
  allow_discovery: false
});

app.use(PEERJS_PATH, peerServer);

// Health check
app.get('/', (req, res) => {
  res.send('PeerJS signalling server OK');
});

// Optional: expose simple JSON id endpoint for quick test
app.get('/peerjs/id', (req, res) => {
  res.json({ ok: true, ts: Date.now() });
});

server.listen(PORT, () => {
  console.log(`PeerJS server listening on port ${PORT}, path ${PEERJS_PATH}`);
});

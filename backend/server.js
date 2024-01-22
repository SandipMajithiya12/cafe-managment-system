require('dotenv').config();
const http = require('http');
const app = require('./index');

const port = 3006;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// app.listen(process.env.PORT, () => {
//     console.log(process.env.PORT)
// })

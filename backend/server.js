import dotenv from 'dotenv';
import http from 'http';
import app from './index.js'; // Ensure the correct relative path and file extension

dotenv.config();

const port = process.env.PORT || 3006;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// app.listen(process.env.PORT, () => {
//     console.log(process.env.PORT)
// })

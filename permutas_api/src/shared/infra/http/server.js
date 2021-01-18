import 'reflect-metadata';
import cors from 'cors';

import express from 'express';
import 'express-async-errors';
import io from 'socket.io';
import http from 'http';

import AppError from '../../errors/AppError';
import routes from './routes';

import '../sequelize';

const app = express();
// const server = http.Server(app);
// const socketIo = io(server);
// const connectedUsers = {};

// socketIo.on('connection', socket => {
//   const { user_id } = socket.handshake.query;
//   connectedUsers[user_id] = socket.id;

//   socket.on('disconnect', () => {
//     delete connectedUsers[user_id];
//   });
// });

app.use(cors());

app.use(express.json());

// app.use((req, res, next) => {
//   req.io = socketIo;
//   req.connectedUsers = connectedUsers;
//   next();
// });

app.use(routes);

// tratamento de erros da aplicação
app.use((err, request, response, _) => {
  console.log(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333!');
});

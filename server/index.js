const express = require('express');
require('dotenv').config();
const { ExpressPeerServer } = require('peer');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const http = require('http');

const {initializeSocketServer} = require('./Socket/notifSocket')
//const initializeVideoConsultationSocket = require('./Socket/socket');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const userRouter = require('./routers/userRoutes');
const caseRouter = require('./routers/casesRoutes');
const confirmedDiagnoticRoutes = require('./routers/confirmedDiagnoticRoutes');
const diagnoticRoutes = require('./routers/diagnoticRoutes');
const medicamentRoutes = require('./routers/medicamentRoutes');
const pediatricCaseRoutes = require('./routers/pediatricCaseRoutes');
const signeGraviteRoutes = require('./routers/signeGraviteRoutes');
const signesCliniquesRoutes = require('./routers/signesCliniquesRoutes');
const traitementRoutes = require('./routers/traitementRoutes');
const secteurRoutes = require('./routers/secteurRoutes');
const SymptomsRoutes = require('./routers/symptomsRoutes');
const testRoutes = require('./routers/testRoutes');
const childRoutes = require('./routers/patient/childRoutes');
const allergyRoutes = require('./routers/patient/allergyRoutes');
const vaccinRoutes = require('./routers/patient/vaccinRoutes');
const hospitalisationRoutes = require('./routers/patient/hospitalisationRoutes');
const healthconditionRoutes = require('./routers/patient/healthconditionRoutes');
const medicationRoutes = require('./routers/patient/medicationRoutes');
const consultationRoutes = require('./routers/patient/consultationRoutes');
const notificationRoutes = require('./routers/notificationRoutes');
const reviewRoutes = require('./routers/reviewRoutes');
const backupRoutes = require('./routers/backupRoutes');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const server = http.createServer(app);
const port = 3001;


initializeSocketServer(server);
//const io = initializeSocketServer(server); 
//const videoIo = initializeVideoConsultationSocket(server); 

const peerServer = ExpressPeerServer(server, {
  path: '/peerjs',
  debug: true,
});

app.use('/peerjs', peerServer);

mongoose.connect("mongodb://127.0.0.1:27017/pediatrie_data_base", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database ..');
    server.listen(port, () => {
      console.log(`Server is running on port ${port}....`);
    
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database ..', err);
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRouter);
app.use('/cases', caseRouter);
app.use('/confirmeddiagnostics', confirmedDiagnoticRoutes);
app.use('/diagnostics', diagnoticRoutes);
app.use('/medicaments', medicamentRoutes);
app.use('/pediatriccases', pediatricCaseRoutes);
app.use('/signegraves', signeGraviteRoutes);
app.use('/signescliniques', signesCliniquesRoutes);
app.use('/tests', testRoutes);
app.use('/traitements', traitementRoutes);
app.use('/secteurs', secteurRoutes);
app.use('/healthconditions', healthconditionRoutes);
app.use('/medications', medicationRoutes);
app.use('/allergies', allergyRoutes);
app.use('/symptoms', SymptomsRoutes);
app.use('/childrens', childRoutes);
app.use('/vaccinations', vaccinRoutes);
app.use('/hospitalisations', hospitalisationRoutes);
app.use('/consultation', consultationRoutes);
app.use('/notifications', notificationRoutes);
app.use('/reviews', reviewRoutes);
app.use('/backup', backupRoutes);























// io.emit('server-start', { message: 'Server has started!' });
//const { Server } = require('socket.io');

/*const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]  
  },
  transports: ['websocket', 'polling'],
});
*/
/*io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('create-room', (callback) => {
    const newRoomId = uuidV4();
    callback(newRoomId);
    console.log(`Room created with ID: ${newRoomId}`);
  });

  socket.on('initiate-call', ({ roomId, callerName }) => {
    io.to(roomId).emit('incoming-call', { callerName, roomId });
  });

  socket.on('join-room', (roomId, userId) => {
    console.log(`${userId} joined room: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
      console.log(`${userId} disconnected from room: ${roomId}`);
    });
  });

  socket.on('signal', (data) => {
    const { roomId, signal } = data;
    console.log(`Signal received from room ${roomId}:`, signal);
    io.to(roomId).emit('signal', signal);
  });

  socket.on('accept-call', (roomId) => {
    io.to(roomId).emit('call-accepted');
  });

  socket.on('reject-call', (roomId) => {
    io.to(roomId).emit('call-rejected');
  });

  socket.on('sendNotification', (data) => {
    console.log('Notification event received:', data);
    io.emit('receiveNotification', data);
  });

});

*/















/*const express = require('express');
require('dotenv').config();
const { ExpressPeerServer } = require('peer');

const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const http = require('http');

const userRouter = require('./routers/userRoutes');
const caseRouter = require('./routers/casesRoutes');
const confirmedDiagnoticRoutes = require('./routers/confirmedDiagnoticRoutes');
const diagnoticRoutes = require('./routers/diagnoticRoutes');
const medicamentRoutes = require('./routers/medicamentRoutes');
const pediatricCaseRoutes = require('./routers/pediatricCaseRoutes');
const signeGraviteRoutes = require('./routers/signeGraviteRoutes');
const signesCliniquesRoutes = require('./routers/signesCliniquesRoutes');
const traitementRoutes = require('./routers/traitementRoutes');
const secteurRoutes = require('./routers/secteurRoutes');
const SymptomsRoutes = require('./routers/symptomsRoutes');
const testRoutes = require('./routers/testRoutes');
const childRoutes = require('./routers/patient/childRoutes');
const allergyRoutes = require('./routers/patient/allergyRoutes');
const vaccinRoutes = require('./routers/patient/vaccinRoutes');
const hospitalisationRoutes = require('./routers/patient/hospitalisationRoutes');
const healthconditionRoutes = require('./routers/patient/healthconditionRoutes');
const medicationRoutes = require('./routers/patient/medicationRoutes');
const consultationRoutes = require('./routers/patient/consultationRoutes');
const notificationRoutes = require('./routers/notificationRoutes');
const reviewRoutes = require('./routers/reviewRoutes');
const backupRoutes = require('./routers/backupRoutes');

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const initializeSocket = require('./Socket/socket');
const { initializeNotificationSocket } = require('./Socket/notifSocket');


app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const server = http.createServer(app);
const port = 3001;

const io = initializeSocket(server);
const notificationIo = initializeNotificationSocket(server);

const peerServer = ExpressPeerServer(server, {
  path: '/peerjs', 
  debug: true,
});

app.use('/peerjs', peerServer);

mongoose.connect("mongodb://127.0.0.1:27017/pediatrie_data_base", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database ..');
    server.listen(port, () => { 
      console.log(`Server is running on ${port}....`);
      io.emit('server-start', { message: 'Server has started!' });
      notificationIo.emit('server-start', { message: 'Server has started!' });
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database ..', err);
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRouter);
app.use('/cases', caseRouter);
app.use('/confirmeddiagnostics', confirmedDiagnoticRoutes);
app.use('/diagnostics', diagnoticRoutes);
app.use('/medicaments', medicamentRoutes);
app.use('/pediatriccases', pediatricCaseRoutes);
app.use('/signegraves', signeGraviteRoutes);
app.use('/signescliniques', signesCliniquesRoutes);
app.use('/tests', testRoutes);
app.use('/traitements', traitementRoutes);
app.use('/secteurs', secteurRoutes);
app.use('/healthconditions', healthconditionRoutes);
app.use('/medications', medicationRoutes);
app.use('/allergies', allergyRoutes);
app.use('/symptoms', SymptomsRoutes);
app.use('/childrens', childRoutes);
app.use('/vaccinations', vaccinRoutes);
app.use('/hospitalisations', hospitalisationRoutes);
app.use('/consultation', consultationRoutes);
app.use('/notifications', notificationRoutes);
app.use('/reviews', reviewRoutes);
app.use('/backup', backupRoutes);


io.on('connection', (socket) => {
  console.log('A new user connected');
});

notificationIo.on('connection', (socket) => {
  console.log('A new notification client connected');
});
*/

/*const express = require('express');
require('dotenv').config();
const { ExpressPeerServer } = require('peer');

const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const http = require('http');

const userRouter = require('./routers/userRoutes');
const caseRouter = require('./routers/casesRoutes');
const confirmedDiagnoticRoutes = require('./routers/confirmedDiagnoticRoutes');
const diagnoticRoutes = require('./routers/diagnoticRoutes');
const medicamentRoutes = require('./routers/medicamentRoutes');
const pediatricCaseRoutes = require('./routers/pediatricCaseRoutes');
const signeGraviteRoutes = require('./routers/signeGraviteRoutes');
const signesCliniquesRoutes = require('./routers/signesCliniquesRoutes');
const traitementRoutes = require('./routers/traitementRoutes');
const secteurRoutes = require('./routers/secteurRoutes');
const SymptomsRoutes = require('./routers/symptomsRoutes');
const testRoutes = require('./routers/testRoutes');
const childRoutes = require('./routers/patient/childRoutes');
const allergyRoutes = require('./routers/patient/allergyRoutes');
const vaccinRoutes = require('./routers/patient/vaccinRoutes');
const hospitalisationRoutes = require('./routers/patient/hospitalisationRoutes');
const healthconditionRoutes = require('./routers/patient/healthconditionRoutes');
const medicationRoutes = require('./routers/patient/medicationRoutes');
const consultationRoutes = require('./routers/patient/consultationRoutes')
const notificationRoutes = require('./routers/notificationRoutes')
const reviewRoutes = require('./routers/reviewRoutes')
const backupRoutes = require('./routers/backupRoutes')



const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const initializeSocket = require('./Socket/socket');
const initializeNotificationSocket = require('./Socket/notifSocket');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));




const server = http.createServer(app);
const port = 3001;

const io = initializeSocket(server);

const notificationIo = initializeNotificationSocket(server);

// Initialize PeerJS server
const peerServer = ExpressPeerServer(server, {
  path: '/peerjs', // Ensure this path is correctly set
  debug: true,
});

// Use PeerJS server
app.use('/peerjs', peerServer);

mongoose.connect("mongodb://127.0.0.1:27017/pediatrie_data_base", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database ..');
    server.listen(port, () => { 
      console.log(`Server is running on ${port}....`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database ..', err);
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRouter);
app.use('/cases', caseRouter);
app.use('/confirmeddiagnostics', confirmedDiagnoticRoutes);
app.use('/diagnostics', diagnoticRoutes);
app.use('/medicaments', medicamentRoutes);
app.use('/pediatriccases', pediatricCaseRoutes);
app.use('/signegraves', signeGraviteRoutes);
app.use('/signescliniques', signesCliniquesRoutes);
app.use('/tests', testRoutes);
app.use('/traitements', traitementRoutes);
app.use('/secteurs', secteurRoutes);
app.use('/healthconditions', healthconditionRoutes);
app.use('/medications', medicationRoutes);
app.use('/allergies', allergyRoutes);
app.use('/symptoms', SymptomsRoutes);
app.use('/childrens', childRoutes);
app.use('/vaccinations', vaccinRoutes);
app.use('/hospitalisations', hospitalisationRoutes);
app.use('/consultation' , consultationRoutes);
app.use('/notifications' , notificationRoutes)
app.use('/reviews' , reviewRoutes)
app.use('/backup' , backupRoutes)

*/

/*const express = require('express')
const mongoose = require("mongoose")

const multer = require('multer')
const path = require('path')


const userRouter = require('./routers/userRoutes')
const caseRouter = require('./routers/casesRoutes')
const  confirmedDiagnoticRoutes = require('./routers/confirmedDiagnoticRoutes')
const  diagnoticRoutes = require('./routers/diagnoticRoutes')
const  medicamentRoutes = require('./routers/medicamentRoutes')
const  pediatricCaseRoutes =  require('./routers/pediatricCaseRoutes')
const signeGraviteRoutes =  require('./routers/signeGraviteRoutes')
const signesCliniquesRoutes =  require('./routers/signesCliniquesRoutes')

const traitementRoutes = require('./routers/traitementRoutes')
const secteurRoutes = require('./routers/secteurRoutes')
const SymptomsRoutes = require('./routers/symptomsRoutes')  
const testRoutes = require('./routers/testRoutes')
const childRoutes = require('./routers/patient/childRoutes')
const allergyRoutes = require('./routers/patient/allergyRoutes')
const vaccinRoutes = require('./routers/patient/vaccinRoutes')
const hospitalisationRoutes = require('./routers/patient/hospitalisationRoutes')
const healthconditionRoutes = require('./routers/patient/healthconditionRoutes')
const medicationRoutes = require('./routers/patient/medicationRoutes')



 const bodyParser = require('body-parser');
 



const cors = require("cors")
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

 app.use(express.json());

 

const port = 3001
mongoose.connect("mongodb://127.0.0.1:27017/pediatrie_data_base", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database ..');
    app.listen(port, () => {
      console.log("Server is running on 3001....");
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database ..', err);
  });
 


  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  app.use('/users' , userRouter)
  app.use('/cases' , caseRouter)


 app.use('/confirmeddiagnostics' , confirmedDiagnoticRoutes)
 app.use('/diagnostics' , diagnoticRoutes)
 app.use('/medicaments' , medicamentRoutes)
 app.use('/pediatriccases' , pediatricCaseRoutes)
 app.use('/signegraves' , signeGraviteRoutes)
 app.use('/signescliniques' , signesCliniquesRoutes)
 
 app.use('/tests' , testRoutes)
 app.use('/traitements' , traitementRoutes)
 app.use('/secteurs' , secteurRoutes)


app.use('/healthconditions' , healthconditionRoutes)
app.use('/medications' , medicationRoutes)
app.use('/allergies' , allergyRoutes)

app.use('/symptoms' , SymptomsRoutes)

app.use('/childrens' , childRoutes)


app.use('/vaccinations' , vaccinRoutes)

app.use('/hospitalisations' , hospitalisationRoutes)*/
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { PORT_LISTENER, FORCE_DB } = process.env;
const forceDB = FORCE_DB === '0'? false: true;


// Syncing all the models at once.
conn.sync({ force: forceDB }).then(() => {
      server.listen(PORT_LISTENER, () => {
      console.log(`%s listening at ${PORT_LISTENER}`); // eslint-disable-line no-console
    });  
});
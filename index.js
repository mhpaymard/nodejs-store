const Application = require('./app/app');
new Application({PORT:3001,DB_URL:'mongodb://localhost:27017/storeDB'});

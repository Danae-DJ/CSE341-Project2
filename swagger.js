const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project2 Api',
        description: 'Project2 Api'
    },
    host: 'localhost: 8000',
    schemes: ['https', 'http']
};

const outputfile = './swagger.json';
const endpointsfiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputfile, endpointsfiles, doc);
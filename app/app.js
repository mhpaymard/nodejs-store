const path = require('path');

const mongoose = require('mongoose');
const morgan = require('morgan');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

const { AllRoutes } = require('./routes/router');

module.exports = class Application{
    #PORT;
    #DB_URL;
    #express = require('express');
    #app = this.#express();
    constructor({PORT,DB_URL}){
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.connectToDB();
        this.configApplication();
        this.createRoutes();
        this.createServer();
        this.errorHandler();
        this.initRedis();
    }
    configApplication(){
        this.#app.use(cors());
        this.#app.use(morgan('dev'));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended:true}));
        this.#app.use(this.#express.static(path.join(__dirname,'..','public')));
        this.#app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition:{
                info:{
                    title:'Store Project',
                    version:'1.0.0',
                    description:'پروژه فروشگاه اینترنتی',
                    contact:{
                        name:'MohammadHosein Paymard',
                        url:'http://localhost:3001',
                        email:'talacemi@gmail.com'
                    }
                },
                servers:[
                    {
                        url:'http://localhost:3001'
                    }
                ]
            },
            apis:['./app/routes/**/*.js']
        })));
    }
    connectToDB(){
        mongoose.connect(this.#DB_URL,(error)=>{
            if(!error) return console.log('Connected To Database, Successfully !');
            return console.log("Failed To Connecting Database");
        })
        mongoose.connection.on('connected',()=>{
            console.log('database connected Successfullyyyy');
        })
        mongoose.connection.on('disconnected',()=>{
            console.log('database disconnected !!!');
        })
        process.on('SIGINT',async ()=>{
            await mongoose.connection.close();
            process.exit(0);
        })
    }
    createServer(){
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT,()=>{
            console.log(`Server Is Running On Port ${this.#PORT}`)
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes);
    }
    errorHandler(){
        this.#app.use((req,res,next)=>{
            next(createError.NotFound("آدرس مورد نظر یافت نشد"))
        });
        this.#app.use((error,req,res,next)=>{
            console.log(error)
            const serverError = createError.InternalServerError();
            const status = error?.status || serverError.status;
            const message = error?.message || serverError.message;
            return res.status(status).json({
                error:{
                    statusCode:status,
                    message
                }
            });
        })
    }
    initRedis(){
        require('./modules/init_redis')
    }
}
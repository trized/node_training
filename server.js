const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');



// Adding middleware to handle requests and perform some function
// after performing some work the 'next()' has to be called or else the 
// server will simply be blocked 
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);

    fs.appendFileSync('server.log', log + '\n');

    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs',{
//         pageTitle: 'Maintenance Page'
//     });
// });

// Adding middleware using 'use'
app.use(express.static(__dirname + '/public'));


// Registering Helpers
hbs.registerHelper('getCurrentYear', ()=>{
       return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

// Server Requests
app.get('/',(request, response)=>{
    // response.send('<h1>Hello Express!</h1>');
    // response.send(
    //     {
    //         name:'Hello Express!'
    //     }
    // );
    response.render('welcome.hbs',{
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Random welcome message'
    }); 
});

// Will respond to http://localhost:3000/about
app.get('/about',(request, response)=>{
    // response.send('About Page');
    response.render('about.hbs',{
        pageTitle: 'Express About Page'
    });
});

// Starts listening to the port 3000
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
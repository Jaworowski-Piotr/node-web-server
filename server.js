const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text) =>  {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    let now = new Date().toDateString();
    let log = `${now}, ${req.method}, ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log(err);
        }
    });
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        homeTitle: "somethings",
        currentTime: new Date().getFullYear()
    });
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About me"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to send that message"
    });
});

app.listen(3000, () => {
    console.log('Server is runing on port 3000')
});
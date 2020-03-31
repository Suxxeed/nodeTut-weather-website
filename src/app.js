const express =  require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/gecode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Florian Wolle',
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Florian Wolle',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Call me if you need some help!',
        name: 'Florian Wolle',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
    }


    res.send({
        products: []
    })
})

// 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Florian Wolle',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Florian Wolle',
        errorMessage: 'Page not found',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
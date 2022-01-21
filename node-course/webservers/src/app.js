const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils');
const forcast = require('./utils')
const app = express();



const template_path = path.join(__dirname, '../templates/views');
const public_path = path.join(__dirname, '../public');
const partial_path = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', template_path);
app.use(express.static(public_path))
hbs.registerPartials(partial_path);

app.get("/", (req, res) => {
    res.render("index", {
        name: "shameer",
        place: "vattekkad",
        title: "It is dynamic renderinf"
    })
})


app.get('/home', (req, res) => {
    res.send({
        name: "shameer",
        class: "MCA",
        tille: "it is dynamic pages of homeee"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        help: "Help page",
        helpline: "helpline number",
        name: "shameer"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        about: "About page",
        allnames: 'About namess',
        name: "shameer",
        title: "About title page"
    })
})
app.get('/wheather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address found"
        })
    }

    geocode(req.query.address, (error, response) => {
        if (error) {
            console.log(error)
            return res.send({
                error
            })
        }
        if (response) {
            res.send({
                degree: response,
                address: req.query.address
            })
        }

    })



})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "No found search item"
        })
    }
    console.log(req.query.search)
    res.send('Wheather page')
})

app.get('/help/*', (req, res) => {
    res.render('helpHandler', {
        name: 'shameer',
        title: "Help error page",
        errorMessage: 'Help Page articles not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        page: "Page Not found"
    })
})





app.listen(3000, () => {
    console.log("listen to mee")
})
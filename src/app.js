const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
//set the folder templates for views
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const partialsPath2 = path.join(__dirname, '../test')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
hbs.registerPartials(partialsPath2)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Andy Van'
	})
})

app.get('/about', (req, res) =>{
	res.render('about', {
		title: 'About Me',
		name: 'Andy Van'
	})
})

app.get('/help', (req, res) =>{
	res.render('help', {
		title: 'Help page',
		name: 'Andy Van',
		helpText: 'This is some helpful text'
	})
})


app.get('/weather', (req, res) => {
	const address = req.query.address
	if (!address){
		return res.send('You must provide a location')
	}
	res.send({
		forecast: 'Rain',
		location: 'Seattle',
		address
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}
	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Andy Van',
		errorMessage: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		name: 'Andy Van',
		title: '404 page',
		errorMessage: '404 page. cannot find it'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
}) // it displays in the server
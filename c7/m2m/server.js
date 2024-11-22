const express = require('express'),
			bodyParser = require('body-parser'),
			Sequelize = require('sequelize')

const sequelize = new Sequelize('web_stuff2', 'app1', 'welcome123', {
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

const Message = sequelize.define('message', {
	title : {
		allowNull : false,
		type : Sequelize.STRING,
		validate : {
			len : [3,100]
		}
	},
	date : {
		allowNull: false,
		defaultValue : Sequelize.NOW,
		type : Sequelize.DATE
	},
	content : {
		allowNull : false,
		type : Sequelize.TEXT,
		validate : {
			len : [10,1000]
		}		
	}
}, {
	underscored : true
})

const Author = sequelize.define('author', {
	name : {
		allowNull : false,
		type : Sequelize.STRING,
		validate : {
			len : [3,100]
		}		
	},
	email : {
		allowNull : false,
		type : Sequelize.STRING,
		validate : {
			isEmail : true
		}
	}
},{
	underscored : true
})

Message.belongsToMany(Author, {through : 'author_message'})
Author.belongsToMany(Message, {through : 'author_message'})


const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res, next) => {
	try{
		await sequelize.sync({force : true})
		res.status(200).json({message : 'created'})
	}
	catch(e){
		next(e)
	}
})

app.get('/authors', async (req, res, next) => {
	try{
		let authors = await Author.findAll()
		res.status(200).json(authors)
	}
	catch(e){
		next(e)
	}
})

app.post('/authors', async (req, res, next) => {
	try{
		await Author.create(req.body)
		res.status(201).json({message : 'created'})
	}
	catch(e){
		next(e)
	}
})

app.get('/authors/:id', async (req, res, next) => {
	try{
		let author = await Author.findByPk(req.params.id, {include : [Message]})
		if (author){
			res.status(200).json(author)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		next(e)
	}	
})

app.get('/authors/:id/messages', async (req, res, next) => {
	try{
		let author = await Author.findByPk(req.params.id)
		if (author){
			let messages = await author.getMessages()
			res.status(200).json(messages)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		next(e)
	}	
})

app.post('/authors/:id/messages', async (req, res, next) => {
	try{
		let author = await Author.findByPk(req.params.id)
		let message = await Message.create(req.body)
		author.addMessage(message)
		res.status(200).json({message : 'created'})
	}
	catch(e){
		next(e)
	}
})

app.get('/messages/:id/authors', async (req, res, next) => {
	try{
		let message = await Message.findByPk(req.params.id)
		if (message){
			let authors = await message.getAuthors()
			res.status(200).json(authors)			
		}
		else{
			res.status(404).json({message : 'not found'})			
		}
	}
	catch(e){
		next(e)
	}
})

app.use((err, req, res, next) => {
	console.warn(err)
	res.status(500).send('some error')
})

app.listen(8080)

import express from 'express'
import models from '../models/index.mjs'
import { Op } from 'sequelize'

const router = express.Router()

router.get('/books', async (req, res, next) => {
	try {
		const query = {}
		const filterQuery = {}
		if (req.query.filterField && req.query.filterValue) {
			query.where = {
				[req.query.filterField]: {
					[Op.like]: `%${req.query.filterValue}%`
				}
			}
			filterQuery.where = {
				[req.query.filterField]: {
					[Op.like]: `%${req.query.filterValue}%`
				}
			}
		}
		if (req.query.pageSize && req.query.pageNo) {
			query.limit = req.query.pageSize
			query.offset = parseInt(req.query.pageSize) * parseInt(req.query.pageNo)
		}
		if (req.query.sortField && req.query.sortOrder) {
			query.order = [[req.query.sortField, req.query.sortOrder]]
		}
		const count = await models.Book.count(filterQuery)
		const data = await models.Book.findAll(query)
		res.status(200).json({ data, count })
	} catch (err) {
		next(err)
	}
})
  
router.post('/books', async (req, res, next) => {
	try {
		await models.Book.create(req.body)
		res.status(201).json({ message: 'created' })
	} catch (err) {
		next(err)
	}
})
  
router.get('/books/:bid', async (req, res, next) => {
	try {
		const book = await models.Book.findByPk(req.params.bid)
		if (book) {
			res.status(200).json(book)
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})
  
router.put('/books/:bid', async (req, res, next) => {
	try {
		const result = await models.Book.update(req.body, {
			where: {
				id: req.params.bid

			},
			fields: ['title', 'content'] 
		})
		if (result.shift() === 1) {
			res.status(202).json({ message: 'accepted' })
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})
  
router.delete('/books/:bid', async (req, res, next) => {
	try {
		const result = await models.Book.destroy({
			where: {
				id: req.params.bid
			}
		})
		if (result === 1) {
			res.status(202).json({ message: 'accepted' })
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})
  
router.get('/books/:bid/chapters', async (req, res, next) => {
	try {
		const book = await models.Book.findByPk(req.params.bid, {
			include: [models.Chapter]
		})
		if (book) {
			res.status(200).json(book.chapters)
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})
  
router.get('/books/:bid/chapters/:cid', async (req, res, next) => {
	try {
		const book = await models.Book.findByPk(req.params.bid, {
			include: [{
				model: models.Chapter,
				where: { 
					id: req.params.cid 
				}
			}]
		})
		if (book && book.chapters.length > 0) {
			res.status(200).json(book.chapters.shift())
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})
  
router.post('/books/:bid/chapters', async (req, res, next) => {
	try {
		const book = await models.Book.findByPk(req.params.bid)
		if (book) {
			const chapter = await book.createChapter(req.body)
			res.status(201).json(chapter)
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})
  
router.put('/books/:bid/chapters/:cid', async (req, res, next) => {
	try {
		const result = await models.Chapter.update(req.body, {
			where: {
				id: req.params.cid,
				bookId: req.params.bid
			}
		})
		if (result.shift() === 1) {
			res.status(202).json({ message: 'accepted' })
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})
  
router.delete('/books/:bid/chapters/:cid', async (req, res, next) => {
	try {
		const result = await models.Chapter.destroy({
			where: {
				id: req.params.cid,
				bookId: req.params.bid
			}
		})
		if (result === 1) {
			res.status(202).json({ message: 'accepted' })
		} else {
			res.status(404).json({ message: 'not found' })
		}
	} catch (err) {
		next(err)
	}
})

export default router
import express from 'express'
import { DatabaseSync } from 'node:sqlite'
import { v4 as uuid } from 'uuid'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import path from 'path'

const app = express()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    const fileName = uuid()
    cb(null, `${fileName}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage })

app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const db = new DatabaseSync('./db.sqlite')
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY, 
        alias TEXT, 
        secret_key TEXT
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        secret_key TEXT, 
        title TEXT, 
        content TEXT,
        file_name TEXT,
        parent_id INTEGER, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`)

const insertUsers = db.prepare('INSERT INTO users (alias, secret_key) VALUES (?, ?)')

const insertPosts = db.prepare('INSERT INTO posts (secret_key, title, content, file_name, parent_id) VALUES (?, ?, ?, ?, ?)')

const selectPostsFromOneUser = db.prepare('SELECT * FROM posts WHERE secret_key = ?')

const recursiveSelectPostsAndUsers = db.prepare(`
    WITH RECURSIVE post_tree(id, secret_key, title, content, file_name, parent_id, created_at) AS (
        SELECT id, secret_key, title, content, file_name, parent_id, created_at 
        FROM posts WHERE parent_id IS NULL 
        UNION ALL 
        SELECT posts.id, posts.secret_key, posts.title, posts.content,posts.file_name, posts.parent_id, posts.created_at FROM posts JOIN post_tree ON post_tree.id = posts.parent_id
    ) 
    SELECT * FROM post_tree
    ORDER BY parent_id, created_at DESC
    LIMIT 2 OFFSET ?
`)

app.get('/', (req, res) => {
    res.redirect('/posts')
})

app.get('/posts', async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 0
        const posts = recursiveSelectPostsAndUsers.all(page * 2)
        res.render('index', { posts, page: page })
    } catch (error) {
        console.error(error)
        res.render('error')
    }
})

// insert a post
app.post('/posts', upload.single('file'), async (req, res) => {
    try {
        let secretKey = req.cookies.secret_key
        const existingUser = db.exec('SELECT * FROM users WHERE secret_key = ?', secretKey)
        const fileName = req.file.filename
        let { alias, title, content, parentId } = req.body
        parentId = parentId ? parseInt(parentId) : null
        secretKey = existingUser ? existingUser.secret_key : uuid()
        alias = existingUser ? existingUser.alias : alias
        if (!existingUser) {
            insertUsers.run(alias, secretKey)
            res.cookie('secret_key', secretKey)
        }
        // console.warn(secretKey, title, content, fileName, parentId)
        insertPosts.run(secretKey, title, content, fileName, parentId)
        res.redirect('/')
        
    } catch (error) {
        console.error(error)
        res.render('error')        
    }
})

app.listen(8080)
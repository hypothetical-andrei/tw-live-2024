import express from 'express'
import cors from 'cors'
import routers from './routers/index.mjs'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', routers.api)

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({ message: 'server error' })
})

app.listen(8080)
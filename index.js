import express from 'express'
import { db } from './db.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("O Server está Online")
})


app.listen(5800, () => {
    console.log('Server On')
    console.log('http://localhost:5800')
})


//Get
app.get('/post', (req, res) => {
    const q = "SELECT * FROM posts"

    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//Post
app.post('/post', (req, res) => {
    const q = 'INSERT INTO posts (`title`,`desc`) VALUE (?)'

    const values = [
        req.body.title,
        req.body.desc
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//Delete
app.delete('/post/:id', (req, res) => {
    const postid = req.params.id;
    const q = 'DELETE FROM posts WHERE id = ?';

    db.query(q, [postid], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//update

app.put('/post/:id', (req, res) => {
    const postId = req.params.id;
    const q = "UPDATE posts SET `title` = ?, `desc` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc
    ]

    db.query(q, [...values, postId], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
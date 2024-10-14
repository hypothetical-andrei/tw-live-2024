import express from 'express'
import fs from 'fs'
import { Marked } from 'marked'
import {markedHighlight} from 'marked-highlight'
import hljs from 'highlight.js'

const marked = new Marked()

marked.use( markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  }
}))

// function postprocess(html) {
//   if (html.indexOf('code') !== -1) {
//     return `${html}`
//   } 
//   return `${html}`
// }

// marked.use({ hooks: { postprocess } })

// function preprocess(markdown) {
//   const regex = /```js((.|\n)*)?```/mg;
//   const m = markdown.match(regex)
//   if (m.length > 0) {
//     console.log(m)
//     const code = m[0].slice(5, m[0].length - 3)
//     console.log(code)
//     // console.log(eval(code))
//   }
//   return markdown
// }

// marked.use({ hooks: { preprocess } });

const ASSET_FOLDER = 'assets'
const SLIDE_DELIMITER = '---'

const STYLE_PREFIX = ``

const STYLE_POSTFIX = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/css/fonts.min.css" rel="stylesheet">
  <style>
    body {
      margin: 0px;
      padding: 2em;
      display: flex;
      flex-direction: column;
      align-items: start;
      background-color: whitesmoke;
      font-family: sans-serif;
      flex-wrap: wrap;
      height: calc(100vh - 4em);
    }
    h1, h2, ul {
      align-self: center;
    }
    pre {
      align-self: center;
    }
    p, p a {
      text-wrap: wrap;
      max-width: calc(100vw - 4em);
    }
  </style>

  <script>
    window.addEventListener('keydown', (evt) => {
      if (evt.code === 'ArrowRight') {
        const items = window.location.href.split('/')
        const slide = items.pop()
        window.location = items.join('/') + '/' + (parseInt(slide) + 1)
      } else {
        if (evt.code === 'ArrowLeft') {
          const items = window.location.href.split('/')
          const slide = items.pop()
          window.location = items.join('/') + '/' + (parseInt(slide) - 1)
        } 
      } 
    })
  </script>
`

const app = express()

app.get('/presentations/:presentationName/slides/:slideNo', async (req, res, next) => {
  const { presentationName, slideNo } = req.params
  const path = `${ASSET_FOLDER}/${presentationName}.md`
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path)
    const stringContent = content.toString()
    const slides = stringContent.split(SLIDE_DELIMITER)
    const slideIndex = parseInt(slideNo)
    if ( slideIndex < slides.length && slideIndex > -1) {
      res.status(200).send(`${STYLE_PREFIX}${marked.parse(slides[slideIndex])}${STYLE_POSTFIX}`)
    } else {
      res.status(404).send('slide does not exist in presentation')
    }
  } else {
    res.status(404).send('presentation does not exist')
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).send('our expert kittens are tired and cannot handle your request')
})

app.listen(8080)
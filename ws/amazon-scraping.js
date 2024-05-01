const express = require('express')
const axios = require('axios');
const {JSDOM} = require('jsdom');
const app = express()
const cors = require('cors')
app.set('port', 8000)

const corsOptions = {
    origin:'http://localhost:5500',
    credentials: true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

const amazonScraping = async (keyword) =>{
    try {
        const {data} = await axios.get(`https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}}`)
        //Convert the structure HTML through JSDOM and take any post
        const dom = new JSDOM(data)
        const postElement = [... dom.window.document.querySelectorAll('.s-result-item')]

        //Take any part of HTML post
        const extracted = postElement.map(e =>{

            // Searching through tag in the DOM in order <h2> -> <a> -> <span>
            const titleElement = e.querySelector('h2 a span')
            const title = titleElement ? titleElement.textContent : ''

            //Split for pick the only first number of rating
            const ratingElement = e.querySelector('.a-icon-star-small span')
            const rating = ratingElement ? parseFloat(ratingElement.textContent.split(' ')[0]) : 0

            //Used dot twice for feach two class names
            const reviewElement = e.querySelector('.a-size-small .a-size-base')
            const review = reviewElement ? parseInt(reviewElement.textContent.replace(/[.]/g, '')) : 0

            const imageElement = e.querySelector('.s-image');
            const imageUrl = imageElement ? imageElement.getAttribute('src') : '';


            //Return a object with data inside the array 'extracted'
            return {title, rating, review, imageUrl}
        })
        return extracted
        }catch (error) {
            console.log('Error: ', error)
            return []
        }
}

app.get('/api/scrape', async (req, res) =>{
    const {keyword} = req.query
    try {
        const finalData =  await amazonScraping(keyword)
        res.json(finalData)
    }catch (error){
        res.status(400).json('Error:', error)
    }
})

app.listen(app.get('port'), () =>{
    console.log(`Servidor rodando na porta ${app.get('port')}`)
})

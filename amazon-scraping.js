const express = require('express')
const axios = require('axios');
const {JSDOM} = require('jsdom');

const amazonScraping = async (keyword) =>{
    try {
     await axios
        //Get connection in URL
            .get(`https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`)
            .then((response) => {
                //Convert the structure HTML through JSDOM and take any post
                const dom = new JSDOM(response.data)
                const postElement = [... dom.window.document.querySelectorAll('.s-result-item')]

                //Take any part of HTML post
                const extracted = postElement.map(e =>{
                    const titleElement = e.querySelector('h2 a span')
                    const title = titleElement ? titleElement.textContent : ''

                    const ratingElement = e.querySelector('.a-icon-star-small span')
                    const rating = ratingElement ? parseFloat(ratingElement.textContent.split(' ')[0]) : 0

                    const reviewElement = e.querySelector('.a-size-small .a-size-base')
                    const review = reviewElement ? parseInt(reviewElement.textContent.replace(/[.]/g, '')) : 0

                    //const imgUrlElement = e.querySelector('.s-image')
                    // imgUrl = imgUrlElement.getAttribute('src')

                    const imageElement = e.querySelector('.s-image');
                    const imageUrl = imageElement ? imageElement.getAttribute('src') : '';


                    //Return a object with data inside the array 'extracted'
                    return {title, rating, review, imageUrl}
                })
                
                console.log(extracted)
            });
        }catch (error) {
            console.log('Error: ', error)
        }
}

amazonScraping('brinquedo cachorro')
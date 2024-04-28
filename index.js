const axios = require('axios');
const {JSDOM} = require('jsdom');
//const puppeteer = require('puppeteer');
//const x = require('x-ray')

axios
    //Get connection in URL
    .get("https://logrocket.com/blog")
    .then(function (response){
        //Convert the structure HTML through JSDOM and take any post
        const dom = new JSDOM(response.data)
        const postElement = [... dom.window.document.querySelectorAll('.post-card')]

        //Take any part of HTML post
        const extracted = postElement.map(e =>{
            const titleElement = e.querySelector('.post-card-title')
            const title = titleElement.textContent

            const subTitleElement = e.querySelector('.post-card-subtitle')
            const subTitle = subTitleElement.textContent
            
            const cardImgElement = e.querySelector('.post-card-img img')
            const cardImg = cardImgElement.getAttribute('src')

            const authorNameElement = e.querySelector('.post-card-author-name')
            const authorName = authorNameElement.textContent

            //Return a object with data inside the array extracted
            return {title, subTitle, cardImg, authorName, pubDate}
        })
        
        console.log(extracted)
    })
    .catch(function (error){
        console.error('Error', error)
    });

//Using Axios to make a HTTPS request in logrocket blog, then Retitle the HTML using regular expressions
/*axios
    .get("https://logrocket.com/blog")
    .then(function (response){
        const reTitles = /(?<=\<h2 class="card-title"><a\shref=.*?\>).*?(?=\<\/a\>)/g;
        [... response.data.matchAll(reTitles)].forEach(title => console.log(` - ${title}`));
    })
*/
// Using axios plus JSDOM to take the title elements in logRocket home page
// '.card-title'means the class and 'a' means the anchor target by querySelectoAll

/*
const parseLogRocketHome = async () => {
    try{
    //Launch the browser and initiate a new page
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    //Navigate to logrocket and wait until connecctions are done
    await page.goto('https://logrocket.com/blog', {waitUntil:'networkidle2'})

    //Evaluate a function inside the page and returns the result
    const titles = await page.evaluate(() =>{
        return [... document.querySelectorAll('.card-title a')].map(el => el.textContent)
    })

    await browser.close()

    titles.forEach((e) => console.log(`- ${e}`))
    }catch(error){
        console.log(error)
    }
}

parseLogRocketHome()
*/
/*
x('https://logrocket.com/blog', {
    titles: ['.card-title a']
})((err, result) => {
    result.titles.forEach(title => console.log(`- ${title}`));
});
*/

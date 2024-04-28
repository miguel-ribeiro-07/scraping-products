const axios = require('axios');
const {JSDOM} = require('jsdom');
//const puppeteer = require('puppeteer');
//const x = require('x-ray')

axios
    .get("https://logrocket.com/blog")
    .then(function (response){
        const dom = new JSDOM(response.data);
        const result = {}
        const titlesElement = [... dom.window.document.querySelectorAll('.post-card-title h4')]
        titlesElement.forEach((t) => result.title = t.textContent)

        const subElement = [... dom.window.document.querySelectorAll('.post-card-subtitle p')]
        subElement.forEach((s) => result.sub = s.textContent)

        console.log(result)
        /*if (titlesElement.length > 0){
            titlesElement.forEach((title)=> console.log(`- ${title.textContent}`))
        }else{
            console.log('Theres no titles found')
        }*/
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

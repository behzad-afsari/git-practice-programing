const cheerio = require("cheerio")
const axios = require("axios")

console.log("web scrappng")
console.clear()

// const url = "https://www.manchestereveningnews.co.uk/sport/football/"

axios("https://www.manchestereveningnews.co.uk/sport/football/")
.then(res=>{
    const htmlData = res.data;
    const $ = cheerio.load(htmlData)
    // console.log(htmlData)
    const articles = []

    $(".teaser",htmlData).each((index,element)=>{
        const title = $(element).children('.teaser-text').text()
        const titleURL = $("element").children(".teaser-text").attr('href')
        articles.push({
            title,
            titleURL
        })
        // console.log(title,titleURL)
        // console.log(title)
    })
    console.log(articles)
}).catch((err)=>{
    console.error(err)
})

console.log("+++++++++++++++++")




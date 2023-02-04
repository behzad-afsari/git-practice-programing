const cheerio = require("cheerio")
const axios = require("axios")

console.log("web scrappng")
console.clear()

// const url = "https://www.manchestereveningnews.co.uk/sport/football/"

axios("https://www.manchestereveningnews.co.uk/sport/football/")
.then(res=>{
    const htmlData = res.data;
    const $ = cheerio.load(htmlData)
    console.log(htmlData)
}).catch((err)=>{
    console.error(err)
})




const cheerio = require("cheerio")
const axios = require("axios")
const fs = require("fs")
const j2cp = require("json2csv").parser;

console.clear()
console.log("web scraping started...")

function scrap1() {
    //کار نمی میکند
    axios("https://www.manchestereveningnews.co.uk/sport/football/")
        .then(res => {
            const htmlData = res.data;
            const $ = cheerio.load(htmlData)
            const articles = []

            $(".teaser", htmlData).each((index, element) => {
                const title = $(element).children('.teaser-text').text()
                // const title = $(element).children('.headline').text()
                // const titleURL = $("element").children(".teaser-text").children('.headline').attr('href')
                // const titleURL = $("element").children('.headline').attr('hfer')
                articles.push({
                    title,
                    titleURL
                })
                console.log(title)
                console.log(title, titleURL)
            })
            console.log(articles)

            console.log($(".teaser").children("teaser-text").text())
        }).catch((err) => {
            console.error(err)
        })
}


function scrap2() {
    //کار میکند
    axios("https://frontcast.ir/course")
        .then((res) => {
            const htmlData = res.data;
            const $ = cheerio.load(htmlData)
            const articles = []
            // console.log(htmlData)
            console.log("-------------")

            $(".card", htmlData).each((index, element) => {
                // const title = $(element).children('.card-title').children(".fw-bold").text()
                // const title = $(element).children(".card-body").children(".card-title").children(".fw-bold").attr("href")
                const title = $(element).children(".card-body").children(".card-title").children(".fw-bold").text().trim()
                const titleURL = $(element).children(".card-body").children(".card-title").children(".fw-bold").attr('href')
                // console.log(title)
                articles.push({ title, titleURL })
            })

            console.log(articles)

        }).catch((err) => {
            console.error(err)
        })
}

const articles = []

function scrapZanooneh(url) {
    const start = Date.now()
    axios(url)
        .then((res) => {
            const htmlData = res.data
            console.log(htmlData)
            console.log('fetch time: ', Date.now() - start)
            const $ = cheerio.load(htmlData)
            // console.log($)
            $(".product-5", htmlData).each((index, element) => {
                const title = $(element).children(".product_box").children(".body").children(".height-40").children("a").text().trim()
                const price = $(element).children(".product_box").children(".body").children(".info-product").children(".info").children(".d-content").children(".priceItems").children(".price").text().trim()
                articles.push({ title, price })
            })
            if ($('.next-page').length > 0) {
                let nextPage = $(".next-page").children("a").attr('href')
                // console.log('go to next page >>>' , nextPage)
                scrapZanooneh(nextPage)
            } else {
                const parser = new j2cp();
                const csv = parser.parser(articles)
                console.log("--- scaping is finished ---")
                // fs.writeFileSync("zanooneh.json",articles,"utf-8")
                fs.writeFileSync("zanooneh.json", JSON.stringify(articles), "utf-8")
                fs.writeFileSync("./zanoone.csv", csv)
            }
            console.log(articles)
            console.log("finish time: ", Date.now() - start)
        })
        .catch((err) => {
            console.log("error : ", err)
        })
}

// console.log("+++++++++++++++++")
// scrap1()
// scrap2()
scrapZanooneh("https://www.zanoone.ir/brand/%DA%AF%D9%84%D8%AF%D9%86-%D8%B1%D8%B2-")
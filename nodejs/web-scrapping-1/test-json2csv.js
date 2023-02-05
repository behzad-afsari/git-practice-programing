import { fstat, readFileSync, writeFileSync } from 'fs'
import { Parser as j2csv } from 'json2csv'
import { Parser } from '@json2csv/plainjs';
// import Parser from '@json2csv/plainjs'

// fs.readFileSync("zanooneh.json", ,(err, data) => {
//     if (err) {
//         console.log(err.message)
//         return
//     }
//     console.log(data)
// })
try {
    const data = readFileSync("zanooneh.json", "utf-8")
    console.log(data)
    const jsonData = JSON.parse(data)
    console.log(jsonData)

    // const parser = new j2cp();
    // const csvData = parser.parse(jsonData)

    const opts = {};
    const parser = new Parser(opts);
    const csv = parser.parse(jsonData);
    writeFileSync("zanoone.csv", csv)

    console.log(csv)

} catch (err) {
    // console.log(err.message)
    console.log(err)
}
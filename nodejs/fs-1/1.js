//import fs from "fs"

const fs = require('fs')

const text="hello behzad"

fs.writeFileSync("a.txt",text,"utf-8")

console.log('finish')

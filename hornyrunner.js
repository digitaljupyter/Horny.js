const horn = require("./horny")
const fs = require("fs")

let toplevel = horn.hornySession

process.argv.shift()
process.argv.shift()

horn.executeHorny(fs.readFileSync(process.argv[0], { encoding: "utf-8"}), toplevel)

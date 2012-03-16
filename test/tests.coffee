j2h = require("../lib/json2html")
fs = require("fs")

fs.writeFileSync("./test.html", j2h.render({myarray: [{a:new Date()}, {b:1}, {c:{r:2,d:2,blah:['un','deux','trois']}}]}))
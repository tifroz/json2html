var fs, j2h, myJson;

j2h = require("../lib/json2html");

fs = require("fs");

myJson = {
  a_table: [
    {
      name: "hugo",
      tel: "1234561234",
      email: "hugo@blah.com"
    }, {
      name: "joe",
      tel: "1234569999",
      email: "joe@blah.com"
    }
  ],
  straigh_array: ["a", "b", "c"],
  an_object: {
    myAttribute: {
      a: 1,
      b: 2
    },
    anotherAttribute: {
      r: 2,
      d: 2
    }
  }
};

fs.writeFileSync("./test/test.html", j2h.render(myJson));

var drawTable, getContentClass, head, isLeafObject, isLeafValue, isTable, makeTitleDiv, render, toggleJS, _;

_ = require("underscore");

toggleJS = "onclick=\"j2h.toggleVisibility(this);return false\"";

makeTitleDiv = function(level, keyname, datatype) {
  if (_.isNumber(keyname)) {
    return "<div class='index'>" + keyname + "&nbsp;</div>";
  } else if (_.isString(keyname)) {
    if (datatype === 'array') {
      return "<div class='collapsible level" + level + "' " + toggleJS + ">[" + keyname + "]</div>";
    } else if (datatype === 'object') {
      return "<div class='attribute collapsible level" + level + "' " + toggleJS + ">" + keyname + "</div>";
    } else {
      return "<div class='leaf level" + level + "'>" + keyname + "</div>";
    }
  } else {
    return "";
  }
};

getContentClass = function(keyname) {
  if (_.isString(keyname)) {
    return "content";
  } else {
    return "";
  }
};

isLeafValue = function(val) {
  return _.isNumber(val) || _.isString(val) || _.isBoolean(val) || _.isDate(val) || _.isNull(val) || _.isUndefined(val) || _.isNaN(val);
};

isLeafObject = function(obj) {
  var key, val;
  if (!_.isObject(obj)) return false;
  for (key in obj) {
    val = obj[key];
    if (!isLeafValue(val)) return false;
  }
  return true;
};

isTable = function(arr) {
  var cols, nonCompliant;
  if (!_.isArray(arr)) return false;
  if (arr.length === 0 || !_.isObject(arr[0])) {
    return false;
  } else {
    nonCompliant = _.detect(arr, function(row) {
      return !isLeafObject(row);
    });
    if (nonCompliant) {
      return false;
    } else {
      cols = _.keys(arr[0]);
      nonCompliant = _.detect(arr, function(row) {
        return !_.isEqual(cols, _.keys(row));
      });
      if (nonCompliant) {
        return false;
      } else {
        return true;
      }
    }
  }
};

drawTable = function(arr) {
  var cols, content, contentHtml, drawRow, headingHtml, rowObj;
  drawRow = function(headers, rowObj) {
    var header;
    return "<td>" + ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = headers.length; _i < _len; _i++) {
        header = headers[_i];
        _results.push(rowObj[header]);
      }
      return _results;
    })()).join("</td><td>") + "</td>";
  };
  cols = _.keys(arr[0]);
  content = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      rowObj = arr[_i];
      _results.push(drawRow(cols, rowObj));
    }
    return _results;
  })();
  headingHtml = "<tr><th>" + cols.join("</th><th>") + "</th></tr>";
  contentHtml = "<tr>" + content.join("</tr><tr>") + "</tr>";
  return "<table>" + headingHtml + contentHtml + "</table>";
};

render = function(name, data, options, level, altrow) {
  var contentClass, count, idx, key, subs, title, val;
  contentClass = getContentClass(name);
  altrow = altrow ? "odd" : "even";
  if (_.isArray(data)) {
    title = makeTitleDiv(level, name, 'array');
    if (isTable(data)) {
      subs = drawTable(data);
    } else {
      subs = "<div>" + ((function() {
        var _len, _results;
        _results = [];
        for (idx = 0, _len = data.length; idx < _len; idx++) {
          val = data[idx];
          _results.push(render(idx, val, options, level + 1, idx % 2));
        }
        return _results;
      })()).join("</div><div>") + "</div>";
    }
    return "<div class=\"collapse clearfix " + altrow + "\">" + title + "<div class=\"" + contentClass + "\">" + subs + "</div></div>";
  } else if (isLeafValue(data)) {
    title = makeTitleDiv(level, name);
    return "" + title + "<span>&nbsp;&nbsp;" + data + "</span>";
  } else {
    title = makeTitleDiv(level, name, 'object');
    count = 0;
    subs = "<div>" + ((function() {
      var _results;
      _results = [];
      for (key in data) {
        _results.push(render(key, data[key], options, level + 1, count++ % 2));
      }
      return _results;
    })()).join("</div><div>") + "</div>";
    return "<div class=\"expand clearfix " + altrow + "\">" + title + "<div class=\"" + contentClass + "\">" + subs + "</div></div>";
  }
};

exports.render = function(json, options) {
  return "" + head + (render(null, json, options, 0, 0));
};

head = '<style type="text/css">\ntable {\n	border-collapse:collapse;\n}\nth {\n	color: #888 ;\n}\ntable,th, td {\n	border: 1px solid #DDD;\n	padding: 10px 5px ;\n}\nth, td {\n	text-align:center;\n}\n.content {\n	padding-left: 30px ;\n}\n.attribute:after {\n	content: \':\';\n}\n.array:after {\n	content: \']\';\n}\n.array:before {\n	content: \'[\';\n}\n.index {\n	font-size: 100% ;\n	color: #999 ;\n	float: left ;\n}\n.clearfix:after {\n	content: ".";\n  display: block;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n.collapsible:hover {\n	text-decoration: underline ;\n}\n.collapse > div.content {\n	display: none ;\n}\n.collapse > div:first-child {\n	font-weight: bold ;\n}\n\n.collapse > span.collapsible:before {\n	border-radius: 2px;\n	border-color: #A44;\n	border-style: solid;\n	border-width: 1px;\n	color: #A44;\n	content: \'+\';\n	display: inline-block;\n	line-height: 7px;\n	margin: 0 2px;\n	overflow: hidden;\n	padding: 1px;\n	font-size: 11px ;\n}\n\n.expand > span.collapsible:before {\n	border: none ;\n	color: #A44;\n	content: \'-\';\n	display: inline-block;\n	line-height: 7px;\n	margin: 4px;\n	overflow: hidden;\n	padding: 1px;\n	font-size: 11px ;\n}\n\n.level0 {\n	font-size: 25px ;\n}\n.level1 {\n	font-size: 22px ;\n}\n\n.even .level1 {\n	background-color: #CCC ;\n}\n.odd .level1 {\n	background-color: #EEE ;\n}\n\n.leaf {\n	color: #888;\n	display: inline ;\n}\n\n</style>\n<script type=text/javascript>\n	j2h = {\n		toggleVisibility: function(el, name) {\n			j2h.toggleClass(el.parentElement,\'collapse expand\') ;\n		},\n		classRe: function(name) {\n			return new RegExp(\'(?:^|\\\\s)\'+name+\'(?!\\\\S)\') ;\n		},\n		addClass: function(el, name) {\n			el.className += " "+name;\n		},\n		removeClass: function(el, name) {\n			var re = j2h.classRe(name) ;\n			el.className  = el.className.replace( j2h.classRe(name) , \'\' )\n		},\n		hasClass: function(el, name) {\n			var re = j2h.classRe(name) ;\n			return j2h.classRe(name).exec(el.className);\n		},\n		toggleClass: function(el, name) {\n			var names = name.split(/\\s+/) ;\n			for (n in names) {\n				if (j2h.hasClass(el, names[n])) {\n					j2h.removeClass(el, names[n]) ;\n				} else {\n					j2h.addClass(el, names[n]) ;\n				}\n			}\n		}\n	};\n</script>';

var getOffsetClass, head, makeTitleSpan, toggleJS, _, _render;

_ = require("underscore");

toggleJS = "onclick=\"j2h.toggleVisibility(this);return false\"";

makeTitleSpan = function(keyname, datatype) {
  if (_.isNumber(keyname)) {
    return "<span class='index'>" + keyname + "&nbsp;</span>";
  } else if (_.isString(keyname)) {
    if (datatype === 'array') {
      return "<span class='attribute collapsible' " + toggleJS + ">" + keyname + "</span>";
    } else if (datatype === 'object') {
      return "<span class='array collapsible' " + toggleJS + ">" + keyname + "</span>";
    } else {
      return "<span class='attribute'>" + keyname + "</span>";
    }
  } else {
    return "";
  }
};

getOffsetClass = function(keyname) {
  if (_.isString(keyname)) {
    return "leftoffset";
  } else {
    return "";
  }
};

_render = function(name, data, options, level) {
  var idx, key, offsetClass, subs, title, val;
  offsetClass = getOffsetClass(name);
  if (_.isArray(data)) {
    title = makeTitleSpan(name, 'array');
    subs = "<div>" + ((function() {
      var _len, _results;
      _results = [];
      for (idx = 0, _len = data.length; idx < _len; idx++) {
        val = data[idx];
        _results.push(_render(idx, val, options, level + 1));
      }
      return _results;
    })()).join("</div><div>") + "</div>";
    return "<div class=\"collapse clearfix\">" + title + "<div class=\"" + offsetClass + "\">" + subs + "</div></div>";
  } else if (_.isNumber(data) || _.isString(data) || _.isDate(data)) {
    title = makeTitleSpan(name);
    return "" + title + "<span>" + data + "</span>";
  } else {
    title = makeTitleSpan(name, 'object');
    subs = "<div>" + ((function() {
      var _results;
      _results = [];
      for (key in data) {
        _results.push(_render(key, data[key], options, level + 1));
      }
      return _results;
    })()).join("</div><div>") + "</div>";
    return "<div class=\"expand clearfix\">" + title + "<div class=\"" + offsetClass + "\">" + subs + "</div></div>";
  }
};

exports.render = function(json, options) {
  return "" + head + (_render(null, json, options, 0));
};

head = '<style type="text/css">\n.leftoffset {\n	padding-left: 20px ;\n}\n.attribute:after {\n	content: \':\';\n}\n.array:after {\n	content: \']\';\n}\n.array:before {\n	content: \'[\';\n}\n.index {\n	font-size: 100% ;\n	color: #999 ;\n	float: left ;\n}\n.clearfix:after {\n	content: ".";\n  display: block;\n  height: 0;\n  clear: both;\n  visibility: hidden;\n}\n.collapsible:hover {\n	text-decoration: underline ;\n}\n.collapse > div {\n	display: none ;\n}\n.collapse > span {\n	font-weight: bold ;\n	font-size: 100% ;\n}\n\n.collapse > span.collapsible:before {\n	border-radius: 2px;\n	border-color: #A44;\n	border-style: solid;\n	border-width: 1px;\n	color: #A44;\n	content: \'+\';\n	display: inline-block;\n	line-height: 7px;\n	margin: 0 2px;\n	overflow: hidden;\n	padding: 1px;\n	font-size: 11px ;\n}\n\n.expand > span.collapsible:before {\n	border: none ;\n	color: #A44;\n	content: \'-\';\n	display: inline-block;\n	line-height: 7px;\n	margin: 4px;\n	overflow: hidden;\n	padding: 1px;\n	font-size: 11px ;\n}\n\n\n</style>\n<script type=text/javascript>\n	j2h = {\n		toggleVisibility: function(el, name) {\n			j2h.toggleClass(el.parentElement,\'collapse expand\') ;\n		},\n		classRe: function(name) {\n			return new RegExp(\'(?:^|\\\\s)\'+name+\'(?!\\\\S)\') ;\n		},\n		addClass: function(el, name) {\n			el.className += " "+name;\n		},\n		removeClass: function(el, name) {\n			var re = j2h.classRe(name) ;\n			el.className  = el.className.replace( j2h.classRe(name) , \'\' )\n		},\n		hasClass: function(el, name) {\n			var re = j2h.classRe(name) ;\n			return j2h.classRe(name).exec(el.className);\n		},\n		toggleClass: function(el, name) {\n			var names = name.split(/\\s+/) ;\n			for (n in names) {\n				if (j2h.hasClass(el, names[n])) {\n					j2h.removeClass(el, names[n]) ;\n				} else {\n					j2h.addClass(el, names[n]) ;\n				}\n			}\n		}\n	};\n</script>';

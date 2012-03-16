_ = require("underscore")
toggleJS = "onclick=\"j2h.toggleVisibility(this);return false\""
makeTitleSpan = (keyname, datatype)->
	if _.isNumber(keyname)
		return "<span class='index'>#{keyname}&nbsp;</span>"
	else if _.isString(keyname)
		if datatype is 'array'
			return "<span class='attribute collapsible' #{toggleJS}>#{keyname}</span>"
		else if datatype is 'object'
			return "<span class='array collapsible' #{toggleJS}>#{keyname}</span>"
		else
			return "<span class='attribute'>#{keyname}</span>"
	else return ""
getOffsetClass = (keyname)->
	if _.isString(keyname)
		return "leftoffset"
	else
		return ""
	
_render = (name, data, options, level)->
	
	offsetClass = getOffsetClass(name)
	if _.isArray(data)
		title = makeTitleSpan(name, 'array') ;
		subs = "<div>"+(_render(idx, val, options, (level+1)) for val, idx in data).join("</div><div>")+"</div>" ;
		return "<div class=\"collapse clearfix\">#{title}<div class=\"#{offsetClass}\">#{subs}</div></div>" ; 
	else if _.isNumber(data) or _.isString(data) or _.isDate(data)
		title = makeTitleSpan(name) ;
		return "#{title}<span>#{data}</span>"
	else
		title = makeTitleSpan(name, 'object') ;
		subs = "<div>"+(_render(key, data[key], options, (level+1)) for key of data).join("</div><div>")+"</div>" ;
		return "<div class=\"expand clearfix\">#{title}<div class=\"#{offsetClass}\">#{subs}</div></div>"  ;
		

exports.render = (json, options)->
	return "#{head}#{_render(null,json, options, 0)}"



head = '''
<style type="text/css">
.leftoffset {
	padding-left: 20px ;
}
.attribute:after {
	content: ':';
}
.array:after {
	content: ']';
}
.array:before {
	content: '[';
}
.index {
	font-size: 100% ;
	color: #999 ;
	float: left ;
}
.clearfix:after {
	content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.collapsible:hover {
	text-decoration: underline ;
}
.collapse > div {
	display: none ;
}
.collapse > span {
	font-weight: bold ;
	font-size: 100% ;
}

.collapse > span.collapsible:before {
	border-radius: 2px;
	border-color: #A44;
	border-style: solid;
	border-width: 1px;
	color: #A44;
	content: '+';
	display: inline-block;
	line-height: 7px;
	margin: 0 2px;
	overflow: hidden;
	padding: 1px;
	font-size: 11px ;
}

.expand > span.collapsible:before {
	border: none ;
	color: #A44;
	content: '-';
	display: inline-block;
	line-height: 7px;
	margin: 4px;
	overflow: hidden;
	padding: 1px;
	font-size: 11px ;
}


</style>
<script type=text/javascript>
	j2h = {
		toggleVisibility: function(el, name) {
			j2h.toggleClass(el.parentElement,'collapse expand') ;
		},
		classRe: function(name) {
			return new RegExp('(?:^|\\\\s)'+name+'(?!\\\\S)') ;
		},
		addClass: function(el, name) {
			el.className += " "+name;
		},
		removeClass: function(el, name) {
			var re = j2h.classRe(name) ;
			el.className  = el.className.replace( j2h.classRe(name) , '' )
		},
		hasClass: function(el, name) {
			var re = j2h.classRe(name) ;
			return j2h.classRe(name).exec(el.className);
		},
		toggleClass: function(el, name) {
			var names = name.split(/\\s+/) ;
			for (n in names) {
				if (j2h.hasClass(el, names[n])) {
					j2h.removeClass(el, names[n]) ;
				} else {
					j2h.addClass(el, names[n]) ;
				}
			}
		}
	};
</script>
'''
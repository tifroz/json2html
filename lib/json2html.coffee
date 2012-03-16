_ = require("underscore")

toggleJS = (options)->
	if options?.plainHtml
		return ""
	else
		"onclick=\"j2h.toggleVisibility(this);return false\""

makeTitleDiv = (options, level, keyname, datatype)->
	if _.isNumber(keyname)
		return "<div class='index'>#{keyname}&nbsp;</div>"
	else if _.isString(keyname)
		if datatype is 'array'
			return "<div class='collapsible level#{level}' #{toggleJS(options)}>[#{keyname}]</div>"
		else if datatype is 'object'
			return "<div class='attribute collapsible level#{level}' #{toggleJS(options)}>#{keyname}</div>"
		else
			return "<div class='leaf level#{level}'>#{keyname}</div>"
	else return ""
	
getContentClass = (keyname)->
	if _.isString(keyname)
		return "content"
	else
		return ""
isLeafValue = (val)->
	return _.isNumber(val) or _.isString(val) or _.isBoolean(val) or _.isDate(val) or _.isNull(val) or _.isUndefined(val) or _.isNaN(val)

isLeafObject = (obj)->
	if not _.isObject(obj)
		return false
	for key, val of obj
		if not isLeafValue(val)
			return false
	return true

isTable = (arr)->
	if not _.isArray(arr)
		return false
	if arr.length is 0 or not _.isObject(arr[0])
		return false
	else
		nonCompliant = _.detect arr, (row)-> not isLeafObject(row)
		if nonCompliant
			return false
		else
			cols = _.keys(arr[0])
			nonCompliant = _.detect arr, (row)-> not _.isEqual cols, _.keys(row)
			if nonCompliant
				return false
			else
				return true
			
drawTable = (arr)->
	drawRow = (headers, rowObj) ->
		return "<td>" + (rowObj[header] for header in headers).join("</td><td>") + "</td>"
	cols = _.keys(arr[0])
	content = ((drawRow(cols, rowObj)) for rowObj in arr)
	
	headingHtml = "<tr><th>" + cols.join("</th><th>") + "</th></tr>" 
	contentHtml = "<tr>" + content.join("</tr><tr>") + "</tr>"
	
	return "<table>#{headingHtml}#{contentHtml}</table>"
	
		
	
render = (name, data, options, level, altrow)->
	contentClass = getContentClass(name)
	altrow = if altrow then "odd" else "even"
	if _.isArray(data)
		title = makeTitleDiv(options, level, name, 'array')
		if isTable(data)
			subs = drawTable(data)
		else
			subs = "<div>"+(render(idx, val, options, (level+1), (idx % 2)) for val, idx in data).join("</div><div>")+"</div>"
		return "<div class=\"collapse clearfix #{altrow}\">#{title}<div class=\"#{contentClass}\">#{subs}</div></div>" 
	else if isLeafValue(data)
		title = makeTitleDiv(options, level, name) ;
		return "#{title}<span>&nbsp;&nbsp;#{data}</span>"
	else
		title = makeTitleDiv(options, level, name, 'object')
		count = 0
		subs = "<div>"+(render(key, data[key], options, (level+1), (count++ % 2) ) for key of data).join("</div><div>")+"</div>"
		return "<div class=\"expand clearfix #{altrow}\">#{title}<div class=\"#{contentClass}\">#{subs}</div></div>"

exports.render = (json, options)->
	return "#{head}#{render(null,json, options, 0, 0)}"



head = '''
<style type="text/css">
table {
	border-collapse:collapse;
}
th {
	color: #888 ;
}
table,th, td {
	border: 1px solid #DDD;
	padding: 10px 5px ;
}
th, td {
	text-align:center;
}
.content {
	padding-left: 30px ;
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
.collapse > div.content {
	display: none ;
}
.collapse > div:first-child {
	font-weight: bold ;
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

.level0 {
	font-size: 25px ;
}
.level1 {
	font-size: 22px ;
}

.even .level1 {
	background-color: #CCC ;
}
.odd .level1 {
	background-color: #EEE ;
}

.leaf {
	color: #888;
	display: inline ;
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
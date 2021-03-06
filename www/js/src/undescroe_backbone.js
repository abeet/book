function() {
    var root = this,
        previousUnderscore = root._,
        breaker = {}, ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype,
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty,
        nativeForEach = ArrayProto.forEach,
        nativeMap = ArrayProto.map,
        nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight,
        nativeFilter = ArrayProto.filter,
        nativeEvery = ArrayProto.every,
        nativeSome = ArrayProto.some,
        nativeIndexOf = ArrayProto.indexOf,
        nativeLastIndexOf = ArrayProto.lastIndexOf,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind,
        _ = function(obj) {
            return obj instanceof _ ? obj : this instanceof _ ? (this._wrapped = obj, void 0) : new _(obj)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = _), exports._ = _) : root._ = _, _.VERSION = "1.4.4";
    var each = _.each = _.forEach = function(obj, iterator, context) {
        if (null != obj)
            if (nativeForEach && obj.forEach === nativeForEach) obj.forEach(iterator, context);
            else
        if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; l > i; i++)
                if (iterator.call(context, obj[i], i, obj) === breaker) return
        } else
            for (var key in obj)
                if (_.has(obj, key) && iterator.call(context, obj[key], key, obj) === breaker) return
    };
    _.map = _.collect = function(obj, iterator, context) {
        var results = [];
        return null == obj ? results : nativeMap && obj.map === nativeMap ? obj.map(iterator, context) : (each(obj, function(value, index, list) {
            results.push(iterator.call(context, value, index, list))
        }), results)
    };
    var reduceError = "Reduce of empty array with no initial value";
    _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (null == obj && (obj = []), nativeReduce && obj.reduce === nativeReduce) return context && (iterator = _.bind(iterator, context)), initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        if (each(obj, function(value, index, list) {
            initial ? memo = iterator.call(context, memo, value, index, list) : (memo = value, initial = !0)
        }), !initial) throw new TypeError(reduceError);
        return memo
    }, _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (null == obj && (obj = []), nativeReduceRight && obj.reduceRight === nativeReduceRight) return context && (iterator = _.bind(iterator, context)), initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length
        }
        if (each(obj, function(value, index, list) {
            index = keys ? keys[--length] : --length, initial ? memo = iterator.call(context, memo, obj[index], index, list) : (memo = obj[index], initial = !0)
        }), !initial) throw new TypeError(reduceError);
        return memo
    }, _.find = _.detect = function(obj, iterator, context) {
        var result;
        return any(obj, function(value, index, list) {
            return iterator.call(context, value, index, list) ? (result = value, !0) : void 0
        }), result
    }, _.filter = _.select = function(obj, iterator, context) {
        var results = [];
        return null == obj ? results : nativeFilter && obj.filter === nativeFilter ? obj.filter(iterator, context) : (each(obj, function(value, index, list) {
            iterator.call(context, value, index, list) && results.push(value)
        }), results)
    }, _.reject = function(obj, iterator, context) {
        return _.filter(obj, function(value, index, list) {
            return !iterator.call(context, value, index, list)
        }, context)
    }, _.every = _.all = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = !0;
        return null == obj ? result : nativeEvery && obj.every === nativeEvery ? obj.every(iterator, context) : (each(obj, function(value, index, list) {
            return (result = result && iterator.call(context, value, index, list)) ? void 0 : breaker
        }), !! result)
    };
    var any = _.some = _.any = function(obj, iterator, context) {
        iterator || (iterator = _.identity);
        var result = !1;
        return null == obj ? result : nativeSome && obj.some === nativeSome ? obj.some(iterator, context) : (each(obj, function(value, index, list) {
            return result || (result = iterator.call(context, value, index, list)) ? breaker : void 0
        }), !! result)
    };
    _.contains = _.include = function(obj, target) {
        return null == obj ? !1 : nativeIndexOf && obj.indexOf === nativeIndexOf ? -1 != obj.indexOf(target) : any(obj, function(value) {
            return value === target
        })
    }, _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2),
            isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            return (isFunc ? method : value[method]).apply(value, args)
        })
    }, _.pluck = function(obj, key) {
        return _.map(obj, function(value) {
            return value[key]
        })
    }, _.where = function(obj, attrs, first) {
        return _.isEmpty(attrs) ? first ? void 0 : [] : _[first ? "find" : "filter"](obj, function(value) {
            for (var key in attrs)
                if (attrs[key] !== value[key]) return !1;
            return !0
        })
    }, _.findWhere = function(obj, attrs) {
        return _.where(obj, attrs, !0)
    }, _.max = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && 65535 > obj.length) return Math.max.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return -1 / 0;
        var result = {
            computed: -1 / 0,
            value: -1 / 0
        };
        return each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            computed >= result.computed && (result = {
                value: value,
                computed: computed
            })
        }), result.value
    }, _.min = function(obj, iterator, context) {
        if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && 65535 > obj.length) return Math.min.apply(Math, obj);
        if (!iterator && _.isEmpty(obj)) return 1 / 0;
        var result = {
            computed: 1 / 0,
            value: 1 / 0
        };
        return each(obj, function(value, index, list) {
            var computed = iterator ? iterator.call(context, value, index, list) : value;
            result.computed > computed && (result = {
                value: value,
                computed: computed
            })
        }), result.value
    }, _.shuffle = function(obj) {
        var rand, index = 0,
            shuffled = [];
        return each(obj, function(value) {
            rand = _.random(index++), shuffled[index - 1] = shuffled[rand], shuffled[rand] = value
        }), shuffled
    };
    var lookupIterator = function(value) {
        return _.isFunction(value) ? value : function(obj) {
            return obj[value]
        }
    };
    _.sortBy = function(obj, value, context) {
        var iterator = lookupIterator(value);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            }
        }).sort(function(left, right) {
            var a = left.criteria,
                b = right.criteria;
            if (a !== b) {
                if (a > b || void 0 === a) return 1;
                if (b > a || void 0 === b) return -1
            }
            return left.index < right.index ? -1 : 1
        }), "value")
    };
    var group = function(obj, value, context, behavior) {
        var result = {}, iterator = lookupIterator(null == value ? _.identity : value);
        return each(obj, function(value, index) {
            var key = iterator.call(context, value, index, obj);
            behavior(result, key, value)
        }), result
    };
    _.groupBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key, value) {
            (_.has(result, key) ? result[key] : result[key] = []).push(value)
        })
    }, _.countBy = function(obj, value, context) {
        return group(obj, value, context, function(result, key) {
            _.has(result, key) || (result[key] = 0), result[key]++
        })
    }, _.sortedIndex = function(array, obj, iterator, context) {
        iterator = null == iterator ? _.identity : lookupIterator(iterator);
        for (var value = iterator.call(context, obj), low = 0, high = array.length; high > low;) {
            var mid = low + high >>> 1;
            value > iterator.call(context, array[mid]) ? low = mid + 1 : high = mid
        }
        return low
    }, _.toArray = function(obj) {
        return obj ? _.isArray(obj) ? slice.call(obj) : obj.length === +obj.length ? _.map(obj, _.identity) : _.values(obj) : []
    }, _.size = function(obj) {
        return null == obj ? 0 : obj.length === +obj.length ? obj.length : _.keys(obj).length
    }, _.first = _.head = _.take = function(array, n, guard) {
        return null == array ? void 0 : null == n || guard ? array[0] : slice.call(array, 0, n)
    }, _.initial = function(array, n, guard) {
        return slice.call(array, 0, array.length - (null == n || guard ? 1 : n))
    }, _.last = function(array, n, guard) {
        return null == array ? void 0 : null == n || guard ? array[array.length - 1] : slice.call(array, Math.max(array.length - n, 0))
    }, _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, null == n || guard ? 1 : n)
    }, _.compact = function(array) {
        return _.filter(array, _.identity)
    };
    var flatten = function(input, shallow, output) {
        return each(input, function(value) {
            _.isArray(value) ? shallow ? push.apply(output, value) : flatten(value, shallow, output) : output.push(value)
        }), output
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, [])
    }, _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1))
    }, _.uniq = _.unique = function(array, isSorted, iterator, context) {
        _.isFunction(isSorted) && (context = iterator, iterator = isSorted, isSorted = !1);
        var initial = iterator ? _.map(array, iterator, context) : array,
            results = [],
            seen = [];
        return each(initial, function(value, index) {
            (isSorted ? index && seen[seen.length - 1] === value : _.contains(seen, value)) || (seen.push(value), results.push(array[index]))
        }), results
    }, _.union = function() {
        return _.uniq(concat.apply(ArrayProto, arguments))
    }, _.intersection = function(array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function(item) {
            return _.every(rest, function(other) {
                return _.indexOf(other, item) >= 0
            })
        })
    }, _.difference = function(array) {
        var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
        return _.filter(array, function(value) {
            return !_.contains(rest, value)
        })
    }, _.zip = function() {
        for (var args = slice.call(arguments), length = _.max(_.pluck(args, "length")), results = Array(length), i = 0; length > i; i++) results[i] = _.pluck(args, "" + i);
        return results
    }, _.object = function(list, values) {
        if (null == list) return {};
        for (var result = {}, i = 0, l = list.length; l > i; i++) values ? result[list[i]] = values[i] : result[list[i][0]] = list[i][1];
        return result
    }, _.indexOf = function(array, item, isSorted) {
        if (null == array) return -1;
        var i = 0,
            l = array.length;
        if (isSorted) {
            if ("number" != typeof isSorted) return i = _.sortedIndex(array, item), array[i] === item ? i : -1;
            i = 0 > isSorted ? Math.max(0, l + isSorted) : isSorted
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (; l > i; i++)
            if (array[i] === item) return i;
        return -1
    }, _.lastIndexOf = function(array, item, from) {
        if (null == array) return -1;
        var hasIndex = null != from;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        for (var i = hasIndex ? from : array.length; i--;)
            if (array[i] === item) return i;
        return -1
    }, _.range = function(start, stop, step) {
        1 >= arguments.length && (stop = start || 0, start = 0), step = arguments[2] || 1;
        for (var len = Math.max(Math.ceil((stop - start) / step), 0), idx = 0, range = Array(len); len > idx;) range[idx++] = start, start += step;
        return range
    };
    var ctor = function() {};
    _.bind = function(func, context) {
        var args, bound;
        if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError;
        return args = slice.call(arguments, 2), bound = function() {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            return Object(result) === result ? result : self
        }
    }, _.partial = function(func) {
        var args = slice.call(arguments, 1);
        return function() {
            return func.apply(this, args.concat(slice.call(arguments)))
        }
    }, _.bindAll = function(obj) {
        var funcs = slice.call(arguments, 1);
        if (0 === funcs.length) throw Error("bindAll must be passed function names");
        return each(funcs, function(f) {
            obj[f] = _.bind(obj[f], obj)
        }), obj
    }, _.memoize = function(func, hasher) {
        var memo = {};
        return hasher || (hasher = _.identity),
        function() {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : memo[key] = func.apply(this, arguments)
        }
    }, _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args)
        }, wait)
    }, _.defer = function(func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)))
    }, _.throttle = function(func, wait, immediate) {
        var context, args, timeout, result, previous = 0,
            later = function() {
                previous = new Date, timeout = null, result = func.apply(context, args)
            };
        return function() {
            var now = new Date;
            previous || immediate !== !1 || (previous = now);
            var remaining = wait - (now - previous);
            return context = this, args = arguments, 0 >= remaining ? (clearTimeout(timeout), timeout = null, previous = now, result = func.apply(context, args)) : timeout || (timeout = setTimeout(later, remaining)), result
        }
    }, _.debounce = function(func, wait, immediate) {
        var timeout, result;
        return function() {
            var context = this,
                args = arguments,
                later = function() {
                    timeout = null, immediate || (result = func.apply(context, args))
                }, callNow = immediate && !timeout;
            return clearTimeout(timeout), timeout = setTimeout(later, wait), callNow && (result = func.apply(context, args)), result
        }
    }, _.once = function(func) {
        var memo, ran = !1;
        return function() {
            return ran ? memo : (ran = !0, memo = func.apply(this, arguments), func = null, memo)
        }
    }, _.wrap = function(func, wrapper) {
        return function() {
            var args = [func];
            return push.apply(args, arguments), wrapper.apply(this, args)
        }
    }, _.compose = function() {
        var funcs = arguments;
        return function() {
            for (var args = arguments, i = funcs.length - 1; i >= 0; i--) args = [funcs[i].apply(this, args)];
            return args[0]
        }
    }, _.after = function(times, func) {
        return 0 >= times ? func() : function() {
            return 1 > --times ? func.apply(this, arguments) : void 0
        }
    }, _.keys = nativeKeys || function(obj) {
        if (obj !== Object(obj)) throw new TypeError("Invalid object");
        var keys = [];
        for (var key in obj) _.has(obj, key) && keys.push(key);
        return keys
    }, _.values = function(obj) {
        var values = [];
        for (var key in obj) _.has(obj, key) && values.push(obj[key]);
        return values
    }, _.pairs = function(obj) {
        var pairs = [];
        for (var key in obj) _.has(obj, key) && pairs.push([key, obj[key]]);
        return pairs
    }, _.invert = function(obj) {
        var result = {};
        for (var key in obj) _.has(obj, key) && (result[obj[key]] = key);
        return result
    }, _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) _.isFunction(obj[key]) && names.push(key);
        return names.sort()
    }, _.extend = function(obj) {
        return each(slice.call(arguments, 1), function(source) {
            if (source)
                for (var prop in source) obj[prop] = source[prop]
        }), obj
    }, _.pick = function(obj) {
        var copy = {}, keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        return each(keys, function(key) {
            key in obj && (copy[key] = obj[key])
        }), copy
    }, _.omit = function(obj) {
        var copy = {}, keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        for (var key in obj) _.contains(keys, key) || (copy[key] = obj[key]);
        return copy
    }, _.defaults = function(obj) {
        return each(slice.call(arguments, 1), function(source) {
            if (source)
                for (var prop in source) void 0 === obj[prop] && (obj[prop] = source[prop])
        }), obj
    }, _.clone = function(obj) {
        return _.isObject(obj) ? _.isArray(obj) ? obj.slice() : _.extend({}, obj) : obj
    }, _.tap = function(obj, interceptor) {
        return interceptor(obj), obj
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b) return a === b;
        a instanceof _ && (a = a._wrapped), b instanceof _ && (b = b._wrapped);
        var className = toString.call(a);
        if (className != toString.call(b)) return !1;
        switch (className) {
            case "[object String]":
                return a == b + "";
            case "[object Number]":
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
            case "[object Date]":
            case "[object Boolean]":
                return +a == +b;
            case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
        }
        if ("object" != typeof a || "object" != typeof b) return !1;
        for (var length = aStack.length; length--;)
            if (aStack[length] == a) return bStack[length] == b;
        aStack.push(a), bStack.push(b);
        var size = 0,
            result = !0;
        if ("[object Array]" == className) {
            if (size = a.length, result = size == b.length)
                for (; size-- && (result = eq(a[size], b[size], aStack, bStack)););
        } else {
            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor)) return !1;
            for (var key in a)
                if (_.has(a, key) && (size++, !(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack)))) break;
            if (result) {
                for (key in b)
                    if (_.has(b, key) && !size--) break;
                result = !size
            }
        }
        return aStack.pop(), bStack.pop(), result
    };
    _.isEqual = function(a, b) {
        return eq(a, b, [], [])
    }, _.isEmpty = function(obj) {
        if (null == obj) return !0;
        if (_.isArray(obj) || _.isString(obj)) return 0 === obj.length;
        for (var key in obj)
            if (_.has(obj, key)) return !1;
        return !0
    }, _.isElement = function(obj) {
        return !(!obj || 1 !== obj.nodeType)
    }, _.isArray = nativeIsArray || function(obj) {
        return "[object Array]" == toString.call(obj)
    }, _.isObject = function(obj) {
        return obj === Object(obj)
    }, each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(name) {
        _["is" + name] = function(obj) {
            return toString.call(obj) == "[object " + name + "]"
        }
    }), _.isArguments(arguments) || (_.isArguments = function(obj) {
        return !(!obj || !_.has(obj, "callee"))
    }), _.isFunction = function(obj) {
        return "function" == typeof obj
    }, _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj))
    }, _.isNaN = function(obj) {
        return _.isNumber(obj) && obj != +obj
    }, _.isBoolean = function(obj) {
        return obj === !0 || obj === !1 || "[object Boolean]" == toString.call(obj)
    }, _.isNull = function(obj) {
        return null === obj
    }, _.isUndefined = function(obj) {
        return void 0 === obj
    }, _.has = function(obj, key) {
        return hasOwnProperty.call(obj, key)
    }, _.noConflict = function() {
        return root._ = previousUnderscore, this
    }, _.identity = function(value) {
        return value
    }, _.times = function(n, iterator, context) {
        for (var accum = Array(n), i = 0; n > i; i++) accum[i] = iterator.call(context, i);
        return accum
    }, _.random = function(min, max) {
        return null == max && (max = min, min = 0), min + Math.floor(Math.random() * (max - min + 1))
    };
    var entityMap = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;"
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);
    var entityRegexes = {
        escape: RegExp("[" + _.keys(entityMap.escape).join("") + "]", "g"),
        unescape: RegExp("(" + _.keys(entityMap.unescape).join("|") + ")", "g")
    };
    _.each(["escape", "unescape"], function(method) {
        _[method] = function(string) {
            return null == string ? "" : ("" + string).replace(entityRegexes[method], function(match) {
                return entityMap[method][match]
            })
        }
    }), _.result = function(object, property) {
        if (null == object) return void 0;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value
    }, _.mixin = function(obj) {
        each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                return push.apply(args, arguments), result.call(this, func.apply(_, args))
            }
        })
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + "";
        return prefix ? prefix + id : id
    }, _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/,
        escapes = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            " ": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    _.template = function(text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g"),
            index = 0,
            source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            return source += text.slice(index, offset).replace(escaper, function(match) {
                return "\\" + escapes[match]
            }), escape && (source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'"), interpolate && (source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'"), evaluate && (source += "';\n" + evaluate + "\n__p+='"), index = offset + match.length, match
        }), source += "';\n", settings.variable || (source = "with(obj||{}){\n" + source + "}\n"), source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
        try {
            render = Function(settings.variable || "obj", "_", source)
        } catch (e) {
            throw e.source = source, e
        }
        if (data) return render(data, _);
        var template = function(data) {
            return render.call(this, data, _)
        };
        return template.source = "function(" + (settings.variable || "obj") + "){\n" + source + "}", template
    }, _.chain = function(obj) {
        return _(obj).chain()
    };
    var result = function(obj) {
        return this._chain ? _(obj).chain() : obj
    };
    _.mixin(_), each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            return method.apply(obj, arguments), "shift" != name && "splice" != name || 0 !== obj.length || delete obj[0], result.call(this, obj)
        }
    }), each(["concat", "join", "slice"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result.call(this, method.apply(this._wrapped, arguments))
        }
    }), _.extend(_.prototype, {
        chain: function() {
            return this._chain = !0, this
        },
        value: function() {
            return this._wrapped
        }
    })
}.call(this), _.templateSettings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    escape: /\{\{-([\s\S]+?)\}\}/g
}, define("underscore-src", [], function() {}),
function() {
    var Backbone, root = this,
        previousBackbone = root.Backbone,
        array = [],
        push = array.push,
        slice = array.slice,
        splice = array.splice;
    Backbone = "undefined" != typeof exports ? exports : root.Backbone = {}, Backbone.VERSION = "1.0.0";
    var _ = root._;
    _ || "undefined" == typeof require || (_ = require("underscore")), Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$, Backbone.noConflict = function() {
        return root.Backbone = previousBackbone, this
    }, Backbone.emulateHTTP = !1, Backbone.emulateJSON = !1;
    var Events = Backbone.Events = {
        on: function(name, callback, context) {
            if (!eventsApi(this, "on", name, [callback, context]) || !callback) return this;
            this._events || (this._events = {});
            var events = this._events[name] || (this._events[name] = []);
            return events.push({
                callback: callback,
                context: context,
                ctx: context || this
            }), this
        },
        once: function(name, callback, context) {
            if (!eventsApi(this, "once", name, [callback, context]) || !callback) return this;
            var self = this,
                once = _.once(function() {
                    self.off(name, once), callback.apply(this, arguments)
                });
            return once._callback = callback, this.on(name, once, context)
        },
        off: function(name, callback, context) {
            var retain, ev, events, names, i, l, j, k;
            if (!this._events || !eventsApi(this, "off", name, [callback, context])) return this;
            if (!name && !callback && !context) return this._events = {}, this;
            for (names = name ? [name] : _.keys(this._events), i = 0, l = names.length; l > i; i++)
                if (name = names[i], events = this._events[name]) {
                    if (this._events[name] = retain = [], callback || context)
                        for (j = 0, k = events.length; k > j; j++) ev = events[j], (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) && retain.push(ev);
                    retain.length || delete this._events[name]
                }
            return this
        },
        trigger: function(name) {
            if (!this._events) return this;
            var args = slice.call(arguments, 1);
            if (!eventsApi(this, "trigger", name, args)) return this;
            var events = this._events[name],
                allEvents = this._events.all;
            return events && triggerEvents(events, args), allEvents && triggerEvents(allEvents, arguments), this
        },
        stopListening: function(obj, name, callback) {
            var listeners = this._listeners;
            if (!listeners) return this;
            var deleteListener = !name && !callback;
            "object" == typeof name && (callback = this), obj && ((listeners = {})[obj._listenerId] = obj);
            for (var id in listeners) listeners[id].off(name, callback, this), deleteListener && delete this._listeners[id];
            return this
        }
    }, eventSplitter = /\s+/,
        eventsApi = function(obj, action, name, rest) {
            if (!name) return !0;
            if ("object" == typeof name) {
                for (var key in name) obj[action].apply(obj, [key, name[key]].concat(rest));
                return !1
            }
            if (eventSplitter.test(name)) {
                for (var names = name.split(eventSplitter), i = 0, l = names.length; l > i; i++) obj[action].apply(obj, [names[i]].concat(rest));
                return !1
            }
            return !0
        }, triggerEvents = function(events, args) {
            var ev, i = -1,
                l = events.length,
                a1 = args[0],
                a2 = args[1],
                a3 = args[2];
            switch (args.length) {
                case 0:
                    for (; l > ++i;)(ev = events[i]).callback.call(ev.ctx);
                    return;
                case 1:
                    for (; l > ++i;)(ev = events[i]).callback.call(ev.ctx, a1);
                    return;
                case 2:
                    for (; l > ++i;)(ev = events[i]).callback.call(ev.ctx, a1, a2);
                    return;
                case 3:
                    for (; l > ++i;)(ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                    return;
                default:
                    for (; l > ++i;)(ev = events[i]).callback.apply(ev.ctx, args)
            }
        }, listenMethods = {
            listenTo: "on",
            listenToOnce: "once"
        };
    _.each(listenMethods, function(implementation, method) {
        Events[method] = function(obj, name, callback) {
            var listeners = this._listeners || (this._listeners = {}),
                id = obj._listenerId || (obj._listenerId = _.uniqueId("l"));
            return listeners[id] = obj, "object" == typeof name && (callback = this), obj[implementation](name, callback, this), this
        }
    }), Events.bind = Events.on, Events.unbind = Events.off, _.extend(Backbone, Events);
    var Model = Backbone.Model = function(attributes, options) {
        var defaults, attrs = attributes || {};
        options || (options = {}), this.cid = _.uniqueId("c"), this.attributes = {}, _.extend(this, _.pick(options, modelOptions)), options.parse && (attrs = this.parse(attrs, options) || {}), (defaults = _.result(this, "defaults")) && (attrs = _.defaults({}, attrs, defaults)), this.set(attrs, options), this.changed = {}, this.initialize.apply(this, arguments)
    }, modelOptions = ["url", "urlRoot", "collection"];
    _.extend(Model.prototype, Events, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return _.clone(this.attributes)
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments)
        },
        get: function(attr) {
            return this.attributes[attr]
        },
        escape: function(attr) {
            return _.escape(this.get(attr))
        },
        has: function(attr) {
            return null != this.get(attr)
        },
        set: function(key, val, options) {
            var attr, attrs, unset, changes, silent, changing, prev, current;
            if (null == key) return this;
            if ("object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, options || (options = {}), !this._validate(attrs, options)) return !1;
            unset = options.unset, silent = options.silent, changes = [], changing = this._changing, this._changing = !0, changing || (this._previousAttributes = _.clone(this.attributes), this.changed = {}), current = this.attributes, prev = this._previousAttributes, this.idAttribute in attrs && (this.id = attrs[this.idAttribute]);
            for (attr in attrs) val = attrs[attr], _.isEqual(current[attr], val) || changes.push(attr), _.isEqual(prev[attr], val) ? delete this.changed[attr] : this.changed[attr] = val, unset ? delete current[attr] : current[attr] = val;
            if (!silent) {
                changes.length && (this._pending = !0);
                for (var i = 0, l = changes.length; l > i; i++) this.trigger("change:" + changes[i], this, current[changes[i]], options)
            }
            if (changing) return this;
            if (!silent)
                for (; this._pending;) this._pending = !1, this.trigger("change", this, options);
            return this._pending = !1, this._changing = !1, this
        },
        unset: function(attr, options) {
            return this.set(attr, void 0, _.extend({}, options, {
                unset: !0
            }))
        },
        clear: function(options) {
            var attrs = {};
            for (var key in this.attributes) attrs[key] = void 0;
            return this.set(attrs, _.extend({}, options, {
                unset: !0
            }))
        },
        hasChanged: function(attr) {
            return null == attr ? !_.isEmpty(this.changed) : _.has(this.changed, attr)
        },
        changedAttributes: function(diff) {
            if (!diff) return this.hasChanged() ? _.clone(this.changed) : !1;
            var val, changed = !1,
                old = this._changing ? this._previousAttributes : this.attributes;
            for (var attr in diff) _.isEqual(old[attr], val = diff[attr]) || ((changed || (changed = {}))[attr] = val);
            return changed
        },
        previous: function(attr) {
            return null != attr && this._previousAttributes ? this._previousAttributes[attr] : null
        },
        previousAttributes: function() {
            return _.clone(this._previousAttributes)
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
            var model = this,
                success = options.success;
            return options.success = function(resp) {
                return model.set(model.parse(resp, options), options) ? (success && success(model, resp, options), model.trigger("sync", model, resp, options), void 0) : !1
            }, wrapError(this, options), this.sync("read", this, options)
        },
        save: function(key, val, options) {
            var attrs, method, xhr, attributes = this.attributes;
            if (null == key || "object" == typeof key ? (attrs = key, options = val) : (attrs = {})[key] = val, !(!attrs || options && options.wait || this.set(attrs, options))) return !1;
            if (options = _.extend({
                validate: !0
            }, options), !this._validate(attrs, options)) return !1;
            attrs && options.wait && (this.attributes = _.extend({}, attributes, attrs)), void 0 === options.parse && (options.parse = !0);
            var model = this,
                success = options.success;
            return options.success = function(resp) {
                model.attributes = attributes;
                var serverAttrs = model.parse(resp, options);
                return options.wait && (serverAttrs = _.extend(attrs || {}, serverAttrs)), _.isObject(serverAttrs) && !model.set(serverAttrs, options) ? !1 : (success && success(model, resp, options), model.trigger("sync", model, resp, options), void 0)
            }, wrapError(this, options), method = this.isNew() ? "create" : options.patch ? "patch" : "update", "patch" === method && (options.attrs = attrs), xhr = this.sync(method, this, options), attrs && options.wait && (this.attributes = attributes), xhr
        },
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var model = this,
                success = options.success,
                destroy = function() {
                    model.trigger("destroy", model, model.collection, options)
                };
            if (options.success = function(resp) {
                (options.wait || model.isNew()) && destroy(), success && success(model, resp, options), model.isNew() || model.trigger("sync", model, resp, options)
            }, this.isNew()) return options.success(), !1;
            wrapError(this, options);
            var xhr = this.sync("delete", this, options);
            return options.wait || destroy(), xhr
        },
        url: function() {
            var base = _.result(this, "urlRoot") || _.result(this.collection, "url") || urlError();
            return this.isNew() ? base : base + ("/" === base.charAt(base.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(resp) {
            return resp
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return null == this.id
        },
        isValid: function(options) {
            return this._validate({}, _.extend(options || {}, {
                validate: !0
            }))
        },
        _validate: function(attrs, options) {
            if (!options.validate || !this.validate) return !0;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validationError = this.validate(attrs, options) || null;
            return error ? (this.trigger("invalid", this, error, _.extend(options || {}, {
                validationError: error
            })), !1) : !0
        }
    });
    var modelMethods = ["keys", "values", "pairs", "invert", "pick", "omit"];
    _.each(modelMethods, function(method) {
        Model.prototype[method] = function() {
            var args = slice.call(arguments);
            return args.unshift(this.attributes), _[method].apply(_, args)
        }
    });
    var Collection = Backbone.Collection = function(models, options) {
        options || (options = {}), options.url && (this.url = options.url), options.model && (this.model = options.model), void 0 !== options.comparator && (this.comparator = options.comparator), this._reset(), this.initialize.apply(this, arguments), models && this.reset(models, _.extend({
            silent: !0
        }, options))
    }, setOptions = {
            add: !0,
            remove: !0,
            merge: !0
        }, addOptions = {
            add: !0,
            merge: !1,
            remove: !1
        };
    _.extend(Collection.prototype, Events, {
        model: Model,
        initialize: function() {},
        toJSON: function(options) {
            return this.map(function(model) {
                return model.toJSON(options)
            })
        },
        sync: function() {
            return Backbone.sync.apply(this, arguments)
        },
        add: function(models, options) {
            return this.set(models, _.defaults(options || {}, addOptions))
        },
        remove: function(models, options) {
            models = _.isArray(models) ? models.slice() : [models], options || (options = {});
            var i, l, index, model;
            for (i = 0, l = models.length; l > i; i++) model = this.get(models[i]), model && (delete this._byId[model.id], delete this._byId[model.cid], index = this.indexOf(model), this.models.splice(index, 1), this.length--, options.silent || (options.index = index, model.trigger("remove", model, this, options)), this._removeReference(model));
            return this
        },
        set: function(models, options) {
            options = _.defaults(options || {}, setOptions), options.parse && (models = this.parse(models, options)), _.isArray(models) || (models = models ? [models] : []);
            var i, l, model, existing, sort, at = options.at,
                sortable = this.comparator && null == at && options.sort !== !1,
                sortAttr = _.isString(this.comparator) ? this.comparator : null,
                toAdd = [],
                toRemove = [],
                modelMap = {};
            for (i = 0, l = models.length; l > i; i++)(model = this._prepareModel(models[i], options)) && ((existing = this.get(model)) ? (options.remove && (modelMap[existing.cid] = !0), options.merge && (existing.set(model.attributes, options), sortable && !sort && existing.hasChanged(sortAttr) && (sort = !0))) : options.add && (toAdd.push(model), model.on("all", this._onModelEvent, this), this._byId[model.cid] = model, null != model.id && (this._byId[model.id] = model)));
            if (options.remove) {
                for (i = 0, l = this.length; l > i; ++i) modelMap[(model = this.models[i]).cid] || toRemove.push(model);
                toRemove.length && this.remove(toRemove, options)
            }
            if (toAdd.length && (sortable && (sort = !0), this.length += toAdd.length, null != at ? splice.apply(this.models, [at, 0].concat(toAdd)) : push.apply(this.models, toAdd)), sort && this.sort({
                silent: !0
            }), options.silent) return this;
            for (i = 0, l = toAdd.length; l > i; i++)(model = toAdd[i]).trigger("add", model, this, options);
            return sort && this.trigger("sort", this, options), this
        },
        reset: function(models, options) {
            options || (options = {});
            for (var i = 0, l = this.models.length; l > i; i++) this._removeReference(this.models[i]);
            return options.previousModels = this.models, this._reset(), this.add(models, _.extend({
                silent: !0
            }, options)), options.silent || this.trigger("reset", this, options), this
        },
        push: function(model, options) {
            return model = this._prepareModel(model, options), this.add(model, _.extend({
                at: this.length
            }, options)), model
        },
        pop: function(options) {
            var model = this.at(this.length - 1);
            return this.remove(model, options), model
        },
        unshift: function(model, options) {
            return model = this._prepareModel(model, options), this.add(model, _.extend({
                at: 0
            }, options)), model
        },
        shift: function(options) {
            var model = this.at(0);
            return this.remove(model, options), model
        },
        slice: function(begin, end) {
            return this.models.slice(begin, end)
        },
        get: function(obj) {
            return null == obj ? void 0 : this._byId[null != obj.id ? obj.id : obj.cid || obj]
        },
        at: function(index) {
            return this.models[index]
        },
        where: function(attrs, first) {
            return _.isEmpty(attrs) ? first ? void 0 : [] : this[first ? "find" : "filter"](function(model) {
                for (var key in attrs)
                    if (attrs[key] !== model.get(key)) return !1;
                return !0
            })
        },
        findWhere: function(attrs) {
            return this.where(attrs, !0)
        },
        sort: function(options) {
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            return options || (options = {}), _.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(_.bind(this.comparator, this)), options.silent || this.trigger("sort", this, options), this
        },
        sortedIndex: function(model, value, context) {
            value || (value = this.comparator);
            var iterator = _.isFunction(value) ? value : function(model) {
                    return model.get(value)
                };
            return _.sortedIndex(this.models, model, iterator, context)
        },
        pluck: function(attr) {
            return _.invoke(this.models, "get", attr)
        },
        fetch: function(options) {
            options = options ? _.clone(options) : {}, void 0 === options.parse && (options.parse = !0);
            var success = options.success,
                collection = this;
            return options.success = function(resp) {
                var method = options.reset ? "reset" : "set";
                collection[method](resp, options), success && success(collection, resp, options), collection.trigger("sync", collection, resp, options)
            }, wrapError(this, options), this.sync("read", this, options)
        },
        create: function(model, options) {
            if (options = options ? _.clone(options) : {}, !(model = this._prepareModel(model, options))) return !1;
            options.wait || this.add(model, options);
            var collection = this,
                success = options.success;
            return options.success = function(resp) {
                options.wait && collection.add(model, options), success && success(model, resp, options)
            }, model.save(null, options), model
        },
        parse: function(resp) {
            return resp
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0, this.models = [], this._byId = {}
        },
        _prepareModel: function(attrs, options) {
            if (attrs instanceof Model) return attrs.collection || (attrs.collection = this), attrs;
            options || (options = {}), options.collection = this;
            var model = new this.model(attrs, options);
            return model._validate(attrs, options) ? model : (this.trigger("invalid", this, attrs, options), !1)
        },
        _removeReference: function(model) {
            this === model.collection && delete model.collection, model.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(event, model, collection, options) {
            ("add" !== event && "remove" !== event || collection === this) && ("destroy" === event && this.remove(model, options), model && event === "change:" + model.idAttribute && (delete this._byId[model.previous(model.idAttribute)], null != model.id && (this._byId[model.id] = model)), this.trigger.apply(this, arguments))
        }
    });
    var methods = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    _.each(methods, function(method) {
        Collection.prototype[method] = function() {
            var args = slice.call(arguments);
            return args.unshift(this.models), _[method].apply(_, args)
        }
    });
    var attributeMethods = ["groupBy", "countBy", "sortBy"];
    _.each(attributeMethods, function(method) {
        Collection.prototype[method] = function(value, context) {
            var iterator = _.isFunction(value) ? value : function(model) {
                    return model.get(value)
                };
            return _[method](this.models, iterator, context)
        }
    });
    var View = Backbone.View = function(options) {
        this.cid = _.uniqueId("view"), this._configure(options || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    }, delegateEventSplitter = /^(\S+)\s*(.*)$/,
        viewOptions = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    _.extend(View.prototype, Events, {
        tagName: "div",
        $: function(selector) {
            return this.$el.find(selector)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            return this.$el.remove(), this.stopListening(), this
        },
        setElement: function(element, delegate) {
            return this.$el && this.undelegateEvents(), this.$el = element instanceof Backbone.$ ? element : Backbone.$(element), this.el = this.$el[0], delegate !== !1 && this.delegateEvents(), this
        },
        delegateEvents: function(events) {
            if (!events && !(events = _.result(this, "events"))) return this;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (_.isFunction(method) || (method = this[events[key]]), method) {
                    var match = key.match(delegateEventSplitter),
                        eventName = match[1],
                        selector = match[2];
                    method = _.bind(method, this), eventName += ".delegateEvents" + this.cid, "" === selector ? this.$el.on(eventName, method) : this.$el.on(eventName, selector, method)
                }
            }
            return this
        },
        undelegateEvents: function() {
            return this.$el.off(".delegateEvents" + this.cid), this
        },
        _configure: function(options) {
            this.options && (options = _.extend({}, _.result(this, "options"), options)), _.extend(this, _.pick(options, viewOptions)), this.options = options
        },
        _ensureElement: function() {
            if (this.el) this.setElement(_.result(this, "el"), !1);
            else {
                var attrs = _.extend({}, _.result(this, "attributes"));
                this.id && (attrs.id = _.result(this, "id")), this.className && (attrs["class"] = _.result(this, "className"));
                var $el = Backbone.$("<" + _.result(this, "tagName") + ">").attr(attrs);
                this.setElement($el, !1)
            }
        }
    }), Backbone.sync = function(method, model, options) {
        var type = methodMap[method];
        _.defaults(options || (options = {}), {
            emulateHTTP: Backbone.emulateHTTP,
            emulateJSON: Backbone.emulateJSON
        });
        var params = {
            type: type,
            dataType: "json"
        };
        if (options.url || (params.url = _.result(model, "url") || urlError()), null != options.data || !model || "create" !== method && "update" !== method && "patch" !== method || (params.contentType = "application/json", params.data = JSON.stringify(options.attrs || model.toJSON(options))), options.emulateJSON && (params.contentType = "application/x-www-form-urlencoded", params.data = params.data ? {
            model: params.data
        } : {}), options.emulateHTTP && ("PUT" === type || "DELETE" === type || "PATCH" === type)) {
            params.type = "POST", options.emulateJSON && (params.data._method = type);
            var beforeSend = options.beforeSend;
            options.beforeSend = function(xhr) {
                return xhr.setRequestHeader("X-HTTP-Method-Override", type), beforeSend ? beforeSend.apply(this, arguments) : void 0
            }
        }
        "GET" === params.type || options.emulateJSON || (params.processData = !1), "PATCH" !== params.type || !window.ActiveXObject || window.external && window.external.msActiveXFilteringEnabled || (params.xhr = function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        });
        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        return model.trigger("request", model, xhr, options), xhr
    };
    var methodMap = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    Backbone.ajax = function() {
        return Backbone.$.ajax.apply(Backbone.$, arguments)
    };
    var Router = Backbone.Router = function(options) {
        options || (options = {}), options.routes && (this.routes = options.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    }, optionalParam = /\((.*?)\)/g,
        namedParam = /(\(\?)?:\w+/g,
        splatParam = /\*\w+/g,
        escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    _.extend(Router.prototype, Events, {
        initialize: function() {},
        route: function(route, name, callback) {
            _.isRegExp(route) || (route = this._routeToRegExp(route)), _.isFunction(name) && (callback = name, name = ""), callback || (callback = this[name]);
            var router = this;
            return Backbone.history.route(route, function(fragment) {
                var args = router._extractParameters(route, fragment);
                callback && callback.apply(router, args), router.trigger.apply(router, ["route:" + name].concat(args)), router.trigger("route", name, args), Backbone.history.trigger("route", router, name, args)
            }), this
        },
        navigate: function(fragment, options) {
            return Backbone.history.navigate(fragment, options), this
        },
        _bindRoutes: function() {
            if (this.routes) {
                this.routes = _.result(this, "routes");
                for (var route, routes = _.keys(this.routes); null != (route = routes.pop());) this.route(route, this.routes[route])
            }
        },
        _routeToRegExp: function(route) {
            return route = route.replace(escapeRegExp, "\\$&").replace(optionalParam, "(?:$1)?").replace(namedParam, function(match, optional) {
                return optional ? match : "([^/]+)"
            }).replace(splatParam, "(.*?)"), RegExp("^" + route + "$")
        },
        _extractParameters: function(route, fragment) {
            var params = route.exec(fragment).slice(1);
            return _.map(params, function(param) {
                return param ? decodeURIComponent(param) : null
            })
        }
    });
    var History = Backbone.History = function() {
        this.handlers = [], _.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
    }, routeStripper = /^[#\/]|\s+$/g,
        rootStripper = /^\/+|\/+$/g,
        isExplorer = /msie [\w.]+/,
        trailingSlash = /\/$/;
    History.started = !1, _.extend(History.prototype, Events, {
        interval: 50,
        getHash: function(window) {
            var match = (window || this).location.href.match(/#(.*)$/);
            return match ? match[1] : ""
        },
        getFragment: function(fragment, forcePushState) {
            if (null == fragment)
                if (this._hasPushState || !this._wantsHashChange || forcePushState) {
                    fragment = this.location.pathname;
                    var root = this.root.replace(trailingSlash, "");
                    fragment.indexOf(root) || (fragment = fragment.substr(root.length))
                } else fragment = this.getHash();
            return fragment.replace(routeStripper, "")
        },
        start: function(options) {
            if (History.started) throw Error("Backbone.history has already been started");
            History.started = !0, this.options = _.extend({}, {
                root: "/"
            }, this.options, options), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && this.history && this.history.pushState);
            var fragment = this.getFragment(),
                docMode = document.documentMode,
                oldIE = isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || 7 >= docMode);
            this.root = ("/" + this.root + "/").replace(rootStripper, "/"), oldIE && this._wantsHashChange && (this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(fragment)), this._hasPushState ? Backbone.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !oldIE ? Backbone.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = fragment;
            var loc = this.location,
                atRoot = loc.pathname.replace(/[^\/]$/, "$&/") === this.root;
            return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot ? (this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && atRoot && loc.hash && (this.fragment = this.getHash().replace(routeStripper, ""), this.history.replaceState({}, document.title, this.root + this.fragment + loc.search)), this.options.silent ? void 0 : this.loadUrl())
        },
        stop: function() {
            Backbone.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), History.started = !1
        },
        route: function(route, callback) {
            this.handlers.unshift({
                route: route,
                callback: callback
            })
        },
        checkUrl: function() {
            var current = this.getFragment();
            return current === this.fragment && this.iframe && (current = this.getFragment(this.getHash(this.iframe))), current === this.fragment ? !1 : (this.iframe && this.navigate(current), this.loadUrl() || this.loadUrl(this.getHash()), void 0)
        },
        loadUrl: function(fragmentOverride) {
            var fragment = this.fragment = this.getFragment(fragmentOverride),
                matched = _.any(this.handlers, function(handler) {
                    return handler.route.test(fragment) ? (handler.callback(fragment), !0) : void 0
                });
            return matched
        },
        navigate: function(fragment, options) {
            if (!History.started) return !1;
            if (options && options !== !0 || (options = {
                trigger: options
            }), fragment = this.getFragment(fragment || ""), this.fragment !== fragment) {
                this.fragment = fragment;
                var url = this.root + fragment;
                if (this._hasPushState) this.history[options.replace ? "replaceState" : "pushState"]({}, document.title, url);
                else {
                    if (!this._wantsHashChange) return this.location.assign(url);
                    this._updateHash(this.location, fragment, options.replace), this.iframe && fragment !== this.getFragment(this.getHash(this.iframe)) && (options.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, fragment, options.replace))
                }
                options.trigger && this.loadUrl(fragment)
            }
        },
        _updateHash: function(location, fragment, replace) {
            if (replace) {
                var href = location.href.replace(/(javascript:|#).*$/, "");
                location.replace(href + "#" + fragment)
            } else location.hash = "#" + fragment
        }
    }), Backbone.history = new History;
    var extend = function(protoProps, staticProps) {
        var child, parent = this;
        child = protoProps && _.has(protoProps, "constructor") ? protoProps.constructor : function() {
            return parent.apply(this, arguments)
        }, _.extend(child, parent, staticProps);
        var Surrogate = function() {
            this.constructor = child
        };
        return Surrogate.prototype = parent.prototype, child.prototype = new Surrogate, protoProps && _.extend(child.prototype, protoProps), child.__super__ = parent.prototype, child
    };
    Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;
    var urlError = function() {
        throw Error('A "url" property or function must be specified')
    }, wrapError = function(model, options) {
            var error = options.error;
            options.error = function(resp) {
                error && error(model, resp, options), model.trigger("error", model, resp, options)
            }
        }
}.call(this), define("backbone-src", ["jquery-src", "underscore-src"], function() {});

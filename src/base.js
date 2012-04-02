/**
 * @fileOverview 常用扩展。
 * @author sundongguo@gmail.com
 * @version 20111201
 */
(function() {
//==================================================[浏览器信息扩展]
  /*
   * 常见浏览器的 navigator.userAgent：
   * IE6      Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)
   * IE7      Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C)
   * IE8      Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C)
   * IE9      Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)
   * Firefox7 Mozilla/5.0 (Windows NT 6.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1
   * Chrome2  Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1
   * Safari5  Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22
   * Opera11  Opera/9.80 (Windows NT 6.1; U; en) Presto/2.9.168 Version/11.52
   *
   * 扩展属性：
   *   navigator.userAgentInfo
   *   navigator.userAgentInfo.engine
   *   navigator.userAgentInfo.name
   *   navigator.userAgentInfo.version
   *   navigator.inStandardsMode
   *   navigator.isIE
   *   navigator.isIE9
   *   navigator.isIElt9
   *   navigator.isIE8
   *   navigator.isIElt8
   *   navigator.isIE7
   *   navigator.isIE6
   *   navigator.isFirefox
   *   navigator.isChrome
   *   navigator.isSafari
   *   navigator.isOpera
   */

  /**
   * 扩展 navigator 对象，提供更多关于浏览器的信息。
   * @name navigator
   * @namespace
   */

//--------------------------------------------------[navigator.*]
  /**
   * 从 navigator.userAgent 中提取的常用信息。
   * @name userAgentInfo
   * @memberOf navigator
   * @type Object
   * @description
   *   注意：
   *   navigator.userAgentInfo 下的三个属性是根据 navigator.userAgent 得到的，仅供参考使用，不建议用在代码逻辑判断中。
   */

  /**
   * 浏览器渲染引擎的类型，值为以下之一：Trident|WebKit|Gecko|Presto。
   * @name userAgentInfo.engine
   * @memberOf navigator
   * @type string
   */

  /**
   * 浏览器名称，值为以下之一：IE|Firefox|Chrome|Safari|Opera。
   * @name userAgentInfo.name
   * @memberOf navigator
   * @type string
   */

  /**
   * 浏览器的版本号。
   * @name userAgentInfo.version
   * @memberOf navigator
   * @type string
   */

  /**
   * 是否工作在标准模式下。
   * @name inStandardsMode
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE。
   * @name isIE
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE9。
   * @name isIE9
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE，且版本小于 9。
   * @name isIElt9
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE8。
   * @name isIE8
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE，且版本小于 8。
   * @name isIElt8
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE7。
   * @name isIE7
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 IE6。
   * @name isIE6
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Firefox。
   * @name isFirefox
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Chrome。
   * @name isChrome
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Safari。
   * @name isSafari
   * @memberOf navigator
   * @type boolean
   */

  /**
   * 浏览器是否为 Opera。
   * @name isOpera
   * @memberOf navigator
   * @type boolean
   */

  Object.append(navigator, function() {
    // 从 navigator.userAgent 中分离信息。
    var engine = 'Unknown';
    var name = 'Unknown';
    var version = 0;
    var userAgent = navigator.userAgent;
    if (/Trident|MSIE/.test(userAgent)) {
      engine = 'Trident';
    } else if (/WebKit/.test(userAgent)) {
      engine = 'WebKit';
    } else if (/Gecko/.test(userAgent)) {
      engine = 'Gecko';
    } else if (/Presto/.test(userAgent)) {
      engine = 'Presto';
    }
    if (userAgent.match(/(IE|Firefox|Chrome|Safari|Opera)(?: |\/)(\d+)/)) {
      name = RegExp.$1;
      version = Number.toInteger(RegExp.$2);
      if (userAgent.match(/Version\/(\d+)/)) {
        version = Number.toInteger(RegExp.$1);
      }
    }
    // 检查工作模式。
    var inStandardsMode = document.compatMode === 'CSS1Compat';
    !inStandardsMode && window.console && console.warn('Browser is working in non-standards mode.');
    // 浏览器特性判断。
    var isIE = false;
    var isIE9 = false;
    var isIElt9 = false;
    var isIE8 = false;
    var isIElt8 = false;
    var isIE7 = false;
    var isIE6 = false;
    var isFirefox = false;
    var isChrome = false;
    var isSafari = false;
    var isOpera = false;
    var html = document.documentElement;
    if ('ActiveXObject' in window) {
      isIE = true;
      if (inStandardsMode) {
        if ('HTMLElement' in window) {
          isIE9 = true;
        } else if ('Element' in window) {
          isIE8 = true;
        } else if ('minWidth' in html.currentStyle) {
          isIE7 = true;
        } else {
          isIE6 = true;
        }
      }
      isIElt9 = isIE8 || isIE7 || isIE6;
      isIElt8 = isIE7 || isIE6;
    } else if ('uneval' in window) {
      isFirefox = true;
    } else if (getComputedStyle(html, null).getPropertyValue('-webkit-user-select')) {
      if ('chrome' in window) {
        isChrome = true;
      } else {
        isSafari = true;
      }
    } else if ('opera' in window) {
      isOpera = true;
    }
    // 返回扩展对象。
    return {
      userAgentInfo: {
        engine: engine,
        name: name,
        version: version
      },
      inStandardsMode: inStandardsMode,
      isIE: isIE,
      isIE9: isIE9,
      isIElt9: isIElt9,
      isIE8: isIE8,
      isIElt8: isIElt8,
      isIE7: isIE7,
      isIE6: isIE6,
      isFirefox: isFirefox,
      isChrome: isChrome,
      isSafari: isSafari,
      isOpera: isOpera
    };
  }());

//==================================================[页面地址信息扩展]
  /*
   * 页面地址信息扩展。
   *
   * 扩展属性：
   *   location.parameters
   */

  /**
   * 扩展 location 对象。
   * @name location
   * @namespace
   */

//--------------------------------------------------[location.parameters]
  /**
   * 获取当前页面的 Query String 中携带的所有参数。
   * @name parameters
   * @memberOf location
   * @type Object
   * @description
   *   注意：
   *   当地址栏的字符有非 ASCII 字符，或有非法的查询字符串时，会有兼容性问题。
   * @example
   *   // 设页面地址为 test.html?a=ok&b=100&b=128
   *   location.parameters
   *   // {a:'ok', b:['100', '128']}
   * @see http://w3help.org/zh-cn/causes/HD9001
   */
  Object.append(location, function() {
    // 查找并保存页面参数。
    var parameters = {};
    var searchString = location.search.slice(1);
    if (searchString) {
      searchString.split('&').forEach(function(item) {
        var valuePair = item.split('=');
        var key = valuePair[0];
        var value = valuePair[1];
        if (key in parameters) {
          typeof parameters[key] === 'string' ? parameters[key] = [parameters[key], value] : parameters[key].push(value);
        } else {
          parameters[key] = value;
        }
      });
    }
    // 返回扩展对象。
    return {parameters: parameters};
  }());

//==================================================[全局方法]
  /*
   * 提供全局方法。
   *
   * 扩展方法：
   *   typeOf
   *   execScript
   *   getNamespace
   */

  /**
   * 全局对象。
   * @name Global
   * @namespace
   */

//--------------------------------------------------[typeOf]
  var types = {};
  ['Boolean', 'Number', 'String', 'Array', 'Date', 'RegExp', 'Error', 'Math', 'JSON', 'Arguments'].forEach(function(type) {
    types['[object ' + type + ']'] = 'object.' + type;
  });
  var TO_STRING = Object.prototype.toString;
  var RE_FUNCTION = /^\s+function .+\s+\[native code\]\s+\}\s+$/;

  /**
   * 判断提供的值的数据类型，比 typeof 运算符返回的结果更明确（将对结果为 'object' 的情况进行更细致的区分）。
   * @name typeOf
   * @memberOf Global
   * @function
   * @param {*} value 要判断的值。
   * @returns {string} 值的类型，可能为以下几种情况之一：
   *   undefined
   *   boolean
   *   number
   *   string
   *   function
   *   null
   *   object.Boolean
   *   object.Number
   *   object.String
   *   object.Array
   *   object.Date
   *   object.RegExp
   *   object.Error
   *   object.Math
   *   object.JSON
   *   object.Arguments
   *   object.Global
   *   object.Node
   *   object.Collection
   *   object.Object
   * @description
   *   注意：
   *   一些特殊的对象，如 IE7 IE8 中的 XMLHttpRequest，是作为构造函数使用的，但使用本方法将得到 'object.Object' 的结果。考虑到需要判断这类对象的情况极为少见，因此未作处理。
   *   IE6 IE7 IE8 中在试图访问某些对象提供的属性/方法时，如 new ActiveXObject('Microsoft.XMLHTTP').abort，将抛出“对象不支持此属性或方法”的异常，因此也无法使用本方法对其进行判断。但可以对其使用 typeof 运算符并得到结果 'unknown'。

   * @example
   *   typeOf(document);
   *   // 'object.Node'
   * @see http://mootools.net/
   * @see http://jquery.com/
   */
  window.typeOf = function(value) {
    var type = typeof value;
    // Safari 中类型为 HTMLCollection 的值 type === 'function'。
    if (type === 'function' && typeof value.item === 'function') {
      type = 'object.Collection';
    }
    // 进一步判断 type === 'object' 的情况。
    if (type === 'object') {
      if (value === null) {
        type = 'null';
      } else {
        // 使用 Object.prototype.toString 判断。
        type = types[TO_STRING.call(value)] || 'object.Object';
        if (type === 'object.Object') {
          // 转化为字符串判断。
          var string = value + '';
          if (string === '[object Window]' || string === '[object DOMWindow]') {
            type = 'object.Global';
          } else if (string === '[object JSON]') {
            type = 'object.JSON';
          } else {
            // 使用特性判断。
            if (typeof value.length == 'number') {
              if ('navigator' in value) {
                type = 'object.Global';
              } else if ('callee' in value) {
                type = 'object.Arguments';
              } else if ('item' in value) {
                type = 'object.Collection';
              }
            } else if ('nodeName' in value) {
              type = 'object.Node';
            } else if (RE_FUNCTION.test(string)) {
              type = 'function';
            }
          }
        }
      }
    }
    return type;
  };

//--------------------------------------------------[execScript]
  /**
   * 将字符串作为脚本执行，执行时的作用域为全局作用域。
   * @name execScript
   * @memberOf Global
   * @function
   * @param {string} code 要执行的代码。
   * @example
   *   var a;
   *   execScript('a = 128 * 2 + 256;');
   *   a;
   *   // 512
   */
  if (!window.execScript) {
    window.execScript = function(code) {
      window.eval(code);
    };
  }

//--------------------------------------------------[getNamespace]
  /**
   * 获取一个命名空间，如果该命名空间不存在，将创建并返回这个命名空间。
   * @name getNamespace
   * @memberOf Global
   * @function
   * @param {string} namespace 命名空间的字符串形式。
   * @returns {Object} 命名空间对象。
   * @example
   *   var finale = getNamespace('data.championship.finale');
   *   finale.getRankingList = function() {...};
   */
  window.getNamespace = function(namespace) {
    var o = window;
    namespace.split('.').forEach(function(item) {
      o = item in o ? o[item] : o[item] = {};
    });
    return o;
  };

//==================================================[组件]
  /*
   * 提供组件的构造器。
   * 为组件的实例提供 on/off/fire 方法，这些方法依赖组件实例自身的 event 属性。
   * <Object event> {
   *   <string type>: <Array handlers> [
   *     <Object handler>: {
   *       name: <string>
   *       listener: <Function>
   *     }
   *   ]
   * };
   *
   * 扩展方法：
   *   createComponent
   * 命名空间：
   *   components
   */

//--------------------------------------------------[Component Constructor]
  /**
   * 创建一个组件。
   * @name Component
   * @constructor
   * @param {Function} constructor 组件构造函数。
   *   <ul>
   *     <li>声明 constructor 时，其最后一个形参必须是一个可选参数 options。即便一个组件不需要 options，也应将其写入形参内。</li>
   *     <li>不要在 constructor 中访问 options 形参，因为此形参并不会被传入 constructor。要访问 options 形参的属性，直接访问实例的同名属性即可。</li>
   *     <li>必须指定 constructor.options，以代表默认选项。即便一个组件不需要默认选项，也应将 constructor.options 设置为空对象。</li>
   *     <li>constructor、constructor.options、constructor.prototype 内均不能设置实例的 events/on/off/fire 属性。</li>
   *   </ul>
   * @description
   *   本方法本质是包装 constructor，以加入对事件的支持，并能自动处理默认选项和指定选项。
   */
  function Component(constructor) {
    // 组件的包装构造函数，为实例加入 events，并自动处理默认和指定的 options。
    var ComponentConstructor = function() {
      // 追加默认 options 到实例对象。
      Object.append(this, constructor.options);
      // 追加指定的 options 到实例对象。
      var parameters = Array.from(arguments);
      var formalParameterLength = constructor.length;
      var actualParameterLength = arguments.length;
      if (formalParameterLength !== actualParameterLength) {
        parameters.length = formalParameterLength;
      }
      // 移除实参中的 options。
      Object.append(this, parameters.pop() || {});
      // 实例的 events 必须为以下指定的空对象。
      this.events = {};
      constructor.apply(this, parameters);
    };
    // 将 Component.prototype 添加到 ComponentConstructor 的原型链。
    var ComponentPrototype = function() {
    };
    ComponentPrototype.prototype = Component.prototype;
    ComponentConstructor.prototype = new ComponentPrototype();
    ComponentConstructor.prototype.constructor = ComponentConstructor;
    ComponentConstructor.prototype.superPrototype = ComponentPrototype.prototype;
    // 将 constructor 的原型内的属性追加到 Component 的原型中。
    Object.append(ComponentConstructor.prototype, constructor.prototype, {blackList: ['on', 'off', 'fire']});
    // 返回组件。
    return ComponentConstructor;
  }

  window.Component = Component;

//--------------------------------------------------[Component.prototype.on]
  /**
   * 为组件添加监听器。
   * @name Component.prototype.on
   * @function
   * @param {string} name 事件名称，包括事件类型和可选的别名，二者间用 . 分割。
   *   使用空格分割要多个事件名称，即可同时为多个事件注册同一个监听器。
   * @param {Function} listener 要添加的事件监听器，传入调用此方法的组件提供的事件对象。
   * @returns {Object} 调用本方法的组件。
   */
  Component.prototype.on = function(name, listener) {
    var self = this;
    if (name.contains(' ')) {
      name.split(' ').forEach(function(name) {
        Component.prototype.on.call(self, name, listener);
      });
      return self;
    }
    var events = self.events;
    var dotIndex = name.indexOf('.');
    var type = dotIndex === -1 ? name : name.slice(0, dotIndex);
    var handlers = events[type] || (events[type] = []);
    handlers.push({name: name, listener: listener});
    return self;
  };

//--------------------------------------------------[Component.prototype.off]
  /**
   * 根据名称删除组件上已添加的监听器。
   * @name Component.prototype.off
   * @function
   * @param {string} name 通过 on 添加监听器时使用的事件名称。可以使用空格分割多个事件名称。
   * @returns {Object} 调用本方法的组件。
   */
  Component.prototype.off = function(name) {
    var self = this;
    if (name.contains(' ')) {
      name.split(' ').forEach(function(name) {
        Component.prototype.off.call(self, name);
      });
      return self;
    }
    var events = self.events;
    var dotIndex = name.indexOf('.');
    var type = dotIndex === -1 ? name : name.slice(0, dotIndex);
    var handlers = events[type];
    if (!handlers) {
      return self;
    }
    var i = 0;
    var handler;
    if (name === type) {
      handlers.length = 0;
    } else {
      while (i < handlers.length) {
        handler = handlers[i];
        if (handler.name === name) {
          handlers.splice(i, 1);
        } else {
          i++;
        }
      }
    }
    if (handlers.length === 0) {
      delete events[type];
    }
    return self;
  };

//--------------------------------------------------[Component.prototype.fire]
  /**
   * 触发一个组件的某类事件，运行相关的监听器。
   * @name Component.prototype.fire
   * @function
   * @param {String} type 事件类型。
   * @param {Object} [event] 事件对象。
   * @returns {Object} 调用本方法的组件。
   */
  Component.prototype.fire = function(type, event) {
    var self = this;
    var events = self.events;
    var handlers = events[type];
    if (!handlers) {
      return self;
    }
    handlers.forEach(function(handler) {
      handler.listener.call(self, event);
    });
    return self;
  };

//==================================================[命名空间]
  /*
   * 提供命名空间。
   *
   * 添加对象：
   *   components
   */

//--------------------------------------------------[components]
  /**
   * 为组件提供的命名空间。
   * @name components
   * @namespace
   */
  window.components = {};

})();

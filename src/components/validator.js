/**
 * @fileOverview 组件 - 表单验证。
 * @author sundongguo@gmail.com
 * @version 20120723
 */
execute(function($) {
//==================================================[Validator]
  /*
   * 表单验证。
   */

//--------------------------------------------------[Validator Constructor]
  /**
   * 表单验证。
   * @name Validator
   * @constructor
   * @param {Element} element 要验证的表单元素。
   * @param {Object} fieldRules 要验证的表单域及规则，格式为 {name: rules, ...}。
   *   其中 name 为要验证的表单域的名称，即表单内对应的 INPUT/SELECT/TEXTAREA 元素的 name 属性值。
   *   rules 是一个对象，其<strong>可选的</strong>各个属性的要求和含义如下：
   *   {string} triggerEvent 触发本表单域的验证行为的事件名。默认使用 change 事件。
   *   {boolean} required 是否必填（必选）。
   *   {string} equals 指定该表单域的值应与哪个表单域的值一致，应指定一个本表单内的表单域的名称。
   *   {number} minLength 当前表单域是一个文本控件时，限定输入文本的最小长度，否则限定选择项的最少数目。
   *   {number} maxLength 当前表单域是一个文本控件时，限定输入文本的最大长度，否则限定选择项的最多数目。
   *   {Function} handler 用来对该表单域的值进行验证的函数，该函数被调用时 this 的值为对应的表单域元素或包含所有对应元素的数组。
   *   {Object} serverSideVerify 包含两个属性：url 和 options，详细内容请参考 Request 组件。服务端应返回 'true' 或 'false'，如果条件不允许，请考虑使用 options.responseParser 对服务端响应数据进行处理。
   *   进行验证的步骤为 required - equals - min/maxLength - handler - serverSideVerify。
   *   {Function} onFocus 当该表单域对应的元素获得焦点时执行的回调。该函数被调用时传入该表单域的名称，其 this 值为该表单域。建议仅在当前表单域是一个文本控件时启用。
   * @description
   *   在要验证的表单被提交时会自动对所有已配置的规则进行验证。
   * @fires fieldvalidationstart
   *   {string} name 本次验证的表单域的名称。
   *   {string|Array} value 本次验证的表单域的值。
   *   验证每个要验证的表单域开始时触发。
   * @fires fieldvalidationfinish
   *   {string} name 本次验证的表单域的名称。
   *   {string|Array} value 本次验证的表单域的值。
   *   {boolean} result 验证结果。
   *   验证每个要验证的表单域结束后触发。
   * @fires validate
   *   调用 validate 方法时触发。用于处理可能存在的验证前的一些收尾操作。
   * @fires finish
   *   {boolean} result 验证结果，仅当所有已配置的验证规则均通过时为 true，否则为 false。
   *   验证结束时触发。如果存在服务端验证，则不会和 validate 事件同步触发。
   * @requires Request
   */
  var Validator = new Component(function(element, fieldRules) {
    var validator = this;

    // 获取选项。
    var options = validator.options;

    // 保存属性。
    validator.element = $(element).on('submit', function() {
//      return validator.validate();
      validator.validate();
//      return false;
    });
    validator.rules = fieldRules;
    validator.fields = {};
    Object.forEach(fieldRules, function(rule, fieldName) {
      var field = validator.element.elements[fieldName];
      // 将 NodeList 转换为 Array 备用。
      validator.fields[fieldName] = field.nodeType ? field : Array.from(field);
    });

  });

//--------------------------------------------------[Validator.prototype.validate]
  // 获取一个表单域的值。当这个表单域是一个文本控件时，返回字符串结果（文本/密码框、隐藏域、多行文本输入控件），否则返回数组结果（下拉菜单、单/复选框或者表单域包含多个元素的情况）。
  var getValue = function(field) {
    var value = [];
    if (field.nodeType) {
      switch (field.type) {
        case 'select-one':
        case 'select-multiple':
          Array.from(field.options).forEach(function($option) {
            if ($option.selected) {
              value.push($option.value);
            }
          });
          break;
        case 'radio':
        case 'checkbox':
          if (field.checked) {
            value.push(field.value);
          }
          break;
        default:
          value = field.value;
          break;
      }
    } else {
      field.forEach(function(field) {
        value = value.concat(getValue(field));
      });
    }
    return value;
  };

  /**
   * 对配置的所有规则进行验证。
   * @name Validator.prototype.validate
   * @function
   * @param {string} [fieldName] 要验证的表单域的名称，若省略则验证所有已配置规则的表单域。
   * @returns {boolean} 验证结果，true 为验证通过，false 为验证失败。
   */
  Validator.prototype.validate = function(fieldName) {
    var validator = this;
    var result = true;

    if (fieldName) {
      var field = validator.fields[fieldName];
      // 获得值。
      var value = getValue(field);
      console.warn(fieldName, value);
      var rules = validator.rules[fieldName];
      if (rules.required) {
        if (value.length === 0) {
          result = false && result;
        }
      }
      if (rules.equals) {
        if (value !== getValue(validator.fields[rules.equals])) {
          result = false && result;
        }
      }
      if (rules.minLength) {
        result = value.length >= rules.minLength && result;
      }
      if (rules.maxLength) {
        result = value.length <= rules.maxLength && result;
      }
      if (rules.handler) {
        result = rules.handler(value) && result;
      }

      if (result) {
        if (rules.onSuccess) {
          rules.onSuccess(fieldName);
        }
      } else {
        if (rules.onFailure) {
          rules.onFailure(fieldName);
        }
      }

    } else {
      Object.forEach(validator.rules, function(rule, fieldName) {
        result = validator.validate(fieldName) && result;
      });
    }

    return result;
  };

//--------------------------------------------------[Validator]
  window.Validator = Validator;

});
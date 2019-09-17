const Rules = require('./rules.js');

module.exports = {
  digit(rule, value, param, models){
    return Rules.isOptional(value) || Rules.digit(value);
  },

  // qq 验证规则
  qq(rule, value, param, models) {
    if(!Rules.isOptional(value) && !Rules.qq(value)){
      return rule.message;
    }
  }
}
import Ember from 'ember';
import Base from 'ember-validations/validators/base';
import Messages from 'ember-validations/messages';
import RemoteValidator from './remote-validator';

var get = Ember.get;
var set = Ember.set;
/**
 * uniqueness:function(){
        return {
          message:"用户名已存在，请重新输入",
          validateOnNew：true //默认为true  目前只有新建模型才会启用校验 TODO 处理更完善
          errorOnStatus:[409]  //如果不传，默认处理409（Conflict）
          url："api/v1/sysUsers/{field}/uniqueness"  //url不设置，则按照约定生成类似的格式
          message:"用户名已存在，请重新输入"  //冲突后的显示信息
          data:{
          //传递到后端的查询参数
          }
        };
      }
 */
export default RemoteValidator.extend({
  setDefaultOptions: function () {
    var self = this;

    function options() {
      return {
        // Would like some feedback on a good default url endpoint for validation.
        // Was originally thinking something Ember.Router.namespace + this.property + '/uniqueness'
        // url: '/api/v1/' + this.property + '/uniqueness',
        message: Messages.defaults.uniqueness,
        errorOnStatus: [409],
        validateOnNew: true,
        data: self.get('model.data')
      };
    }

    this.set('options', options());
  },

  call: function (resolve, reject) {
    var self = this,
      errorOnStatus = Ember.makeArray(this.get('options.errorOnStatus'));
    self.errors.clear();
    function resolveResponse(data, textStatus, xhr) {

      // Add errors if server responds with http status code contained within the errorOnStatus array.
      if (errorOnStatus.contains(data.status) || errorOnStatus.contains(xhr.status)) {
        self.errors.pushObject(self.options.message);
      }
      if(self.get('isValid')){
        resolve();
      }else{
        reject();
      }
    }

    // Use resolve function for both resolve and reject states
    var data = {};
    var value = this.model.get(this.property);
//    if(Ember.isEmpty(value)||Ember.isEmpty(value.trim())){
//      this.errors.pushObject("不能为空");
//      return;
//    }
    data[this.property] = value;
    var config = Ember.$.extend({}, this.get('options'), {
      data: {
        pair:data
      }
    });
    return Ember.$.ajax(config).then(resolveResponse, resolveResponse);
  }
});
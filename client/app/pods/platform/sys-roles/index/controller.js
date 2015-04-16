/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';
import PagedArray from 'corto/mixins/paged-array';
import SysRole from 'corto/models/sys-role';

export default
Ember.ArrayController.extend(PagedArray(SysRole),{
  actions:{
    create:function(){
      this.store.filter('sysDict',function(dict){
        return dict.get('type')=='SYS_USER_STATUS';
      }).then(function(result){
          console.log(result);
        });
      this.transitionToRoute('platform.sysRoles.create');
    },
    detail: function (model) {
      this.transitionToRoute('platform.sysRoles.sysRole.detail', model);
    }
  }
});

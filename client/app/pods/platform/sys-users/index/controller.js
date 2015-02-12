/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';
import PagedArray from '../../../../mixins/paged-array';
import SysUser from '../../../../models/sys-user';

export default
Ember.ArrayController.extend(PagedArray(SysUser),{
  actions:{
    create:function(){
      this.store.filter('sysDict',function(dict){
        return dict.get('type')=='SYS_USER_STATUS';
      }).then(function(result){
          console.log(result);
        });
      this.transitionToRoute('platform.sysUsers.create');
    },
    edit:function(model){
      this.transitionToRoute('platform.sysUsers.sysUser',model).then(function(route){
        route.transitionTo('platform.sysUsers.sysUser.edit');
      });
    }
  }
});

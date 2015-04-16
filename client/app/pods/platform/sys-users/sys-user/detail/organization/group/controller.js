import Ember from 'ember';
import
  {
  ManyRelationArray
  }
  from
    'corto/mixins/many-relation-array';
import SysGroup from 'corto/models/sys-group';
import SysUserRelation from 'corto/models/sys-user-relation';
import SenderAction from 'corto/mixins/sender-action';
import AdvancedQuery from 'corto/utils/advanced-query';

export default
Ember.Controller.extend(ManyRelationArray(SysGroup, SysUserRelation), SenderAction, {
  init:function(){
    this._super();

    this.set('advancedQuery', AdvancedQuery.create({
      filters: {
        where:{
          name:{
            like:true
          }
        }
      },
      modelConstructor: SysGroup,
      owner: this
    }));
  }
});

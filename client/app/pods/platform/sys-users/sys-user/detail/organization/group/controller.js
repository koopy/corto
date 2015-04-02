import Ember from 'ember';
import
  {
  ManyRelationArray
  }
  from
    'app/mixins/many-relation-array';
import SysGroup from 'app/models/sys-group';
import SysUserRelation from 'app/models/sys-user-relation';
import SenderAction from 'app/mixins/sender-action';
import AdvancedQuery from 'app/mixins/advanced-query';

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

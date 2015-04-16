import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'corto/mixins/many-relation-array';
import SysPosition from 'corto/models/sys-position';
import SysRoleRelation from 'corto/models/sys-role-relation';
import SenderAction from 'corto/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysPosition,SysRoleRelation),SenderAction, {

});

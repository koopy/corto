import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'corto/mixins/many-relation-array';
import SysDept from 'corto/models/sys-dept';
import SysRoleRelation from 'corto/models/sys-role-relation';
import SenderAction from 'corto/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysDept,SysRoleRelation),SenderAction, {

});

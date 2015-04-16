import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'corto/mixins/many-relation-array';
import SysUser from 'corto/models/sys-user';
import SysRoleRelation from 'corto/models/sys-role-relation';
import SenderAction from 'corto/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysUser,SysRoleRelation),SenderAction, {

});

import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'app/mixins/many-relation-array';
import SysUser from 'app/models/sys-user';
import SysRoleRelation from 'app/models/sys-role-relation';
import SenderAction from 'app/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysUser,SysRoleRelation),SenderAction, {

});

import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'corto/mixins/many-relation-array';
import SysOrg from 'corto/models/sys-org';
import SysRoleRelation from 'corto/models/sys-role-relation';
import SenderAction from 'corto/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysOrg,SysRoleRelation),SenderAction, {

});

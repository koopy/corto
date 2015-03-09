import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'app/mixins/many-relation-array';
import SysOrg from 'app/models/sys-org';
import SysRoleRelation from 'app/models/sys-role-relation';
import SenderAction from 'app/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysOrg,SysRoleRelation),SenderAction, {

});

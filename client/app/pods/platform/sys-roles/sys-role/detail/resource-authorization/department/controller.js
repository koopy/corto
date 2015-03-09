import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'app/mixins/many-relation-array';
import SysDept from 'app/models/sys-dept';
import SysRoleRelation from 'app/models/sys-role-relation';
import SenderAction from 'app/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysDept,SysRoleRelation),SenderAction, {

});

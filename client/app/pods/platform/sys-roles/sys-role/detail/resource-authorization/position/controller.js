import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'app/mixins/many-relation-array';
import SysPosition from 'app/models/sys-position';
import SysRoleRelation from 'app/models/sys-role-relation';
import SenderAction from 'app/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysPosition,SysRoleRelation),SenderAction, {

});

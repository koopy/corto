import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'corto/mixins/many-relation-array';
import SysGroup from 'corto/models/sys-group';
import SysRoleRelation from 'corto/models/sys-role-relation';
import SenderAction from 'corto/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysGroup,SysRoleRelation),SenderAction, {

});

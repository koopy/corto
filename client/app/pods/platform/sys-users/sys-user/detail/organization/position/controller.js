import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'corto/mixins/many-relation-array';
import SysPosition from 'corto/models/sys-position';
import SysUserRelation from 'corto/models/sys-user-relation';
import SenderAction from 'corto/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysPosition,SysUserRelation),SenderAction, {

});

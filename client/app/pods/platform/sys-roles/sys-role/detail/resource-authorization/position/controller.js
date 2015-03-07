import Ember from 'ember';
import
{
  ManyRelationArray
}
from
'app/mixins/many-relation-array';
import SysPosition from 'app/models/sys-position';
import SysUserRelation from 'app/models/sys-user-relation';
import SenderAction from 'app/mixins/sender-action';

export default
Ember.Controller.extend(ManyRelationArray(SysPosition,SysUserRelation),SenderAction, {

});

/**
 * Created by jiangwy on 15-3-6.
 */
import Ember from 'ember';
import commonColumn from '../metadatas/common-column';

//TODO refactor model column config to other folder and refactor blueprint
var config = {
  /*详细信息配置项，一定要配置在这里*/
  columnOptions: {
    localizePrefix: 'platform.sysRoles.columns'
  },
  identity: {
    field: 'name',
    name: '角色'
  },
  detail: {
    profile: {
      name: '基本信息',
      active:true
    },
    resourcesAuthorization: {
      name: '资源授权'
    },
    roleAllocation: {
      name: '角色分配'
    }
  }
};
var columns = {
  checkbox:{
    disableLocale: true,
    columnWidth: 50,
    textAlign:'text-align-center',
    headerCellViewClass:'checkbox-header',
    tableCellViewClass: 'checkbox-cell'
  },
  name: {
    columnWidth: 100,
    contentPath: 'name'
  },
  description: {
    columnWidth: 100,
    contentPath: 'description'
  }
};


columns = Ember.$.extend({},commonColumn,columns);
export
{
  config,
    columns
}

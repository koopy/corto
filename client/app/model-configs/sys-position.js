/**
 * Created by jiangwy on 15-3-6.
 */
import Ember from 'ember';
import commonColumn from '../metadatas/common-column';

//TODO refactor model column config to other folder and refactor blueprint
var config = {
  columnOptions: {
    localizePrefix: 'platform.sysPositions.columns'
  },
  identity: {
    field: 'name',
    name: '岗位'
  },
  detail: {
    profile: {
      name: '基本信息',
      active: true
    },
    groupMember: {
      name: '岗位成员'
    }
  }
};
var columns = {
  checkbox: {
    disableLocale: true,
    columnWidth: 50,
    textAlign: 'text-align-center',
    headerCellViewClass: 'checkbox-header',
    tableCellViewClass: 'checkbox-cell'
  },
  code: {
    headerCellName: '岗位代码',
    columnWidth: 100,
    contentPath: 'code'
  },
  name: {
    headerCellName: '岗位名称',
    columnWidth: 100,
    contentPath: 'name'
  },
  description: {
    headerCellName: '描述',
    columnWidth: 100,
    contentPath: 'description'
  },
  status: {
    headerCellName: '岗位状态',
    columnWidth: 100,
    contentPath: 'status'
  }
};


Ember.merge(columns, commonColumn);
export
{
  config,
    columns
}

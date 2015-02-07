import DS from 'ember-data';
import Base from './base';
var attr = DS.attr;

var Model=Base.extend({
  category: attr(),
  code: attr(),
  name: attr(),
  parentId: attr(),
  orgLevel: attr(),
  description: attr(),
  address: attr(),
  manager: attr(),
  phone: attr(),
  status: attr(),
  modified: attr('pretty-date'),
  orderNo: attr(),
  superOrgId: attr(),

  validations: {
    category: {
      presence: { message: '组织类型不能为空' },
      format: { with: /^[1-2]{1}$/ }
    },
    code: {
      length: { maximum: 50 },
      presence: { message: '组织代码不能为空' },
      format: { with: /^[a-zA-Z_]+$/, message: '组织代码只能由英文字母和下划线组成' }
    },
    name: {
      length: { maximum: 50 },
      presence: { message: '组织名称不能为空' }
    },
    orgLevel: {
      presence: { message: '组织层级不能为空' },
      format: { with: /^[1-3]{1}$/ }
    },
    description: {
      length: { maximum: 300 }
    }
  }
});
Model.columns = {
  name: {
    headerCellName: '机构名称',
    columnWidth: 100,
    contentPath: 'name'
  },
  description: {
    headerCellName: '机构描述',
    columnWidth: 100,
    contentPath: 'description'
  },
  created: {
    headerCellName: '创建时间',
    columnWidth: 100,
    contentPath: 'created'
  },
  modified: {
    headerCellName: '最后修改时间',
    columnWidth: 100,
    contentPath: 'modified'
  },
  operation: {
    headerCellName: '操作',
    columnWidth: 100,
    tableCellViewClass:'operation-cell'
  }
};

export default
Model;

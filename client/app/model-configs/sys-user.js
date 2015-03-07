/**
 * Created by jiangwy on 15-3-6.
 */
import Ember from 'ember';
import commonColumn from '../metadatas/common-column';

//TODO refactor model column config to other folder and refactor blueprint
var config = {
  /*详细信息配置项，一定要配置在这里*/
  identity: {
    field: "name",
    name: "用户"
  },
  detail: {
    profile: {
      name: "基本信息",
      active: true
    },
    roleAllocation: {
      name: "角色分配"
    },
    organization: {
      name: "组织信息"
    }
  }
};
var columns = {
  checkbox: {
    disableLocale: true,
    columnWidth: '10%',
    textAlign: "text-align-center",
    headerCellViewClass: 'checkbox-header',
    tableCellViewClass: 'checkbox-cell'
  },
  name: {
    columnWidth: '10%',
    contentPath: 'name',
    formOptions: {

    }
  },
  account: {
    columnWidth: '10%',
    contentPath: 'account'
  },
  sex: {
    headerCellName: '性别',
    columnWidth: '10%',
    contentPath: 'sex',
    formOptions: {
      type: 'radio'
    }
  },
  email: {
    headerCellName: '邮箱',
    columnWidth: 100,
    contentPath: 'email',
    isVisible: false,
    formOptions: {
      type: 'email'
    }
  },
  officePhone: {
    columnWidth: 100,
    contentPath: 'officePhone',
    isVisible: false,
    formOptions: {

    }
  },
  status: {
    headerCellName: '状态',
    columnWidth: '10%',
    contentPath: 'status',
    formOptions: {
      type: 'radio'
    }
  },
  homePhone: {
    headerCellName: '家庭电话',
    columnWidth: 100,
    contentPath: 'homePhone',
    isVisible: false,
    formOptions: {

    }
  },
  mobile: {
    headerCellName: '手机',
    columnWidth: 100,
    contentPath: 'mobile',
    isVisible: false,
    formOptions: {

    }
  },
  address: {
    headerCellName: '家庭地址',
    columnWidth: 100,
    contentPath: 'address',
    isVisible: false,
    formOptions: {

    }
  },
  description: {
    headerCellName: '描述',
    columnWidth: 100,
    contentPath: 'description',
    isVisible: false,
    formOptions: {
      type: 'text'
    }
  }
};

Ember.merge(columns, commonColumn);
export
{
  config,
    columns
}

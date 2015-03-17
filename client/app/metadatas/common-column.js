/**
 * Created by jiangwy on 15-3-6.
 */
var commonColumn = {
  created: {
    order: 20,
    dataType: 'date',
    headerCellName: '创建时间',
    columnWidth: '20%',
    contentPath: 'created',
    showInForm: false
  },
  creator: {
    order: 21,
    headerCellName: '创建者',
    columnWidth: '10%',
    contentPath: 'creator',
    showInForm: false
  },
  modifier: {
    order: 22,
    headerCellName: '最后修改人',
    columnWidth: 100,
    isVisible: false,
    contentPath: 'modifier',
    showInForm: false
  },
  modified: {
    order: 23,
    dataType: 'date',
    headerCellName: '最后修改时间',
    columnWidth: 100,
    isVisible: false,
    contentPath: 'modified',
    showInForm: false
  },
  operation: {
    order: 24,
    headerCellName: '操作',
    columnWidth: '10%',
    textAlign: "text-align-center",
    tableCellViewClass: 'grid-operations/detail'
  }
};

export default
commonColumn;

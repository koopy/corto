/**
 * Created by jiangwy on 15-3-10.
 */
var mapping = {
  SysUser: {
    name: '用户角色',
    editable: true,
    order: 1
  },
  SysOrg: {
    name: '机构角色',
    order: 2
  },
  SysGroup: {
    name: '群组角色',
    order: 3
  },
  SysPosition: {
    name: '岗位角色',
    order: 4
  },
  SysDept: {
    name: '部门角色',
    order: 5
  }
};
function sortMapping(mapping) {
  var result = [];
  for (var m in mapping) {
    var cur = mapping[m];
    cur.principalType = m;
    result.push(cur);
  }
  result = result.sort(function (item1, item2) {
    return item1.order - item2.order;
  });
  var map = {};
  result.forEach(function (item,idx) {
    item.index = idx;
    map[item.principalType] = item;
  });
  return {
    map:map,
    collection:result
  };
}
mapping = sortMapping(mapping);
export default mapping;

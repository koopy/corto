var locale = {
  title: '金融同业平台',
  platform: {
    name: '平台管理',
    sysUsers: {
      columns: {
        name: '用户名',
        account: '账号',
        officePhone: '办公室电话'
      },
      name: '用户管理',
      create: {
        name: '创建用户'
      },
      sysUser: {
        name: '详情',
        detail: {
          name: '详情信息',
          profile: {
            name: '基本信息'
          },
          roleAllocation: {
            name: '角色分配'
          },
          organization: {
            name: '组织管理'
          }
        },
        edit: {
          name: '编辑用户'
        }
      }
    },
    sysRoles: {
      columns: {
        name: '角色名',
        description: '描述'
      },
      name: '角色管理',
      sysRole: {
        name: '详情',
        detail: {
          name: '详情信息',
          profile: {
            name: '基本信息'
          },
          roleAllocation: {
            name: '角色分配'
          },
          resourceAuthorization: {
            name: '资源授权'
          }
        },
        edit: {
          name: '编辑用户'
        }
      }
    },
    sysDuties: {
      name: '职务管理'
    },
    sysGroups: {
      name: '群组管理',
      columns: {
        name: '群组名称',
        code: '群组代码'
      }
    },
    sysOrgs: {
      name: '组织管理',
      columns: {
        name: '群组名称',
        code: '群组代码',
        description:'xx'
      }
    },
    sysDepts:{
      name:'管理',
      columns: {
        name: '群组名称',
        code: '群组代码',
        description:'xx'
      }
    },
    tool:{
      name:'Data Tool',
      generator:{
        name:'Query Generator'
      }
    }
  },
  flow: {
    name: '流程管理',
    processCategory: {
      name: '流程分类管理'
    },
    wfProcessDefinitions: {
      name: '流程定义管理'
    },
    processInstance: {
      name: '流程实例管理'
    },
    processTask: {
      name: '流程任务管理'
    },
    flowTask: {
      name: '流转任务管理'
    },
    wfAgents: {
      name: '流程代理管理'
    },
    processBranchAuth: {
      name: '流程分管授权'
    }
  },
  investment: {
    name: '同业投资管理'
  },
  financial: {
    name: '理财管理'
  },
  personal: {
    name: '个人办公'
  },
  assets: {
    name: '同业资产管理'
  },
  home: {
    title: '欢迎',
    settings: '设置',
    profile: '个人信息',
    logout: '登出'
  },
  login: {
    name: '登陆',
    rememberme: '记住我',
    forgetpwd: '忘记密码',
    submit: '登陆平台'
  },
  dialogs: {
    confirm: {
      del: {

      }

    }
  }
};
export default
locale;

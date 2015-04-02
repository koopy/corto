var locale = {
  title: 'Financial trade platform',
  platform: {
    name: 'Platform',
    sysUsers: {
      name: 'User',
      columns: {
        name: 'Name',
        account: 'Account',
        officePhone: 'Office Phone'
      },
      create: {
        name: 'Create User'
      },
      sysUser:{
        name: 'Detail',
        detail: {
          name: 'Detail Info',
          profile: {
            name: 'Basic Info'
          },
          roleAllocation: {
            name: 'Role Allocation'
          },
          organization: {
            name: 'Organization'
          }
        },
        edit: {
          name: 'Edit'
        }
      }
    },
    sysRoles: {
      name: 'Role',
      columns: {
        name: 'Name',
        description:'Description'
      },
      sysRole:{
        name: 'Detail',
        detail: {
          name: 'Detail Info',
          profile: {
            name: 'Basic Info'
          },
          roleAllocation: {
            name: 'Role Allocation'
          },
          resourceAuthorization: {
            name: 'Resource Authorization'
          }
        },
        edit: {
          name: 'Edit'
        }
      }
    },
    sysDuties: {
      name: 'Duty'
    },
    sysGroups: {
      name: 'Group',
      columns: {
        name: 'Name',
        code: 'Code'
      }
    },
    sysOrgs: {
      name: 'Organization',
      columns: {
        name: '群组名称',
        code: '群组代码',
        description:'xx'
      }
    },
    sysDepts:{
      name:'Department',
      columns: {
        name: 'Name',
        code: 'Code',
        description:'Description'
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
    name: 'Flow',
    processCategory:{
      name:'Process Category'
    },
    wfProcessDefinitions:{
      name:'Process Definition'
    },
    processInstance:{
      name:'Process Instance'
    },
    processTask:{
      name:'Process Task'
    },
    flowTask:{
      name:'Flow Task'
    },
    wfAgents:{
      name:'Agent'
    }
  },
  investment: {
    name: 'Investment'
  },
  financial: {
    name: 'Financial'
  },
  personal: {
    name: 'Personal'
  },
  assets: {
    name: 'Assets'
  },
  home: {
    title: 'Welcome',
    settings:'Settings',
    profile:'Profile',
    logout:'Logout'
  },
  login: {
    name:'Login',
    rememberme:'Remember me',
    forgetpwd:'Forget Password',
    submit:'Login'
  }
};
export default
locale;

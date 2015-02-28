var config = {
  icon: 'fa-laptop',
  template: 'platform',
  authCode: 'platform',
  group: 'sidebar',
  children: [
    {
      template: 'sysUsers',
      authCode: 'sys:user',
      group: 'sidebar',
      children: [
        {
          name: '创建用户',
          template: 'create',
          type: 'route',
          authCode: 'sys:user:create_user'
        },
        {
          name: '用户详情',
          template: 'sysUser',
          path: '/:sysUser_id',
          authCode: '',
          children: [
            {
              name:'detail',
              template:'detail',
              path:'/',
              authCode:'',
              children:[{
                name:'profile',
                template:'profile',
                path:'/',
                authCode:''
              },{
                name:'roleAllocation',
                template:'roleAllocation',
                authCode:''
              },{
                name:'organization',
                template:'organization',
                authCode:''
              }]
            },
            {
              name: '编辑用户',
              template: 'edit',
              type: 'route',
              authCode: 'sys:user:update_user'
            }
          ]
        }
      ]
    },
    {
      template: 'sysOrgs',
      authCode: 'sys:org',
      group: 'sidebar',
      children: [
        {
          template: 'create',
          type: 'route',
          authCode: 'sys:org:create_org'
        },
        {
          template: 'sysOrg',
          path: '/:sysOrg_id',
          authCode: '',
          children: [
            {
              name: '编辑机构',
              template: 'edit',
              type: 'route'
            },
            {
              name: '编辑机构',
              template: 'sysPositions',
              authCode: 'sys:org:update_org',
              children: [
                {
                  template: 'create',
                  type: 'route'
                },
                {
                  template: 'sysPosition',
                  path: '/:sysPosition_id',
                  children: [
                    {
                      template: 'edit',
                      type: 'route'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      template: 'sysGroups',
      authCode: 'sys:group',
      group: 'sidebar',
      children: [
        {
          name: '创建群组',
          template: 'create',
          type: 'route',
          authCode: 'sys:group:create_group'
        },
        {
          name: '群组详情',
          template: 'sysGroup',
          path: '/:sysGroup_id',
          authCode: '',
          children: [
            {
              name: '编辑群组',
              template: 'edit',
              type: 'route',
              authCode: 'sys:group:update_group'
            }
          ]
        }
      ]
    },
    {
      template: 'sysRoles',
      authCode: 'sys:role',
      group: 'sidebar',
      children: [
        {
          name: '创建角色',
          template: 'create',
          type: 'route',
          authCode: 'sys:role:create_role'
        },
        {
          name: '角色详情',
          template: 'sysRole',
          path: '/:sysRole_id',
          authCode: '',
          children: [
            {
              name: '编辑角色',
              template: 'edit',
              type: 'route',
              authCode: 'sys:role:update_role'
            }
          ]
        }
      ]
    },
    {
      template: 'sysDuties',
      authCode: 'sys:duty',
      group: 'sidebar',
      children: [
        {
          template: 'create',
          type: 'route',
          authCode: 'sys:duty:create_duty'
        },
        {
          template: 'sysDuty',
          path: '/:sysDuty_id',
          authCode: '',
          children: [
            {
              template: 'edit',
              type: 'route',
              authCode: 'sys:duty:update_duty'
            }
          ]
        }
      ]
    }
  ]
};

export default config;

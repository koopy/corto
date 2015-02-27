var config = {
  name: '个人办公',
  icon: 'fa-magic',
  template: 'personal',
  authCode: 'personal',
  group: 'sidebar',
  children: [
    {
      name: '流程发起',
      template: 'flows',
      authCode: '',
      path: '/flows',
      group: 'sidebar',
      children: [
        {
          name: '我的申请',
          template: 'demands',
          path: '/demands',
          authCode: '',
          group: 'sidebar',
          children: [
            {
              name: '发起申请',
              template: 'create',
              authCode: ''
            }
          ]
        },
        {
          name: '新建申请',
          template: 'modelDef',
          path: '/modelDef',
          authCode: '',
          group: 'sidebar'
        }
      ]
    }
  ]
};

export default config;

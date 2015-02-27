/**
 * Created by jiangwy on 15-2-27.
 */
var config = {
  name: '流程管理',
  icon: 'fa-clock-o',
  template: 'flow',
  authCode: 'flow',
  group: 'sidebar',
  children: [
    {
      name: '流程分类管理',
      template: 'processCategory',
      authCode: 'wf:process_category',
      group: 'sidebar',
      children: [
        {
          name: '新建流程分类',
          template: 'create',
          type: 'route',
          authCode: ''
        }
      ]
    },
    {
      name: '流程定义管理',
      template: 'wfProcessDefinitions',
      authCode: 'wf:process_definition',
      group: 'sidebar',
      children: [
        {
          name: '新建流程',
          template: 'create',
          type: 'route',
          authCode: 'sys:user:create'
        },
        {
          name: '流程定义详情',
          template: 'wfProcessDefinition',
          path: '/:wfProcessDefinition_id',
          authCode: '',
          children: [
            {
              name: '',
              template: 'edit',
              type: 'route'
            }
          ]
        }
      ]
    },
    {
      name: '流程实例管理',
      template: 'processInstance',
      authCode: 'wf:process_instance',
      group: 'sidebar'
    },
    {
      name: '流程任务管理',
      template: 'processTask',
      authCode: 'wf:process_task',
      group: 'sidebar'
    },
    {
      name: '流转任务管理',
      template: 'flowTask',
      authCode: 'wf:flow_task',
      group: 'sidebar'
    },
    {
      name: '流程代理管理',
      template: 'wfAgents',
      authCode: 'wf:process_agency',
      group: 'sidebar',
      children: [
        {
          name: '新建流程代理',
          template: 'create',
          type: 'route',
          authCode: 'sys:user:create'
        },
        {
          name: '流程代理详情',
          template: 'wfAgent',
          path: '/:wfAgent_id',
          authCode: '',
          children: [
            {
              name: '',
              template: 'edit',
              type: 'route'
            }
          ]
        }
      ]
    },
    {
      name: '流程分管授权',
      template: '',
      authCode: 'wf:process_branch_auth',
      group: 'sidebar'
    }
  ]
};

export default
config;

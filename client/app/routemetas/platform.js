export default
[
  {
    route: 'platform',
    subRoutes: [
      {
        route: 'sysUsers',
        subRoutes: [
          {
            route: 'create'
          },
          {
            route: 'sysUser',
            isDynamic: true,
            subRoutes: [
              {
                route: 'edit'
              },
              {
                route: 'detail',
                subRoutes: [
                  {
                    route: 'profile'
                  },
                  {
                    route: 'roleAllocation'
                  },
                  {
                    route: 'organization'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        route:'sysRoles',
        subRoutes: [
          {
            route: 'create'
          },
          {
            route: 'sysRole',
            isDynamic: true,
            subRoutes: [
              {
                route: 'edit'
              },
              {
                route: 'detail',
                subRoutes: [
                  {
                    route: 'profile'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
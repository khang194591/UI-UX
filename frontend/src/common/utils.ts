export enum PageName {
  DASHBOARD = '',
  USER = 'users',
  ROLE = 'roles',
}

export const mapLinkName = {
  [PageName.DASHBOARD]: {
    crumb: 'Dashboard',
    name: 'Dashboard',
    absolutePath: '/',
  },
  [PageName.USER]: {
    crumb: 'User',
    name: 'User Page',
    absolutePath: '/users',
  },
  [PageName.ROLE]: {
    crumb: 'Role',
    name: 'Role Page',
    absolutePath: '/roles',
  },
}

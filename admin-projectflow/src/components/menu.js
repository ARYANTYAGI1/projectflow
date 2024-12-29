export const menuItems = [
  // title-seperator-users
  // {
  //     id: 4,
  //     label: "menuitems.users.title",
  //     isTitle: true
  // },
  {
    id: 1,
    label: 'menuitems.dashboard.user',
    icon: 'ri-user-fill',
    link: '/',
    userType: [1]
  },
  {
    id: 2,
    label: 'menuitems.dashboard.devices',
    icon: 'fas fa-thermometer',
    link: '/device',
    userType: [1,2]
  },
  {
    id: 3,
    label: 'menuitems.dashboard.measurements',
    icon: 'fas fa-ruler-horizontal',
    link: '/measurements',
    userType: [1,2]
  },
  {
    id: 4,
    label: 'menuitems.dashboard.settings',
    icon: 'fas fa-wrench',
    link: '/settings',
    userType: [1]
  }
]


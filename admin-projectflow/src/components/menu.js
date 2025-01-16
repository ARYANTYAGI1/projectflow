export const menuItems = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'ri-dashboard-line', // Icon for Dashboard
    link: '/',
    userType: [1, 2, 3, 4],
  },
  {
    id: 2,
    label: 'Users',
    icon: 'ri-group-line', // Icon for Users
    link: '/users',
    userType: [1],
  },
  {
    id: 3,
    label: 'Projects',
    icon: 'ri-folder-line', // Icon for Projects
    link: '/project',
    userType: [1, 2, 3],
  },
  {
    id: 4,
    label: 'Tasks',
    icon: 'ri-task-line', // Icon for Tasks
    link: '/tasks',
    userType: [1, 2, 3],
  },
];

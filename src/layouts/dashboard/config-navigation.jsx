import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.png`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'overview',
    path: '/',
    icon: icon('ic_overview'),
  },
  {
    title: 'inventario de equipos',
    path: '/inventory',
    icon: icon('ic_inventory'),
  },
  {
    title: 'mantenimientos',
    path: '/maintenance',
    icon: icon('ic_maintenance'),
  },
  // {
  //   title: 'planificador',
  //   path: '/schedule',
  //   icon: icon('ic_planner'),
  // }
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

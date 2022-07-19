//DE ESTA FORMA MANEJO EL MENU DE MI FRONTEND DE LADO DEL BACKEND
const getMenuFrontEnd = ( rol = 'USER_ROLE' ) => {
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/dashboard' },
            { titulo: 'ProgressBar', url: '/dashboard/progress' },
            { titulo: 'Gráfica', url: '/dashboard/grafica1' },
            { titulo: 'Promesas', url: '/dashboard/promesas' },
            { titulo: 'Rxjs', url: '/dashboard/rxjs' },
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            /* { titulo: 'Usuarios', url: '/dashboard/usuarios' }, */
            { titulo: 'Medicos', url: '/dashboard/medicos' },
            { titulo: 'Hospitales', url: '/dashboard/hospitales' }
          ]
        }
      ];

      if( rol === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/dashboard/usuarios' });
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd
}
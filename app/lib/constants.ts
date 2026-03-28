export type Menu = {
  title: string;
  path: string;
};

export type SubMenuItem = {
  title: string;
  path: string;
}
export type MenuItem = {
  title: string;
  path: string;
  submenu?: SubMenuItem[];
}

export const menu: MenuItem[] = [
  { 
    title: 'Inicio', 
    path: '/'
  },
  { 
    title: 'ABOUT US', 
    path: '/about' 
  },
  { 
    title: 'Habitaciones', 
    path: '/rooms',
    submenu: [
      { title: 'Habitación Dúplex CON BALCÓN', path: '/suite-duplex-balcon-1' },
      { title: 'Habitación Dúplex SIN VISTA CON AMPLIA SALA DE ESTAR', path: '/suite-duplex-balcon-2' },
      { title: 'Suite Premium EN UN SOLO NIVEL', path: '/habitacion-premium' },
    ]
  },
  { 
    title: 'Paginas', 
    path: '/pages',
    submenu: [
      { title: 'Inicio', path: '/' },
      { title: 'Galeria', path: '/galeria' },
       { title: 'Suites', path: '/suites' },
    ]
  },
  { 
    title: 'CONTACTO', 
    path: '/contacto' 
  },
];

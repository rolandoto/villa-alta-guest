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
    title: 'Galleria', 
    path: '/gallery'
  },
  { 
    title: 'SUITES', 
    path: '/suites' 
  },
  { 
    title: 'Habitaciones', 
    path: '/rooms',
    submenu: [
      { title: 'Habitación Dúplex CON BALCÓN', path: 'suites/suite-duplex-balcon-1' },
      { title: 'Habitación Dúplex SIN VISTA CON AMPLIA SALA DE ESTAR', path: 'suites/suite-duplex-balcon-2' },
      { title: 'Suite Premium EN UN SOLO NIVEL', path: 'suites/habitacion-premium' },
    ]
  },
  { 
    title: 'CONTACTO', 
    path: '/contacto' 
  },
];

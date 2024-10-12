// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/IndexPage.vue') }
//     ]
//   },
//
//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]
//
// export default routes

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'users', component: () => import('pages/users/UsersPage.vue') },
      { path: 'user', component: () => import('pages/users/UserPage.vue') },
      { path: 'new-user', component: () => import('pages/users/NewUserPage.vue') },
      { path: 'case-fans', component: () => import('pages/case-fans/CaseFansPage.vue') },
      { path: 'case-fan', component: () => import('pages/case-fans/CaseFanPage.vue') },
      { path: 'new-case-fan', component: () => import('pages/case-fans/NewCaseFanPage.vue') },
      { path: 'cpus', component: () => import('pages/cpus/CpusPage.vue') },
      { path: 'cpu', component: () => import('pages/cpus/CpuPage.vue') },
      { path: 'new-cpu', component: () => import('pages/cpus/NewCpuPage.vue') },
      { path: 'gpus', component: () => import('pages/gpus/GpusPage.vue') },
      { path: 'gpu', component: () => import('pages/gpus/GpuPage.vue') },
      { path: 'new-gpu', component: () => import('pages/gpus/NewGpuPage.vue') },
      { path: 'rams', component: () => import('pages/rams/RamsPage.vue') },
      { path: 'ram', component: () => import('pages/rams/RamPage.vue') },
      { path: 'new-ram', component: () => import('pages/rams/NewRamPage.vue') },
      { path: 'storages', component: () => import('pages/storages/StoragesPage.vue') },
      { path: 'storage', component: () => import('pages/storages/StoragePage.vue') },
      { path: 'new-storage', component: () => import('pages/storages/NewStoragePage.vue') },
      { path: 'computer-cases', component: () => import('pages/computer-cases/ComputerCasesPage.vue') },
      { path: 'computer-case', component: () => import('pages/computer-cases/ComputerCasePage.vue') },
      { path: 'new-computer-case', component: () => import('pages/computer-cases/NewComputerCasePage.vue') },
      { path: 'coolers', component: () => import('pages/coolers/CoolersPage.vue') },
      { path: 'cooler', component: () => import('pages/coolers/CoolerPage.vue') },
      { path: 'new-cooler', component: () => import('pages/coolers/NewCoolerPage.vue') },
      { path: 'power-supplys', component: () => import('pages/power-supplys/PowerSupplysPage.vue') },
      { path: 'power-supply', component: () => import('pages/power-supplys/PowerSupplyPage.vue') },
      { path: 'new-power-supply', component: () => import('pages/power-supplys/NewPowerSupplyPage.vue') },
      { path: 'motherboards', component: () => import('pages/motherboards/MotherboardsPage.vue') },
      { path: 'motherboard', component: () => import('pages/motherboards/MotherboardPage.vue') },
      { path: 'new-motherboard', component: () => import('pages/motherboards/NewMotherboardPage.vue') },
      { path: 'computers', component: () => import('pages/computers/ComputersPage.vue') },
      { path: 'computer', component: () => import('pages/computers/ComputerPage.vue') },
      { path: 'new-computer', component: () => import('pages/computers/NewComputerPage.vue') },
    ]
  },
  {
    path: '/home',
    component: () =>  import('pages/HomePage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

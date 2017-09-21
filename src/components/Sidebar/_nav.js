export default {
  items: [
    {
      name: 'MainPage',
      url: '/mainpage',
      icon: 'icon-home',
    },
    {
      name: 'Praca Operacyjna',
      url: '/office_work',
      icon: 'icon-speedometer',
        children: [
            {
                name: 'Lista',
                url: '/office_work/detail',
                icon: 'fa fa-list',
            },
            {
                name: 'Wprowadzanie',
                url: '/office_work/create',
                icon: 'fa fa-plus',
            }
        ]
    },
    {
      name: 'Kalendarz Szkoleń',
      url: '#',
      icon: 'fa fa-calendar'
    },
    {
      name: 'Rezerwacja Sal',
      url: '#',
      icon: 'fa fa-clock-o'
    },
    {
      name: 'Lista Pracowników',
      url: '/workers_list',
      icon: 'fa fa-user'
    },
    {
      name: 'Zgłoszenia Serwisowe',
      url: '#',
      icon: 'fa fa-laptop'
    },
  ]
};

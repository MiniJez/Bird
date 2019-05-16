import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Logout',
      url: '/menu/logout',
      icon: 'log-out'
    },
    {
      title: 'Playlist',
      url: '/menu/playlist',
      icon: 'musical-note'
    },
    {
      title: 'Add Song',
      url: '/menu/add-song',
      icon: 'add'
    }
    /*
    {
      title: 'Cool Frameworks',
      children: [
        {
          title: 'Ionic',
          url: '/menu/ionic',
          icon: 'logo-ionic'
        },
        {
          title: 'Flutter',
          url: '/menu/flutter',
          icon: 'logo-google'
        },
      ]
    }
    */
  ];

  constructor() {
  }

  ngOnInit() {
  }

}

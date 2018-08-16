import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../core/models/product';

@Component({
  selector: 'app-post-list',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit, OnDestroy {
  public dataSource = [
    {
      'id': 1,
      'guid': '5a2b9566-6ee7-4716-ad38-8f179f082206',
      'isActive': true,
      'balance': '$1,281.56',
      'picture': 'http://placehold.it/32x32',
      'age': 30,
      'eyeColor': 'brown',
      'name': {
        'first': 'Mia',
        'last': 'Stephens'
      },
      'company': 'EXOSWITCH',
      'email': 'mia.stephens@exoswitch.biz',
      'phone': '+1 (952) 406-2432',
      'address': '319 Goodwin Place, Curtice, North Dakota, 9036',
      'about': 'Consectetur laboris aliquip fugiat in. Consectetur incididunt commodo dolor exercitation dolore non proident commodo tempor sint dolor nostrud dolore. Occaecat elit mollit ex esse eiusmod laboris enim quis anim eu id eu adipisicing fugiat. Adipisicing elit officia enim sunt duis dolor sunt enim ut. Aliquip laboris est amet et sit laborum commodo. Mollit consequat fugiat enim pariatur occaecat reprehenderit esse consectetur cupidatat occaecat Lorem.',
      'registered': 'Tuesday, July 15, 2014 3:15 PM',
      'latitude': '-76.886431',
      'longitude': '44.680267',
      'tags': [
        'et',
        'nostrud',
        'laborum',
        'aliquip',
        'cupidatat'
      ]
    },
    {
      'id': 2,
      'guid': '4421c3c8-e1d0-4039-b508-b5b1d7be2252',
      'isActive': false,
      'balance': '$2,517.26',
      'picture': 'http://placehold.it/32x32',
      'age': 35,
      'eyeColor': 'brown',
      'name': {
        'first': 'Francisca',
        'last': 'Fleming'
      },
      'company': 'KINETICA',
      'email': 'francisca.fleming@kinetica.info',
      'phone': '+1 (853) 415-3501',
      'address': '822 Vernon Avenue, Campo, Marshall Islands, 5803',
      'about': 'Velit sit nulla aute cillum proident occaecat excepteur. Cillum consequat mollit commodo elit labore labore id velit officia sunt. Elit pariatur ipsum fugiat adipisicing tempor amet enim. Aliqua pariatur cillum dolore aute officia cillum reprehenderit aliqua.',
      'registered': 'Thursday, October 20, 2016 3:25 PM',
      'latitude': '50.785402',
      'longitude': '169.123592',
      'tags': [
        'et',
        'consectetur',
        'proident',
        'consequat',
        'deserunt'
      ]
    },
  ];
  public displayedColumns: string[] = ['avatar', 'name', 'balance', 'isActive', 'action'];

  constructor() {
  }

  ngOnInit() {
  }

  public ngOnDestroy(): void {
  }
}

import Category from '../classes/category';
import Clothes from '../classes/clothes';
import Outfits from '../classes/outfits';

export const EVENTS = [
  new Category('e1', 'Formal', '#fb1d93')
];

export const CATEGORIES = [
  new Category('c1', 'T-shirts', '#851dfb'),
  new Category('c2', 'Bottoms', '#851dfb'),
  new Category('c3', 'Socks', '#851dfb'),
  new Category('c4', 'Accessories', '#851dfb')
];

export const CLOTHES = [
  new Clothes(
    'm1',
    ['c1'],
    ['e1'],
    'Navy-blue shirt',
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Blue_Tshirt.jpg',
    's',
    'plain'),

  new Clothes(
    'm2',
    ['c3'],
    ['e1'],
    'Wool Grey socks',
    'https://cdn.pixabay.com/photo/2016/01/23/14/56/socks-1157528_960_720.jpg',
    'm',
    'plain'
  ),

  new Clothes(
    'm3',
    ['c1'],
    ['e2'],
    'navy blue shirt',
    'https://cdn.pixabay.com/photo/2016/02/07/14/59/shirts-1184914_960_720.jpg',
    'm',
    'denim'
  ),

  new Clothes(
    'm4',
    ['c4'],
    ['e2'],
    'scarf',
    'https://cdn.pixabay.com/photo/2018/01/30/12/08/scarf-3118634_960_720.jpg',
    'l',
    'checkered'
  ),

  new Clothes(
    'm5',
    ['c2'],
    ['e2'],
    'Dark blue trousers',
    'https://cdn.pixabay.com/photo/2017/08/27/05/33/trousers-2685231_960_720.jpg',
    'l',
    'plain'
  )
];
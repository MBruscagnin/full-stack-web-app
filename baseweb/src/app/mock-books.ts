import {Book} from './Book';
import { isDate } from 'util';

export const mockbooks: Book[] = [
    { 
        title: 'first book', 
        university: 'unive', 
        course: 'corso 1', 
        auctiondeadline: new Date("10-12-2020"), 
        startprice: 1.0, 
        reserveprice: 10, 
        zone: "venezia",
        seller: 'test1',
    winner:''},
    { 
         title: 'second book',
          university: 'unipd', course: 'corso 2',
           auctiondeadline: new Date(),
            startprice: 1.0,
            reserveprice: 10,
            zone: "venezia",
             seller: 'test2',
             winner:'' },
    { 
         title: 'third book',
          university: 'unimi',
           course: 'corso 3',
            auctiondeadline: new Date(),
             startprice: 1.0,
              reserveprice: 10, 
              zone: "venezia",
              seller: 'test3',
              winner:'' }
];

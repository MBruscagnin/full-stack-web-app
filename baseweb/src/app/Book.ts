// A book has a title, an author, an auction deadline, astarting price and a reserve price (not visible)
//
export interface Book {
    title: string,
    university: string,
    course: string,
    auctiondeadline: Date,
    startprice: number,
    reserveprice: number,
    zone: string,
    seller: string,
    winner: string
}

// User defined type guard
// Type checking cannot be performed during the execution (we don't have the Book interface anyway)
// but we can create a function to check if the supplied parameter is compatible with a given type
//
// A better approach is to use JSON schema
//

export function isBook(arg: any): arg is Book {
    return arg 
    && arg.title && typeof(arg.title) == 'string' 
    && arg.university && typeof(arg.university) == 'string' 
    && arg.course && typeof(arg.course) == 'string' 
    && arg.auctiondeadline && arg.auctiondeadline instanceof Date 
    && arg.startingprice && arg.startingprice == 'number'
    && arg.reserveprice && arg.reserveprice == 'number'
    && arg.zone && typeof(arg.zone) == 'string'
    && arg.seller && typeof(arg.seller) == 'string'
    && arg.winner && typeof(arg.winner) == 'string';
}

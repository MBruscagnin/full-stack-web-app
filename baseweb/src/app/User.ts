export interface User {
    username: string,
    mail: string,
    address: string,
    auctions: string[]
}

export function isUser(arg: any): arg is User {
    return arg 
    && arg.username && typeof(arg.username) == 'string'
    && arg.mail && typeof(arg.mail) == 'string'
    && arg.auctions && typeof(arg.auctions) == 'string'
    && arg.address && typeof(arg.address) == 'string';

}
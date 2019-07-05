export class Stazione{
    constructor(
        private nome : string,
        private id : string,

    ){
    }

    get Id() {return this.id;}
    get Nome() {return this.nome;}

}
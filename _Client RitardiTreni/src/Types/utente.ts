export class Utente {
    constructor(
        private username: string,
        private nome: string,
        private cognome: string,
        private email :string,
        private password: string

    ){
    }

    get Username() {return this.username;}
    get Nome() {return this.nome;}
    get Cognome() {return this.cognome;}
    get Email() {return this.email;}
    get Password() {return this.password;}
}
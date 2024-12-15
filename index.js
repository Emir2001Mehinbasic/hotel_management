class Osoba {
    ime;
    prezime;
    spol;
    #brojLicneKarte;
    godine;

    constructor(ime, prezime, spol, brojLicneKarte, godine){
        this.ime = ime;
        this.prezime = prezime;
        this.spol = spol;
        this.#brojLicneKarte = brojLicneKarte;
        this.godine = godine;
    }

    set brojLicneKarte(brojLicneKarte){
        this.#brojLicneKarte = brojLicneKarte;
    }

    get brojLicneKarte(){
        return this.#brojLicneKarte;
    }
};

class Admin {
    maxBrojKorisnika = 50;
    gosti = [];
    logovaniGosti = [];
    id;
    username;
    constructor(id = 'admin', usernam = 'adminadmin') {
        this.id = id;
        this.username = username;
    }
    korisnickoIme(ime, prezime) {
      return `${ime}_${prezime}`;
    }
    korisnickiPassword(ime, prezime, godine) {
        return `${ime}${prezime}${godine}`;
    }

    prijavaKorisnika(korisnik, tipSobe, brojSobe) {
        let  gost= {
           ime: korisnik.ime,
           prezime: korisnik.prezime,
           spol: korisnik.spol,
           broj_licne: korisnik.broj_licne_karte,
           godine: korisnik.godine,
           broj: korisnik.broj,
           brojSobe: brojSobe,
           tipSobe: tipSobe,
           vrijeme_prijave: Date(),
           korisnickoIme : this.korisnickoIme(korisnik.ime, korisnik.prezime),
           password: this.korisnickiPassword(korisnik.ime, korisnik.prezime, korisnik.godine),
           dodatneUsluge : []
        };
        this.gosti.push(gost)
    }

    logovanjeGosta(korisnickoIme, sifra) {
        let logovan = this.gosti.find(e => e.korisnickoIme === korisnickoIme && e.password == sifra) 
        if(logovan) {
            this.logovaniGosti.push(logovan);
        }
    }
    promijeniTipSobe (ime,prezime, tipSobe) {
        let gost = this.gosti.find(gost => gost.ime === ime && gost.prezime === prezime)

       if (gost) {
        gost.tipSobe = tipSobe;
       }
    }

    promijeniBrojSobe (ime,prezime, brojSobe) {
        let gost = this.gosti.find(gost => gost.ime === ime && gost.prezime === prezime)

       if (gost) {
        gost.brojSobe = brojSobe;
       }
    }
    dodajUslugu (ime,prezime, usluga) {
        let gost = this.gosti.find(gost => gost.ime === ime && gost.prezime === prezime)

       if (gost) {
        gost.dodatneUsluge.push(usluga);
       }
    }

    izbrisiUslugu(ime,prezime,usluga) {
        let gost = this.gosti.find(gost => gost.ime === ime && gost.prezime === prezime)
        let imaUslugu = gost.dodatneUsluge.indexOf(usluga);
        if(gost && imaUslugu >= 0) {
            gost.dodatneUsluge.splice(imaUslugu, 1)
        }
    }

    odjavaKorisnika(korisnik) {
        let gost = this.gosti.find(e => e.ime === korisnik.ime && e.prezime === korisnik.prezime)
        if(gost) {
            this.gosti = this.gosti.filter(e => e != gost)
        }
    }

    sviKorisnicni() {
        return this.gosti;
    }
    
    izlogujSveKorisnike() {
        this.logovaniGosti.length = 0;
    }
    
    izlogujKorisnika(gost) {
        let logovan = this.logovaniGosti.find(e => e.ime === gost.ime && e.prezime === gost.prezime)
        if(logovan) {
        this.logovaniGosti = this.logovaniGosti.filter(e => e.ime !== gost.ime)
           }   
         }

    gasenjeSistema() {
        this.gosti = [];
        this.logovaniGosti = [];
    }
}
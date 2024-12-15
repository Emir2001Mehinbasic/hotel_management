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
    constructor(ime) {
        
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
           korisnickoIme : korisnickoIme(korisnik.ime, korisnik.prezime),
           password: korisnickiPassword(korisnik.ime, korisnik.prezime, korisnik.godine),
           dodatne_usluge : []
        };
        this.gosti.push(gost)

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
    promijeniUslugu (ime,prezime, usluga) {
        let gost = this.gosti.find(gost => gost.ime === ime && gost.prezime === prezime)

       if (gost) {
        gost.dodatneUsluge.push(usluga);
       }
    }

    odjavaKorisnika(gost) {
        let gost = this.gosti.find(gost => gost.ime === ime && gost.prezime === prezime)
        if(gost) {
            this.gosti = this.gosti.filter(e => e != gost)
        }
    }
}
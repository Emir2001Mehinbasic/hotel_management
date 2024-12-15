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
    constructor(ime) {
        
    }
    korisnickoIme(ime, prezime) {
      return `${ime}_${prezime}`;
    }
    korisnickiPassword(ime, prezime, godine) {
        return `${ime}${prezime}${godine}`;
    }

    prijavaKorisnika(ime, prezime, spol, broj_licne_karte, god, broj, tip_sobe) {
        let korisnik = {
           ime: ime,
           prezime: prezime,
           spol: spol,
           broj_licne: broj_licne_karte,
           godine: god,
           broj: broj,
           tip_sobe: tip_sobe,
           vrijeme_prijave: Date(),
           korisnickoIme : korisnickoIme(ime, prezime),
           password: korisnickiPassword(ime, prezime, godine),
           dodatne_usluge : []
        };
    }
    promijeni_informacije 
}
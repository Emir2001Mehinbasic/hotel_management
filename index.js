class Hotel{
    adresa;
    #maxBrojSoba = 50;
    sobe = [];
    rezervisaneSobe = [];
    static uslugeHotela = [
        {usluga: 'Kino', cijena: 10},
        {usluga: 'Teretena', cijena: 10},
        {usluga: 'Sauna', cijena: 10},
        {usluga: 'Restoran', cijnea: 10},
        {usluga: 'Bazen', cijena: 10}
    ];

    constructor(adresa) {
        this.adresa = adresa;
        this.generisiSobe();
    }

    generisiSobe(){
        for(let i = 1; i <= this.#maxBrojSoba; i++){
            if(i <= 20)
                this.sobe.push({brojSobe: i, tipSobe: 'jednokrevetna', cijena: 20});
            else if(i > 20 && i <= 40)
                this.sobe.push({brojSobe: i, tipSobe: 'dvokrevetna', cijena: 40});
            else 
                this.sobe.push({brojSobe: i, tipSobe: 'apartman', cijena: 60});
        }
    }

    rezervisiSobu(tipSobe){
        let soba = this.sobe.find((e) => e.tipSobe === tipSobe.toLowerCase());
        if(soba){
            this.sobe = this.sobe.filter((e) => e.brojSobe != soba.brojSobe);
            this.rezervisaneSobe.push(soba);
            return true;
        }
        
        return false;
    }

    oslobodiSobu(soba){
        let rezervisana = this.rezervisaneSobe.find((e) => e.brojSobe === soba.brojSobe);
        if(rezervisana){
            this.rezervisaneSobe = this.rezervisaneSobe.filter((e) => e.brojSobe != soba.brojSobe);
            this.sobe.push(soba);
            this.sobe.sort((a, b ) => a.brojSobe - b.brojSobe);
            return true;
        }
        return false;
    }


};

//klasa sadrzi samo korisnike koji su prijavljeni u hotelu
class Prijave{
    static prijavljeniKorisnici = [];

    provjeriPrijavljeneKorisnike(){
        //vraca ispis svih prijavljenih korisnika
    }

};

//kada se korisnik prijavi u hotel, dobije sobu, pravi se instanca ove klase za lakse upravljanje i racunanje cijena usluga
class Rezervacija{
    soba;
    usluge = [];
    
    static prikaziRezervaciju(){
        //metoda vraca informacije o rezervaciji korisnika
    }
};


class Korisnik {
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

    provjeriRacun(){
        //provjerava ukupan racun za dosadasnje usluge koje je korisnik imao
    }

    rezervisiUslugu(){
        //salje zahtjev adminu da zeli rezervisati uslugu
    }

    zatraziPromjenuSobe(){
        //salje zahtjev adminu da zeli promjenu sobe
    }

    odjaviSeIzHotela(){
        //salje zahtjev adminu da se odjavi iz hotela
    }

    platiRacun(){
        //prije nego sto korisnik bude odjavljen iz hotela, obavezno mora platiti racun za koristene usluge
    }
};

class Admin{
    username = 'admin';
    password = 'admin';

    //metoda simulira potrebu da se admin prijavi kako bi sistem funkcionisao
    prijavaAdmina(username, password){
        if(username !== this.username && password !== this.password){
           console.log(`Uneseni su pogresni podaci za prijavu!`);
           process.exit();
        }
    }


    prijaviKorisnika(korisnik, tipSobe){
        //prima objekat korisnik i string tip sobe koju korisnik zeli da rezervise za sebe, koristi funkcije generisiUsername i generisiPassword
        //dodaje korisnika u niz prijavljeniKorisnici iz klase hotel
    }

    #generisiUsernameKorisniku(ime, prezime, godine){
        return ime.toLowerCase() + '_' + prezime.toLowerCase() + godine + (Math.random() * 10).toFixed(0);
    }

    #generisiPasswordKorisniku(ime, prezime, godine){
        return prezime.toLowerCase() + ime.toLowerCase() + godine;
    }

    promijeniInformacijeKorisniku(){
        //mijenja informacije o korisniku (Promjena sobe i tipa sobe, dodatne usluge koje korisnik koristi)

    }

    izdajRacunKorisniku(korisnik){
        //izracuna koliko usluga i sta je imao korisnik te izda ukupni racun, prima objekat korisnika i na osnovu toga racuna ukupno 
    }

    odjaviSveKorisnike(){
        //nije mi jasno sta metoda treba da radi//************************************ */
    }

    odjaviKorisnika(korisnik){
        //odjavljuje korisnika iz hotela
    }

    ugasiSistem(){
        //gasi cijeli sistem a prethodno poziva metode za odjavljivanje svih korisnika, ispisuje poruku dovidjenja i gasi sistem
    }

    pretraziPrijavljeneKorisnike(ime, brojLicneKarte, username){
        
    }

    odobriOdjavuKorisnika(){
        //nakon sto korisnik posalje zahtjev za odjavu, admin treba da izda racun i nakon sto korisnik plati racun onda da odobri odjavu korisnika iz hotela
    }

};

//kreiranje objekta admin, i pozivanje metode za prijavu
//ako su uneseni pogresni podaci onda se prekida izvrsavanje cijele skripte

const admin = new Admin();
admin.prijavaAdmina('admin', 'admin');

/* **************************************************************** */
const hotel = new Hotel('nekaAdresa');

admin.prijaviKorisnika();


hotel.rezervisiSobu('Jednokrevetna');
hotel.rezervisiSobu('Dvokrevetna');

hotel.oslobodiSobu({brojSobe: 1, tipSobe: 'jednokrevetna'});

//GLOBALNE VARIJABLE I FUNKCIJE

function ispisLinija(brojLinija = 80) { 
    let linija = '';
    while(brojLinija > 0){
        linija += '-';
        brojLinija--;
    }

    console.log(linija);
 }

/*************************************************************************** */
class Hotel{
    adresa;
    static #maxBrojSoba = 50;
    static sobe = [];
    static rezervisaneSobe = [];
    static uslugeHotela = [
        {usluga: 'Kino', cijena: 10},
        {usluga: 'Teretena', cijena: 10},
        {usluga: 'Sauna', cijena: 20},
        {usluga: 'Restoran', cijnea: 10},
        {usluga: 'Bazen', cijena: 30}
    ];

    constructor(adresa) {
        this.adresa = adresa;
        this.generisiSobe();
    }

    static generisiSobe(){
        for(let i = 1; i <= this.#maxBrojSoba; i++){
            if(i <= 20)
                Hotel.sobe.push({brojSobe: i, tipSobe: 'jednokrevetna', cijena: 20});
            else if(i > 20 && i <= 40)
                Hotel.sobe.push({brojSobe: i, tipSobe: 'dvokrevetna', cijena: 40});
            else 
                Hotel.sobe.push({brojSobe: i, tipSobe: 'apartman', cijena: 60});
        }
    }

    static rezervisiSobu(tipSobe){
        let soba = Hotel.sobe.find((e) => e.tipSobe === tipSobe.toLowerCase());
        if(soba){
            Hotel.sobe = Hotel.sobe.filter((e) => e.brojSobe != soba.brojSobe);
            Hotel.rezervisaneSobe.push(soba);
            return soba;
        }
        
        return false;
    }

    static oslobodiSobu(soba){
        let rezervisana = Hotel.rezervisaneSobe.find((e) => e.brojSobe === soba.brojSobe);
        if(rezervisana){
            Hotel.rezervisaneSobe = Hotel.rezervisaneSobe.filter((e) => e.brojSobe != soba.brojSobe);
            Hotel.sobe.push(soba);
            Hotel.sobe.sort((a, b ) => a.brojSobe - b.brojSobe);
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

    //prima objekat rezervacija i upisuje ga u niz
    static upisiKorisnika(rezervacija){
        this.prijavljeniKorisnici.push(rezervacija);
    }

    static odjaviKorisnika(rezervacija){
        this.prijavljeniKorisnici = this.prijavljeniKorisnici.filter((e) => e.brojRezervacije != rezervacija.brojRezervacije);
    }

};


//kada se korisnik prijavi u hotel, dobije sobu, pravi se instanca ove klase za lakse upravljanje i racunanje cijena usluga
class Rezervacija{
    static brojRezervacije = 1;
    brojRezervacije;
    brojLicneKarteKorisnika;
    brojSobe;
    tipSobe;
    datumRezervacije;
    usluge = [];
    ukupnaCijena;

    constructor(soba, brojLicneKarte){
        this.brojLicneKarteKorisnika = brojLicneKarte;
        this.tipSobe = soba.tipSobe;
        this.brojSobe = soba.brojSobe;
        this.ukupnaCijena = soba.cijena;
        this.brojRezervacije = Rezervacija.brojRezervacije;
        this.datumRezervacije = this.#generisiVrijeme();
        Rezervacija.brojRezervacije++;
    }
    
    static prikaziRezervaciju(brojLicneKarte){
        //metoda vraca informacije o rezervaciji korisnika
        let rezervacija = Prijave.prijavljeniKorisnici.find((e) => {
            if(e.brojLicneKarteKorisnika === brojLicneKarte){
                // e.getUkupnaCijena();
                return e;
            }
            return `Rezervacija korisnika ne postoji!`;
        });

        return rezervacija;
    }

    getUkupnaCijena(){
        this.ukupnaCijena = this.ukupnaCijena * this.izracunajVrijemeBoravka();
        this.usluge.forEach((e) => this.ukupnaCijena += e.cijena);
        return this.ukupnaCijena;
    }

    #generisiVrijeme(){
        let dan = new Date();
        return dan.getDate() + '.' + Number(dan.getMonth() + 1) + '.' + dan.getFullYear();
    }


    izracunajVrijemeBoravka(){
        let trenutno = this.#generisiVrijeme();
        trenutno = trenutno.split(".").reverse().join(".");
   
        let ukupnoVrijemeBoravka = 1;

        let pom = this.datumRezervacije;
        pom = pom.split(".").reverse().join(".");

        let pocetak = new Date(pom);
        let kraj = new Date(trenutno);
        
        ukupnoVrijemeBoravka = (kraj - pocetak) / (1000 * 60 * 60 * 24);

        return ukupnoVrijemeBoravka;
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

    set setBrojLicneKarte(brojLicneKarte){
        this.#brojLicneKarte = brojLicneKarte;
    }

    get getBrojLicneKarte(){
        return this.#brojLicneKarte;
    }

    provjeriRacun(){
        //provjerava ukupan racun za dosadasnje usluge koje je korisnik imao
        ispisLinija();
        const rez = Rezervacija.prikaziRezervaciju(this.getBrojLicneKarte); //u varijabli rez je instanca rezervacije, mogu se prikazivati svi detalji, cijena, usluge itd
        console.log(`Datum prijave: ${rez.datumRezervacije}`);
        console.log(`Koristene usluge: `);
        rez.usluge.forEach((e) => console.log((`\t\t ${e.usluga}`)));
        console.log(`Ukupno: ${rez.ukupnaCijena} KM`);
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
    isLoggedIn = false;

    //metoda simulira potrebu da se admin prijavi kako bi sistem funkcionisao
    prijavaAdmina(username, password){
        if(username !== this.username && password !== this.password){
           console.log(`Uneseni su pogresni podaci za prijavu!`);
           process.exit();
        }

        if(Hotel.sobe.length === 0)
            Hotel.generisiSobe();

        this.isLoggedIn = true;

        ispisLinija();
        console.log(`\t\tUspjesno ste prijavljeni u sistem kao ADMIN`);
    }

    odjavaAdmina(){
        this.isLoggedIn = false;
        console.log("Dovidjenja!");
    }


    prijaviKorisnika(korisnik, tipSobe){
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        //prima objekat korisnik i string tip sobe koju korisnik zeli da rezervise za sebe, koristi funkcije generisiUsername i generisiPassword
        //dodaje korisnika u niz prijavljeniKorisnici iz klase hotel
        if(typeof korisnik != "object") return;
        let soba = Hotel.rezervisiSobu(tipSobe);
        if(!soba) return;

        Prijave.upisiKorisnika(new Rezervacija(soba, korisnik.getBrojLicneKarte));

    }

    #generisiUsernameKorisniku(ime, prezime, godine){
        return ime.toLowerCase() + '_' + prezime.toLowerCase() + godine + (Math.random() * 10).toFixed(0);
    }

    #generisiPasswordKorisniku(ime, prezime, godine){
        return prezime.toLowerCase() + ime.toLowerCase() + godine;
    }

    promijeniInformacijeKorisniku(){
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        //mijenja informacije o korisniku (Promjena sobe i tipa sobe, dodatne usluge koje korisnik koristi)

    }

    izdajRacunKorisniku(korisnik){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }

        //izracuna koliko usluga i sta je imao korisnik te izda ukupni racun, prima objekat korisnika i na osnovu toga racuna ukupno
        let racun = Rezervacija.prikaziRezervaciju(korisnik.getBrojLicneKarte); // racun je objekat u ovom slucaju jer funkcija vraca objekat

        if(!racun) {console.log(`Rezervacija ne postoji u sistemu`); return;}

        console.log(`Tip sobe: ${racun.tipSobe.charAt(0).toUpperCase()}${racun.tipSobe.slice(1)}`);
        console.log("Usluge: ");
        racun.usluge.forEach((e) => console.log(`\t${e.usluga}`)); //usluge su niz objekata
        console.log(`Ukupno: ${racun.ukupnaCijena}`); //u objektu rezervacija vec postoji izracunata cijena svega sto je korisnik koristio

    }

    odjaviSveKorisnike(){
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        //nije mi jasno sta metoda treba da radi//************************************ */
    }

    odjaviKorisnika(korisnik){
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        //odjavljuje korisnika iz hotela, obavezno pozvati static metodu iz klase prijave kako bi se izbrisao korisnik i baze prijavljenih
    }

    ugasiSistem(){
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        //gasi cijeli sistem a prethodno poziva metode za odjavljivanje svih korisnika, ispisuje poruku dovidjenja i gasi sistem
    }

    pretraziPrijavljeneKorisnike(ime, brojLicneKarte, username){
        if(!this.isLoggedIn){console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);return;}
        
    }

    odobriOdjavuKorisnika(){
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return;}
        //nakon sto korisnik posalje zahtjev za odjavu, admin treba da izda racun i nakon sto korisnik plati racun onda da odobri odjavu korisnika iz hotela
    }

};

//kreiranje objekta admin, i pozivanje metode za prijavu
//ako su uneseni pogresni podaci onda se prekida izvrsavanje cijele skripte

const admin = new Admin();
admin.prijavaAdmina('admin', 'admin');

/* **************************************************************** */
admin.prijaviKorisnika();

const korisnik1 = new Korisnik('Ane', 'Kane', 'M', '145262AK', 21);

admin.prijaviKorisnika(korisnik1, 'jednokrevetna');

// console.log(Prijave.prijavljeniKorisnici);

korisnik1.provjeriRacun();
admin.izdajRacunKorisniku(korisnik1);
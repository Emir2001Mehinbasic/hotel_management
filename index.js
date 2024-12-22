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
        {usluga: 'Restoran', cijena: 10},
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

class Sistem{
    static logedUsers = [];
    static zahtjeviZaOdjavu = [];
    static zahtjevZaUslugu = [];
    static zahtjevZaPromjenuSobe = [];   

    static dodajLogIn(korisnik){
        Sistem.logedUsers.push(korisnik);
    }

    static odjaviSveKorisnike(){
      Sistem.logedUsers.forEach((e) =>{
        e.loggedIn = false;
      })
      Sistem.logedUsers = [];
    }

    static pronadjiZahtjevZaOdjavu(korisnik){
        return Sistem.zahtjeviZaOdjavu.find((e) => e.getBrojLicneKarte === korisnik.getBrojLicneKarte);
    }

    static pronadjiZahtjevZaUslugu(korisnik){
       return Sistem.zahtjevZaUslugu.find((e) => e.korisnik.getBrojLicneKarte === korisnik.getBrojLicneKarte);
    }

    static pronadjiZahtjevZaPromjenuSobe(korisnik){
        return Sistem.zahtjevZaPromjenuSobe.find((e) => e.korisnik.getBrojLicneKarte === korisnik.getBrojLicneKarte);
    }
}


class Prijave{
    static prijavljeniKorisnici = [];

    static provjeriPrijavljeneKorisnike(){
        console.log(Prijave.prijavljeniKorisnici);
    }

    static pronadjiPrijavu(brojLicneKarte, username){
      return Prijave.prijavljeniKorisnici.find((e) => e.brojLicneKarteKorisnika === brojLicneKarte || e.username === username);
    }

    static upisiKorisnika(rezervacija){
        this.prijavljeniKorisnici.push(rezervacija);
    }

    static odjaviKorisnika(rezervacija){
        this.prijavljeniKorisnici = this.prijavljeniKorisnici.filter((e) => e.brojRezervacije != rezervacija.brojRezervacije);
    }

};


class Rezervacija{
    static brojRezervacije = 1;
    brojRezervacije;
    brojLicneKarteKorisnika;
    username;
    brojSobe;
    tipSobe;
    #cijenaSobe;
    datumRezervacije;
    usluge = [];
    ukupnaCijena = 0;

    constructor(soba, korisnik){
        this.brojLicneKarteKorisnika = korisnik.getBrojLicneKarte;
        this.username = korisnik.username;
        this.tipSobe = soba.tipSobe;
        this.brojSobe = soba.brojSobe;
        this.#cijenaSobe = soba.cijena;
        this.brojRezervacije = Rezervacija.brojRezervacije;
        this.datumRezervacije = this.#generisiVrijeme();
        Rezervacija.brojRezervacije++;
    }
    
    static prikaziRezervaciju(brojLicneKarte, username){
        let rezervacija = Prijave.prijavljeniKorisnici.find((e) => e.brojLicneKarteKorisnika === brojLicneKarte || e.username === username);

        if(!rezervacija)
            return false;
        
        rezervacija.getUkupnaCijena();
        return rezervacija;
    }

    getUkupnaCijena(){
        this.ukupnaCijena = 0;
        this.ukupnaCijena = this.#cijenaSobe * this.izracunajVrijemeBoravka();
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
        
        if((kraj - pocetak) > 0)
            ukupnoVrijemeBoravka = (kraj - pocetak) / (1000 * 60 * 60 * 24);

        return ukupnoVrijemeBoravka;
    }

    get getCijenaSobe(){
        return this.#cijenaSobe;
    }
    set setCijenaSobe(cijena){
        this.#cijenaSobe = cijena;
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
        ispisLinija();
        if(!this.loggedIn){console.log(`Korisnik se mora prvo prijaviti u sistem`); return; }

        const rez = Rezervacija.prikaziRezervaciju(this.getBrojLicneKarte);
        if(!rez){console.log(`Rezervacija ne postoji u sistemu!`); return;}

        console.log(`Datum prijave: ${rez.datumRezervacije}`);
        console.log(`Tip sobe: ${rez.tipSobe.charAt(0).toUpperCase()}${rez.tipSobe.slice(1)}`);
        if(rez.usluge.length > 0){
            console.log(`Koristene usluge: `);
            rez.usluge.forEach((e) => console.log((`\t\t ${e.usluga}`)));
        }
        console.log(`Ukupno: ${rez.ukupnaCijena} KM`);
    }

    prijavaNaSistem(username, password){
        console.log(`\n`);
        ispisLinija();
      if(username === this.username && password === this.password){
        this.loggedIn = true;
        Sistem.dodajLogIn(this);
        console.log(`\t\tUspjesno ste se prijavili na sistem kao korisnik!`);
      }
      else 
        console.log(`Unijeli ste pogresne podatke za prijavu`);
    }

    odjavaSaSistema(){
        ispisLinija();
        let rezervacija = Prijave.pronadjiPrijavu(this.getBrojLicneKarte);
        if(!rezervacija){ console.log(`Korisnik nije prijavljen u sistemu!`); return; }
        if(this.loggedIn){
            Sistem.logedUsers = Sistem.logedUsers.filter((e) => e.username != this.username);
            this.loggedIn = false;
            console.log(`Uspjesno ste odjavljeni sa sistema!`);
        }
        else
            console.log(`Korisnik nije prijavljen u sistemu!`);
    }

    rezervisiUslugu(novaUsluga){
        ispisLinija();
        if(!this.loggedIn){console.log(`Korisnik se mora prvo prijaviti u sistem`); return; }

        let usluga = Hotel.uslugeHotela.find((e) => e.usluga.toLowerCase() === novaUsluga.toLowerCase());
        
        Sistem.zahtjevZaUslugu.push({usluga: usluga, korisnik: this});

        console.log(`Zahtjev za rezervaciju usluge je poslan, ceka se na odobrenje od admina!`);        
    }

    zatraziPromjenuSobe(tipSobe){
        ispisLinija();
      if(!this.loggedIn){console.log(`Korisnik se mora prvo prijaviti u sistem`); return; }
        if(tipSobe.toLowerCase() != 'jednokrevetna' && tipSobe.toLowerCase() != 'dvokrevetna' && tipSobe.toLowerCase() != 'apartman'){
            console.log(`Unesen je pogresan tip sobe`);
            return;
        }
      let soba = Hotel.sobe.find((e) => e.tipSobe.toLowerCase() === tipSobe.toLowerCase());

      if(!soba){ console.log(`Ne postoji slobodna soba sa navedenim specifikacijama!`); return;}

      Sistem.zahtjevZaPromjenuSobe.push({soba: soba, korisnik: this});
      console.log(`Zahtjev za promjenu sobe je poslan, ceka se na odobrenje od admina!`);
    }

    odjaviSeIzHotela(){
        ispisLinija();
        if(!this.loggedIn){console.log(`Korisnik se mora prvo prijaviti u sistem`); return; }

        Sistem.zahtjeviZaOdjavu.push(this);
        console.log(`Zahtjev za odjavu iz hotela je poslan, ceka se na odobrenje od admina!`);
    }

    platiRacun(){
        ispisLinija();
      if(!this.loggedIn){ console.log(`Korisnik se mora prvo prijaviti u sistem`); return; }
      this.placenRacun = true;
      console.log(`Uspjesno ste platili racun!`);
    }
};

class Admin{
    username = 'admin';
    password = 'admin';
    isLoggedIn = false;

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
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        
        if(typeof korisnik != "object") return;
        if(Rezervacija.prikaziRezervaciju(korisnik.getBrojLicneKarte)){console.log(`Korisnik vec ima rezervaciju!`); return;}
        let soba = Hotel.rezervisiSobu(tipSobe);
        if(!soba) { console.log('Nema slobodnih soba sa tim specifikacijama'); return; }

        let username = this.#generisiUsernameKorisniku(korisnik.ime, korisnik.prezime, korisnik.godine);
        let password = this.#generisiPasswordKorisniku(korisnik.ime, korisnik.prezime, korisnik.godine);

        korisnik.username = username;
        korisnik.password = password;

        Prijave.upisiKorisnika(new Rezervacija(soba, korisnik));
        console.log(`Kreirana je nova rezervacija na ime ${korisnik.ime} ${korisnik.prezime}.\nBroj sobe: ${soba.brojSobe}\nTip sobe: ${soba.tipSobe.charAt(0).toUpperCase()}${soba.tipSobe.slice(1)}`);
        console.log(`\nUsername korisnika:`,username);
        console.log(`Password korisnika`, password);
    }

    
    #generisiUsernameKorisniku(ime, prezime, godine){
        return ime.toLowerCase() + '_' + prezime.toLowerCase() + godine;//+ (Math.random() * 10).toFixed(0);
    }

    #generisiPasswordKorisniku(ime, prezime, godine){
        return prezime.toLowerCase() + ime.toLowerCase() + godine;
    }

    promijeniInformacijeKorisniku(korisnik, tipSobe){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }

        let rezervacija = Prijave.pronadjiPrijavu(korisnik.getBrojLicneKarte);
        if(!rezervacija){ console.log(`Korisnik nema rezervacije u hotelu!`); return; }

        if(rezervacija.tipSobe == tipSobe.toLowerCase()){ console.log(`Korisnik vec ima rezervisan taj tip sobe`); return; }

        rezervacija.usluge.push({usluga: 'Dodatna soba (' + rezervacija.tipSobe.charAt(0).toUpperCase() + rezervacija.tipSobe.slice(1) + ')', cijena: rezervacija.getCijenaSobe});
        let soba = Hotel.rezervisiSobu(tipSobe);
        if(!soba){ console.log(`Nema slobodnih soba sa tim specifikacijama u hotelu`); return; }
        
        let trenutnaSoba = {brojSobe: rezervacija.brojSobe, tipSobe: rezervacija.tipSobe, cijena: rezervacija.getCijenaSobe};
        Hotel.oslobodiSobu(trenutnaSoba);

        rezervacija.tipSobe = soba.tipSobe;
        rezervacija.brojSobe = soba.brojSobe;
        rezervacija.setCijenaSobe = soba.cijena;

        console.log(`Korisnik je uspjesno premjesten u drugu sobu!`);
        return true;
    }

    izdajRacunKorisniku(korisnik){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }

        let racun = Rezervacija.prikaziRezervaciju(korisnik.getBrojLicneKarte);
        if(!racun) {console.log(`Rezervacija ne postoji u sistemu`); return;}

        console.log(`Tip sobe: ${racun.tipSobe.charAt(0).toUpperCase()}${racun.tipSobe.slice(1)}`);
        if(racun.usluge.length > 0){
            console.log("Usluge: ");
            racun.usluge.forEach((e) => console.log(`\t${e.usluga}`));
        }
        console.log(`Ukupno: ${racun.ukupnaCijena} KM`); 

    }

    odjaviSveKorisnikeIzSistema(){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        Sistem.odjaviSveKorisnike();
        console.log(`Uspjesno su odjavljeni svi korisnici iz sistema`);
        return true;
    }

    odjaviKorisnikaIzSistema(korisnik){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        
        let korisnikUSistemu = Sistem.logedUsers.find((e) => e.username === korisnik.username);
        if(!korisnikUSistemu){console.log(`Korisnik nije prijavljen`); return; }

        Sistem.logedUsers = Sistem.logedUsers.filter((e) => e.username != korisnikUSistemu.username);
        korisnik.loggedIn = false;

        console.log(`Korisnik je uspjsno odjavljen!`);
    }

    ugasiSistem(){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        if(this.odjaviSveKorisnikeIzSistema()){
          console.log(`Sistem se gasi`);
          ispisLinija();
          ispisLinija(1);
          ispisLinija(1);
          process.exit();
        }
    }

    pretraziPrijavljeneKorisnike(brojLicneKarte, username){
        ispisLinija();
        if(!this.isLoggedIn){console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return;}
        let rezervacija = Prijave.pronadjiPrijavu(brojLicneKarte, username);
        if(!rezervacija){console.log(`Ne postoji prijavljen korisnik!`); return; }

        console.log(rezervacija);
        
    }

    odobriOdjavuKorisnika(korisnik){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return;}
        
        let zahtjev = Sistem.pronadjiZahtjevZaOdjavu(korisnik);
        
        if(!zahtjev.placenRacun){ console.log(`Nije moguce odjaviti korisnika iz hotela jer nije platio racun!`); return; }

        Sistem.zahtjeviZaOdjavu = Sistem.zahtjeviZaOdjavu.filter((e) => e.getBrojLicneKarte != korisnik.getBrojLicneKarte);
        Prijave.odjaviKorisnika(Prijave.pronadjiPrijavu(korisnik.getBrojLicneKarte));
        delete korisnik.username;
        delete korisnik.password;
        let provjera = Prijave.pronadjiPrijavu(korisnik.getBrojLicneKarte);
        if(provjera){ console.log(`Dogodila se nepoznata greska sa odjavom korisnika. Pokusajte ponovo!`); return; }
        console.log(`Korisnik je uspjesno odjavljen iz hotela!`);
         
    }

    odobriUsluguKorisnika(korisnik){
        ispisLinija();
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
        let zahtjev = Sistem.pronadjiZahtjevZaUslugu(korisnik);
        if(!zahtjev){console.log(`Korisnik nema zahtjeva na cekanju!`); return; }

        let rezervacija = Prijave.pronadjiPrijavu(korisnik.getBrojLicneKarte);
        if(!rezervacija){console.log(`Korisnik nema rezervacija u sistemu!`); return; }
        Sistem.zahtjevZaUslugu = Sistem.zahtjevZaUslugu.filter((e) => e.korisnik.getBrojLicneKarte != korisnik.getBrojLicneKarte);
        rezervacija.usluge.push(zahtjev.usluga);

        console.log(`Zahtjev za uslugu je rijesen i usluga je odobrena korisniku!`);

    }

    odobriPromjenuSobeKorisniku(korisnik){
        if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return;}
        let zahtjev = Sistem.pronadjiZahtjevZaPromjenuSobe(korisnik);

        if(!zahtjev){ console.log(`Zahtjev ne postoji u sistemu!`); return; }

        let odabraniTipSobe = zahtjev.soba.tipSobe;
        let funk = this.promijeniInformacijeKorisniku(korisnik, odabraniTipSobe);
        if(funk)
            Sistem.zahtjevZaPromjenuSobe = Sistem.zahtjevZaPromjenuSobe.filter((e) => e.korisnik.getBrojLicneKarte != korisnik.getBrojLicneKarte);
    }
};

//kreiranje objekta admin, i pozivanje metode za prijavu
//ako su uneseni pogresni podaci onda se prekida izvrsavanje cijele skripte

const admin = new Admin();
admin.prijavaAdmina('admin', 'admin');

/* **************************************************************** */

const korisnik1 = new Korisnik('Ane', 'Kane', 'M', '145262AK', 21);
const korisnik2 = new Korisnik('Munib', 'Osmic', 'M', '1525235A', 22);
const korisnik3 = new Korisnik('Ajla', 'Hadzic', 'F', '15fs21435', 27);

admin.prijaviKorisnika(korisnik1, 'jednokrevetna');
admin.prijaviKorisnika(korisnik2, 'apartman');

// admin.prijaviKorisnika(korisnik3, 'jednokrevetna');

// console.log(Prijave.prijavljeniKorisnici);

// korisnik1.provjeriRacun();
admin.izdajRacunKorisniku(korisnik2);

korisnik1.prijavaNaSistem('ane_kane21', 'kaneane21');
korisnik1.provjeriRacun();
korisnik1.rezervisiUslugu('Bazen');
admin.odobriUsluguKorisnika(korisnik1);
korisnik1.zatraziPromjenuSobe('apartman')
admin.odobriPromjenuSobeKorisniku(korisnik1);
// korisnik2.odjaviSeIzHotela();

korisnik1.odjaviSeIzHotela();
korisnik1.platiRacun();
// console.log(Sistem.zahtjeviZaOdjavu);
admin.odobriOdjavuKorisnika(korisnik1);
// admin.odobriUsluguKorisnika(korisnik1);

console.log(".......",Prijave.pronadjiPrijavu(korisnik1.getBrojLicneKarte));
korisnik1.provjeriRacun();
korisnik1.odjavaSaSistema();


admin.ugasiSistem();

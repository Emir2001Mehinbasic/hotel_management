//GLOBALNE VARIJABLE I FUNKCIJE

function ispisLinija(brojLinija = 80) {
  let linija = "";
  while (brojLinija > 0) {
    linija += "-";
    brojLinija--;
  }

  console.log(linija);
}

/*************************************************************************** */
class Hotel {
  adresa;
  static #maxBrojSoba = 50;
  static sobe = [];
  static rezervisaneSobe = [];
  static uslugeHotela = [
    { usluga: "Kino", cijena: 10 },
    { usluga: "Teretena", cijena: 10 },
    { usluga: "Sauna", cijena: 20 },
    { usluga: "Restoran", cijnea: 10 },
    { usluga: "Bazen", cijena: 30 },
  ];

  constructor(adresa) {
    this.adresa = adresa;
    this.generisiSobe();
  }

  static generisiSobe() {
    for (let i = 1; i <= this.#maxBrojSoba; i++) {
      if (i <= 20)
        Hotel.sobe.push({ brojSobe: i, tipSobe: "jednokrevetna", cijena: 20 });
      else if (i > 20 && i <= 40)
        Hotel.sobe.push({ brojSobe: i, tipSobe: "dvokrevetna", cijena: 40 });
      else Hotel.sobe.push({ brojSobe: i, tipSobe: "apartman", cijena: 60 });
    }
  }

  static rezervisiSobu(tipSobe) {
    let soba = Hotel.sobe.find((e) => e.tipSobe === tipSobe.toLowerCase());
    if (soba) {
      Hotel.sobe = Hotel.sobe.filter((e) => e.brojSobe != soba.brojSobe);
      Hotel.rezervisaneSobe.push(soba);
      return soba;
    }

    return false;
  }

  static oslobodiSobu(soba) {
    let rezervisana = Hotel.rezervisaneSobe.find(
      (e) => e.brojSobe === soba.brojSobe
    );
    if (rezervisana) {
      Hotel.rezervisaneSobe = Hotel.rezervisaneSobe.filter(
        (e) => e.brojSobe != soba.brojSobe
      );
      Hotel.sobe.push(soba);
      Hotel.sobe.sort((a, b) => a.brojSobe - b.brojSobe);
      return true;
    }
    return false;
  }
}

class Sistem{
    static logedUsers = [];

    static dodajLogIn(korisnik){
        this.logedUsers.push(korisnik);
    }
}

//klasa sadrzi samo korisnike koji su prijavljeni u hotelu
class Prijave {
  static prijavljeniKorisnici = [];

  provjeriPrijavljeneKorisnike() {
    //vraca ispis svih prijavljenih korisnika
    for (const element of prijavljeniKorisnici) {
      console.log(element);
    }
  }

  //prima objekat rezervacija i upisuje ga u niz
  static upisiKorisnika(rezervacija) {
    this.prijavljeniKorisnici.push(rezervacija);
  }

  static odjaviKorisnika(rezervacija) {
    this.prijavljeniKorisnici = this.prijavljeniKorisnici.filter(
      (e) => e.brojRezervacije != rezervacija.brojRezervacije
    );
  }
}

//kada se korisnik prijavi u hotel, dobije sobu, pravi se instanca ove klase za lakse upravljanje i racunanje cijena usluga


class Rezervacija {
  static brojRezervacije = 1;
  brojRezervacije;
  brojLicneKarteKorisnika;
  brojSobe;
  tipSobe;
  #cijenaSobe;
  datumRezervacije;
  usluge = [];
  ukupnaCijena = 0;

  constructor(soba, brojLicneKarte) {
    this.brojLicneKarteKorisnika = brojLicneKarte;
    this.tipSobe = soba.tipSobe;
    this.brojSobe = soba.brojSobe;
    this.#cijenaSobe = soba.cijena;
    this.brojRezervacije = Rezervacija.brojRezervacije;
    this.datumRezervacije = this.generisiVrijeme();
    Rezervacija.brojRezervacije++;
  }
 
  static racunZaplatiti(brojLicneKarte) {
    // Dohvatiti rezervaciju na osnovu broja lične karte
    let rezervacija = Prijave.prijavljeniKorisnici.find(
      (e) => e.brojLicneKarteKorisnika === brojLicneKarte
    );


    // Ako rezervacija ne postoji, vratiti false
    if (!rezervacija) return false;

    // Vratiti ukupnu cijenu iz rezervacije
    return rezervacija.getUkupnaCijena();
  }

  static prikaziRezervaciju(brojLicneKarte) {
    //metoda vraca informacije o rezervaciji korisnika
    let rezervacija = Prijave.prijavljeniKorisnici.find(
      (e) => e.brojLicneKarteKorisnika === brojLicneKarte
    );

    if (!rezervacija) return false;

    rezervacija.getUkupnaCijena();

    return rezervacija;
  }

  getUkupnaCijena() {
    this.ukupnaCijena = 0;
    this.ukupnaCijena = this.#cijenaSobe * this.izracunajVrijemeBoravka();
    this.usluge.forEach((e) => (this.ukupnaCijena += e.cijena));
    return this.ukupnaCijena;
  }

  generisiVrijeme() {
    let dan = new Date();
    return (
      dan.getDate() + "." + Number(dan.getMonth() + 1) + "." + dan.getFullYear()
    );
  }

  izracunajVrijemeBoravka() {
    let trenutno = this.generisiVrijeme();
    trenutno = trenutno.split(".").reverse().join(".");

    let ukupnoVrijemeBoravka = 1;

    let pom = this.datumRezervacije;
    pom = pom.split(".").reverse().join(".");

    let pocetak = new Date(pom);
    let kraj = new Date(trenutno);

    if (kraj - pocetak > 0)
      ukupnoVrijemeBoravka = (kraj - pocetak) / (1000 * 60 * 60 * 24);

    return ukupnoVrijemeBoravka;
  }
 }

class Korisnik {
  ime;
  prezime;
  spol;
  #brojLicneKarte;
  godine;
  platioRacun;

  constructor(ime, prezime, spol, brojLicneKarte, godine) {
    this.ime = ime;
    this.prezime = prezime;
    this.spol = spol;
    this.#brojLicneKarte = brojLicneKarte;
    this.godine = godine;
    this.platioRacun = false;
  }

  set setBrojLicneKarte(brojLicneKarte) {
    this.#brojLicneKarte = brojLicneKarte;
  }

  get getBrojLicneKarte() {
    return this.#brojLicneKarte;
  }

  provjeriRacun() {
    //provjerava ukupan racun za dosadasnje usluge koje je korisnik imao
    ispisLinija();
    const rez = Rezervacija.prikaziRezervaciju(this.getBrojLicneKarte); //u varijabli rez je instanca rezervacije, mogu se prikazivati svi detalji, cijena, usluge itd
    if (!rez) {
      console.log(`Rezervacija ne postoji u sistemu!`);
      return;
    }
    console.log(`Datum prijave: ${rez.datumRezervacije}`);
    console.log(
      `Tip sobe: ${rez.tipSobe.charAt(0).toUpperCase()}${rez.tipSobe.slice(1)}`
    );
    if (rez.usluge.length > 0) {
      console.log(`Koristene usluge: `);
      rez.usluge.forEach((e) => console.log(`\t\t ${e.usluga}`));
    }
    console.log(`Ukupno: ${rez.ukupnaCijena} KM`);
  }

  rezervisiUslugu(izbor) {
    ispisLinija();
    console.log("Dostupne usluge:");
    Hotel.uslugeHotela.forEach((usluga, index) => {
        console.log(`${index + 1}. ${usluga.usluga} - ${usluga.cijena} KM`);
    });

    izbor = parseInt(izbor);

    if (izbor > 0 && izbor <= Hotel.uslugeHotela.length) {
        const odabranaUsluga = Hotel.uslugeHotela[izbor - 1];
        
        const rezervacija = Prijave.prijavljeniKorisnici.find((rez) => rez.brojLicneKarteKorisnika === this.getBrojLicneKarte);

        if (!rezervacija) {
            console.log("Korisnik nema aktivnu rezervaciju!");
            return;
        }

        rezervacija.usluge.push(odabranaUsluga);
        console.log(
            `Usluga "${odabranaUsluga.usluga}" uspješno dodana na račun korisnika.`
        );
    } else {
        console.log("Pogrešan unos. Pokušajte ponovo.");
    }
}

  zatraziPromjenuSobe(nekaNovaSoba) {
    //provjerava rezervaciju
    ispisLinija();
    const trenutnaRezervacija = Prijave.prijavljeniKorisnici.find((rez) => rez.brojLicneKarteKorisnika === this.getBrojLicneKarte);

    if (!trenutnaRezervacija) {
      console.log("Korisnik nema aktivnu rezervaciju!");
      return;
    }
     
    if (Hotel.oslobodiSobu(trenutnaRezervacija)) {
      console.log("Trenutna soba je uspješno oslobođena.");

      const novaSoba = Hotel.rezervisiSobu(nekaNovaSoba.toLowerCase());

      if (novaSoba) {
        trenutnaRezervacija.brojSobe = novaSoba.brojSobe;
        trenutnaRezervacija.tipSobe = novaSoba.tipSobe;
        trenutnaRezervacija.datumRezervacije =
          trenutnaRezervacija.generisiVrijemeVol2();

        console.log(
          `Korisnik je uspješno premješten u sobu broj ${novaSoba.brojSobe} (${novaSoba.tipSobe}).`
        );
      } else {
        console.log("Nema slobodnih soba tog tipa.");
      }
    } else {
      console.log("Greška prilikom oslobađanja trenutne sobe.");
    }
  }

  odjaviSeIzHotela() {
    //provjerava da li je korisnik platio račun
    ispisLinija();
   const rezervacija = Prijave.prijavljeniKorisnici.find((rez) => rez.brojLicneKarteKorisnika === this.getBrojLicneKarte);

   if (!rezervacija) {
     console.log("Korisnik nema aktivnu rezervaciju!");
     return;
   }

   const ukupnaCijena = rezervacija.getUkupnaCijena();
   console.log(
     `Ukupan račun za korisnika ${this.ime} iznosi ${ukupnaCijena} KM.`
   );

   //Provjera plaćanja računa
   if (this.platiRacun()) {
     Hotel.oslobodiSobu(rezervacija);
     Prijave.odjaviKorisnika(rezervacija);
     console.log(`${this.ime} je uspješno odjavljen iz hotela.`);
   } else {
     console.log(`${this.ime} mora platiti račun prije odjave iz hotela.`);
   }
  }

  platiRacun() {
    //prije nego sto korisnik bude odjavljen iz hotela, obavezno mora platiti racun za koristene usluge¸
    ispisLinija();
     const rezervacija = Prijave.prijavljeniKorisnici.find((rez) => rez.brojLicneKarteKorisnika === this.getBrojLicneKarte);

     if (!rezervacija) {
       console.log("Korisnik nema aktivnu rezervaciju!");
       return false;
     }

      const ukupnaCijena = rezervacija.getUkupnaCijena();
      console.log(`Račun iznosi ${ukupnaCijena} KM. `);
      this.platioRacun = true;
      console.log("Račun je uspješno plaćen!");
      return true
  }
}

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

  //POTREBNO DODATI DA NE MOZE ISTI KORISNIK IMATI VISE SOBA, ako korisnik zatrazi sobu koja trenutno nije slobodna ne smije ga upisati
  prijaviKorisnika(korisnik, tipSobe){
      ispisLinija();
      if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
      //prima objekat korisnik i string tip sobe koju korisnik zeli da rezervise za sebe, koristi funkcije generisiUsername i generisiPassword
      //dodaje korisnika u niz prijavljeniKorisnici iz klase hotel
      if(typeof korisnik != "object") return;
      let soba = Hotel.rezervisiSobu(tipSobe);
      if(!soba) { console.log('Nema slobodnih soba sa tim specifikacijama'); return; }

      korisnik.username = this.#generisiUsernameKorisniku(korisnik.ime, korisnik.prezime, korisnik.godine);
      korisnik.password = this.#generisiPasswordKorisniku(korisnik.ime, korisnik.prezime, korisnik.godine);
      Prijave.upisiKorisnika(new Rezervacija(soba, korisnik));
      console.log(`Kreirana je nova rezervacija na ime ${korisnik.ime} ${korisnik.prezime}.\nBroj sobe: ${soba.brojSobe}\nTip sobe: ${soba.tipSobe.charAt(0).toUpperCase()}${soba.tipSobe.slice(1)}`);

  }

  #generisiUsernameKorisniku(ime, prezime, godine){
      return ime.toLowerCase() + '_' + prezime.toLowerCase() + godine //+ (Math.random() * 10).toFixed(0);
  }

  #generisiPasswordKorisniku(ime, prezime, godine){
      return prezime.toLowerCase() + ime.toLowerCase() + godine;
  }

  promijeniInformacijeKorisniku(korisnik, tipSobe){
      if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
      let rezervacija = Prijave.prijavljeniKorisnici.find(e => e.getBrojLicneKarte === korisnik.getBrojLicneKarte || e.brojLicneKarteKorisnika.username === korisnik.brojLicneKarteKorisnika.username);
     if(!(tipSobe.toLowerCase() == 'jednokrevetna' || tipSobe.toLowerCase() === 'dvokrevetna' || tipSobe.toLowerCase() == 'apartman')) {
      return false;
     }
     let novaSoba =Hotel.rezervisiSobu(tipSobe)
     if (novaSoba) {
      rezervacija.tipSobe = novaSoba.tipSobe;
      rezervacija.brojSobe = novaSoba.brojSobe;
      console.log('Soba je uspijesno promijenjena!');     
     }
     else {
      console.log('Soba nije promijenjena!');
      
     }

  }

  izdajRacunKorisniku(korisnik){
      ispisLinija();
      if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }

      //izracuna koliko usluga i sta je imao korisnik te izda ukupni racun, prima objekat korisnika i na osnovu toga racuna ukupno
      let racun = Rezervacija.prikaziRezervaciju(korisnik.getBrojLicneKarte); // racun je objekat u ovom slucaju jer funkcija vraca objekat
      if(!racun) {console.log(`Rezervacija ne postoji u sistemu`); return;}

      console.log(`Tip sobe: ${racun.tipSobe.charAt(0).toUpperCase()}${racun.tipSobe.slice(1)}`);
      if(racun.usluge.length > 0){
          console.log("Usluge: ");
          racun.usluge.forEach((e) => console.log(`\t${e.usluga}`)); //usluge su niz objekata
      }
      console.log(`Ukupno: ${racun.ukupnaCijena} KM`); //u objektu rezervacija vec postoji izracunata cijena svega sto je korisnik koristio

  }

  odjaviSveKorisnikeIzSistema(){
      if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
      Sistem.logedUsers = [];
  }

  odjaviKorisnika(korisnik){
      if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
      let user = Prijave.prijavljeniKorisnici.find(e => e.getBrojLicneKarte === korisnik.getBrojLicneKarte || e.brojLicneKarteKorisnika.username === korisnik.brojLicneKarteKorisnika.username); //kod bi radio u slucaju da brojLicneKarte nije objekat

      if(user) {
          Prijave.odjaviKorisnika(user);
      }
      else console.log('Koriniski nije u hotelu!')
  }

  ugasiSistem(){
      if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return; }
      Prijave.prijavljeniKorisnici.forEach(e => this.odjaviKorisnika(e));
      
  }

  pretraziPrijavljeneKorisnike(brojLicneKarte, username){
      if(!this.isLoggedIn){console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);return;};
      let korisnik = Prijave.prijavljeniKorisnici.find(e => e.getBrojLicneKarte === brojLicneKarte || e.brojLicneKarteKorisnika.username === username)
      if(korisnik) {
      console.log(korisnik); 
      } else {
        console.log('Korisnik nije u hotelu')
      }
  }

  odobriOdjavuKorisnika(brojLicneKarte, username){
 
      if(!this.isLoggedIn){ console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`); return;}
      let korisnik = Prijave.prijavljeniKorisnici.find(e => e.getBrojLicneKarte === brojLicneKarte || e.brojLicneKarteKorisnika.username === username);


      if(korisnik.platiRacun()) {
      Prijave.prijavljeniKorisnici.filter(e => e != korisnik);
      } else {
        console.log('Korisnik nije platio racun')
      }

      //nakon sto korisnik posalje zahtjev za odjavu, admin treba da izda racun i nakon sto korisnik plati racun onda da odobri odjavu korisnika iz hotela
  }

};



//kreiranje objekta admin, i pozivanje metode za prijavu
//ako su uneseni pogresni podaci onda se prekida izvrsavanje cijele skripte

const admin = new Admin();
admin.prijavaAdmina("admin", "admin");

/* **************************************************************** */

const korisnik1 = new Korisnik("Ane", "Kane", "M", "145262AK", 21);
const korisnik2 = new Korisnik("Munib", "Osmic", "M", "1525235A", 22);
const korisnik3 = new Korisnik("Ajla", "Hadzic", "F", "15fs21435", 27);

admin.prijaviKorisnika(korisnik1, "jednokrevetna");
admin.prijaviKorisnika(korisnik2, "apartman");

admin.prijaviKorisnika(korisnik3, "jednokrevetna");

// console.log(Prijave.prijavljeniKorisnici);

// korisnik1.provjeriRacun();
admin.izdajRacunKorisniku(korisnik2);

console.log('pretraga')
console.log(admin.pretraziPrijavljeneKorisnike("1525235A" , 'munib_osmic22'))

console.log('prijave')
console.log(Prijave.prijavljeniKorisnici);

//
korisnik1.zatraziPromjenuSobe("apartman");
korisnik1.rezervisiUslugu("kino")
korisnik1.platiRacun();


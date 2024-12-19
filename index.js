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
    this.datumRezervacije = this.#generisiVrijeme();
    Rezervacija.brojRezervacije++;
  }
  generisiVrijemeVol2(){
    return this.#generisiVrijeme()
  }
  static racunZaplatiti(brojLicneKarte) {
    // Dohvatiti rezervaciju na osnovu broja lične karte
    let rezervacija = Prijave.prijavljeniKorisnici.find(
      (e) => e.brojLicneKarteKorisnika === brojLicneKarte
    );
 feature1

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

  #generisiVrijeme() {
    let dan = new Date();
    return (
      dan.getDate() + "." + Number(dan.getMonth() + 1) + "." + dan.getFullYear()
    );
  }

  izracunajVrijemeBoravka() {
    let trenutno = this.#generisiVrijeme();
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

  constructor(ime, prezime, spol, brojLicneKarte, godine) {
    this.ime = ime;
    this.prezime = prezime;
    this.spol = spol;
    this.#brojLicneKarte = brojLicneKarte;
    this.godine = godine;
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

  rezervisiUslugu() {
    //prrikaz dostupnih usluga
    console.log("Dostupne usluge:");
    Hotel.uslugeHotela.forEach((usluga, index) => {
      console.log(`${index + 1}. ${usluga.usluga} - ${usluga.cijena} KM`);
    });

    //unos korisnikovog izbora
    let izbor = prompt("Unesite broj usluge koju želite rezervisati: ");
    izbor = parseInt(izbor);

    if (izbor > 0 && izbor <= Hotel.uslugeHotela.length) {
      const odabranaUsluga = Hotel.uslugeHotela[izbor - 1];
      //find-a korisnikove rezervacije
      const rezervacija = Prijave.prijavljeniKorisnici.find(
        (rez) => rez.brojLicneKarteKorisnika === this.getBrojLicneKarte
      );

      if (!rezervacija) {
        console.log("Korisnik nema aktivnu rezervaciju!");
        return;
      }

      //dodavanje usluge u rezervaciju
      rezervacija.usluge.push(odabranaUsluga);
      console.log(
        `Usluga "${odabranaUsluga.usluga}" uspješno dodana na račun korisnika.`
      );
    } else {
      console.log("Pogrešan unos. Pokušajte ponovo.");
    }
  }

  zatraziPromjenuSobe() {
    //provjerava rezervaciju
    const trenutnaRezervacija = Prijave.prijavljeniKorisnici.find(
      (rez) => rez.brojLicneKarteKorisnika === this.getBrojLicneKarte
    );

    if (!trenutnaRezervacija) {
      console.log("Korisnik nema aktivnu rezervaciju!");
      return;
    }

    //oslobodjaje trenutnu sobu
    if (Hotel.oslobodiSobu(trenutnaRezervacija)) {
      console.log("Trenutna soba je uspješno oslobođena.");

      //zatrazi novu sobu
      let noviTipSobe = prompt(
        "Unesite tip sobe u koju želite da se preselite (jednokrevetna, dvokrevetna, apartman): "
      ).toLowerCase();
      let novaSoba = Hotel.rezervisiSobu(noviTipSobe);

      if (novaSoba) {
        //azuriraj rezervaciju sa novim podacima
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
    //pwrovjerava da li je korisnik platio račun
    const rezervacija = Prijave.prijavljeniKorisnici.find(
      (rez) => rez.brojLicneKarteKorisnika === this.getBrojLicneKarte
    );

    if (!rezervacija) {
      console.log("Korisnik nema aktivnu rezervaciju!");
      return;
    }

    const ukupnaCijena = rezervacija.getUkupnaCijena();

    console.log(
      `Ukupan račun za korisnika ${this.ime} iznosi ${ukupnaCijena} KM.`
    );

    const platioRacun = prompt(
      `Da li ste platili račun? (da/ne): `
    ).toLowerCase();

    if (platioRacun === "da") {
      Hotel.oslobodiSobu(rezervacija);
      Prijave.odjaviKorisnika(rezervacija);
      console.log(`${this.ime} je uspješno odjavljen iz hotela.`);
    } else {
      console.log(`${this.ime} mora platiti račun prije odjave iz hotela.`);
    }
  }

  platiRacun() {
    //prije nego sto korisnik bude odjavljen iz hotela, obavezno mora platiti racun za koristene usluge¸
    let cijenaZaNaplatiti = Rezervacija.racunZaplatiti(this.getBrojLicneKarte);
    if (cijenaZaNaplatiti) {
    }
    console.log(`Racun koji ${this.ime} treba platiti je ${cijenaZaNaplatiti}`);
  }
}

class Admin {
  username = "admin";
  password = "admin";
  isLoggedIn = false;

  //metoda simulira potrebu da se admin prijavi kako bi sistem funkcionisao
  prijavaAdmina(username, password) {
    if (username !== this.username && password !== this.password) {
      console.log(`Uneseni su pogresni podaci za prijavu!`);
      process.exit();
    }

    if (Hotel.sobe.length === 0) Hotel.generisiSobe();

    this.isLoggedIn = true;

    ispisLinija();
    console.log(`\t\tUspjesno ste prijavljeni u sistem kao ADMIN`);
  }

  odjavaAdmina() {
    this.isLoggedIn = false;
    console.log("Dovidjenja!");
  }

  //POTREBNO DODATI DA NE MOZE ISTI KORISNIK IMATI VISE SOBA, ako korisnik zatrazi sobu koja trenutno nije slobodna ne smije ga upisati
  prijaviKorisnika(korisnik, tipSobe) {
    ispisLinija();
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;
    }
    //prima objekat korisnik i string tip sobe koju korisnik zeli da rezervise za sebe, koristi funkcije generisiUsername i generisiPassword
    //dodaje korisnika u niz prijavljeniKorisnici iz klase hotel
    if (typeof korisnik != "object") return;
    let soba = Hotel.rezervisiSobu(tipSobe);
    if (!soba) {
      console.log("Nema slobodnih soba sa tim specifikacijama");
      return;
    }

    Prijave.upisiKorisnika(new Rezervacija(soba, korisnik.getBrojLicneKarte));
    console.log(
      `Kreirana je nova rezervacija na ime ${korisnik.ime} ${
        korisnik.prezime
      }.\nBroj sobe: ${soba.brojSobe}\nTip sobe: ${soba.tipSobe
        .charAt(0)
        .toUpperCase()}${soba.tipSobe.slice(1)}`
    );
  }

  #generisiUsernameKorisniku(ime, prezime, godine) {
    return (
      ime.toLowerCase() +
      "_" +
      prezime.toLowerCase() +
      godine +
      (Math.random() * 10).toFixed(0)
    );
  }

  #generisiPasswordKorisniku(ime, prezime, godine) {
    return prezime.toLowerCase() + ime.toLowerCase() + godine;
  }

  promijeniInformacijeKorisniku() {
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;
    }
    //mijenja informacije o korisniku (Promjena sobe i tipa sobe, dodatne usluge koje korisnik koristi)
  }

  izdajRacunKorisniku(korisnik) {
    ispisLinija();
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;
    }

    //izracuna koliko usluga i sta je imao korisnik te izda ukupni racun, prima objekat korisnika i na osnovu toga racuna ukupno
    let racun = Rezervacija.prikaziRezervaciju(korisnik.getBrojLicneKarte); // racun je objekat u ovom slucaju jer funkcija vraca objekat
    if (!racun) {
      console.log(`Rezervacija ne postoji u sistemu`);
      return;
    }

    console.log(
      `Tip sobe: ${racun.tipSobe.charAt(0).toUpperCase()}${racun.tipSobe.slice(
        1
      )}`
    );
    if (racun.usluge.length > 0) {
      console.log("Usluge: ");
      racun.usluge.forEach((e) => console.log(`\t${e.usluga}`)); //usluge su niz objekata
    }
    console.log(`Ukupno: ${racun.ukupnaCijena} KM`); //u objektu rezervacija vec postoji izracunata cijena svega sto je korisnik koristio
  }

  odjaviSveKorisnike() {
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;
    }
    //nije mi jasno sta metoda treba da radi//************************************ */
  }

  odjaviKorisnika(korisnik) {
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;
    }
    //odjavljuje korisnika iz hotela, obavezno pozvati static metodu iz klase prijave kako bi se izbrisao korisnik i baze prijavljenih
  }

  ugasiSistem() {
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;
    }
    //gasi cijeli sistem a prethodno poziva metode za odjavljivanje svih korisnika, ispisuje poruku dovidjenja i gasi sistem
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
        console.log(`Kreirana je nova rezervacija na ime ${korisnik.ime} ${korisnik.prezime}.\nBroj sobe: ${soba.brojSobe}\nTip sobe: ${soba.tipSobe.charAt(0).toUpperCase()}${soba.tipSobe.slice(1)}`);}

  pretraziPrijavljeneKorisnike(ime, brojLicneKarte, username) {
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;

    }
  }

  odobriOdjavuKorisnika() {
    if (!this.isLoggedIn) {
      console.log(`Nije moguce izvrsiti radnju prije nego se admin prijavi!`);
      return;
    }
    //nakon sto korisnik posalje zahtjev za odjavu, admin treba da izda racun i nakon sto korisnik plati racun onda da odobri odjavu korisnika iz hotela
  }
}

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

console.log(Prijave.prijavljeniKorisnici);

//
korisnik1.platiRacun();

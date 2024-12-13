class Hotel{
    adresa;
    maxBrojSoba = 50;
    sobe = [];
    rezervisaneSobe = [];
    tipSobe = ['jednokrevetna', 'dvokrevetna', 'apartman'];
    uslugeHotela = [
        {usluga: 'Kino', cijena: 10},
        {usluga: 'Teretena', cijena: 10},
        {usluga: 'Sauna', cijena: 10},
        {usluga: 'Restoran', cijnea: 10},
        {usluga: 'Bazen', cijena: 10}
    ];
    prijavljeniKorisnici = [];

    constructor(adresa) {
        this.adresa = adresa;
        this.generisiSobe();
    }

    generisiSobe(){
        for(let i = 1; i <= this.maxBrojSoba; i++){
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

    }

    rezervisiUslugu(){

    }

    zatraziPromjenuSobe(){

    }

    odjaviSeIzHotela(){

    }

    platiRacun(){

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

    prijaviKorisnika(){

    }

    #generisiUsernameKorisniku(){

    }

    #generisiPasswordKorisniku(){

    }

    promijeniInformacijeKorisniku(){

    }

    provjeriPrijavljeneKorisnike(){

    }

    izdajRacunKorisniku(){

    }

    odjaviSveKorisnike(){

    }

    odjaviKorisnika(){

    }

    ugasiSistem(){

    }

    pretraziPrijavljeneKorisnike(ime, brojLicneKarte, username){

    }

    odobriOdjavuKorisnika(){

    }

};

//kreiranje objekta admin, i pozivanje metode za prijavu
//ako su uneseni pogresni podaci onda se prekida izvrsavanje cijele skripte

const admin = new Admin();
admin.prijavaAdmina('admin', 'admin');

/* **************************************************************** */
const hotel = new Hotel('nekaAdresa');

hotel.rezervisiSobu('Jednokrevetna');
hotel.rezervisiSobu('Dvokrevetna');

hotel.oslobodiSobu({brojSobe: 1, tipSobe: 'jednokrevetna'});

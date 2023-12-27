import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eleve } from '../../assignments/models/eleves.models';
import { Observable, forkJoin } from 'rxjs';
import { bdInitialEleves } from '../datas/data-eleves';

@Injectable({
  providedIn: 'root'
})
export class GestionElevesService {

  url = 'http://localhost:8010/api/db-angular-project/eleves';

  private HttpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) { }

  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.url);
  }

  addEleve(eleve: Eleve): Observable<any> {
    return this.http.post<Eleve>(this.url + '/add', eleve);
  }

  updateEleve(eleve: Eleve): Observable<any> {
    return this.http.put<Eleve>(this.url + '/update', eleve, this.HttpOptions);
  }

  deleteEleve(eleve: Eleve): Observable<any> {
    return this.http.delete<Eleve>(this.url + '/delete/' + eleve._id);
  }

  getEleve(id: number): Observable<Eleve | undefined> {
    return this.http.get<Eleve>(this.url + '/' + id);
  }

  getElevesPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }

  getElevesByNom(nom: string): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.url + '/search/' + nom);
  }

  getElevesByPrenom(prenom: string): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.url + '/search/' + prenom);
  }

  getElevesByNomPrenom(nom: string, prenom: string): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.url + '/search/' + nom + '/' + prenom);
  }

  peuplerCollectionEleve() {
    let appelVersAddEleve: Observable<any>[] = [];

    bdInitialEleves.forEach(a => {
      const newEleve = new Eleve();
      newEleve.id = a.id;
      newEleve.prenom = a.prenom;
      newEleve.nom = a.nom;
      newEleve.email = a.email;
      newEleve.img = a.img!;
      appelVersAddEleve.push(this.addEleve(newEleve));
    });
    return forkJoin(appelVersAddEleve);
  }
}

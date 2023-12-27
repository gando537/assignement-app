import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Matiere } from '../../assignments/models/matieres.model';
import { bdInitialMatieres } from '../datas/data-matieres';

@Injectable({
  providedIn: 'root'
})
export class GestionMatieresService {

  url = 'http://localhost:8010/api/db-angular-project/matieres';

  private HttpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) { }

  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }

  addMatiere(Matiere: Matiere): Observable<any> {
    return this.http.post<Matiere>(this.url + '/add', Matiere);
  }

  updateMatiere(Matiere: Matiere): Observable<any> {
    return this.http.put<Matiere>(this.url + '/update', Matiere, this.HttpOptions);
  }

  deleteMatiere(Matiere: Matiere): Observable<any> {
    return this.http.delete<Matiere>(this.url + '/delete/' + Matiere._id);
  }

  getMatiere(id: number): Observable<Matiere | undefined> {
    return this.http.get<Matiere>(this.url + '/' + id);
  }

  getMatieresPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }

  getMatieresByNom(nom: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url + '/search/' + nom);
  }

  getMatieresByPrenom(prenom: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url + '/search/' + prenom);
  }

  getMatieresByNomPrenom(nom: string, prenom: string): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url + '/search/' + nom + '/' + prenom);
  }

  peuplerCollectionMatiere() {
    let appelVersAddMatiere: Observable<any>[] = [];

    bdInitialMatieres.forEach(a => {
      const newMatiere = new Matiere();
      newMatiere.id = a.id;
      newMatiere.nom_matiere = a.nom_matiere;
      newMatiere.image_matiere = a.image_matiere!;
      newMatiere.image_prof = a.image_prof!;
      appelVersAddMatiere.push(this.addMatiere(newMatiere));
    });
    return forkJoin(appelVersAddMatiere);
  }
}

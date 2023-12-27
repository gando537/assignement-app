interface Matiere {
  nom_matiere: string;
  image_matiere: string;
  image_prof: string;
}

export class Assignment {
    _id?:string
    id!:number
    nom!:string
    dateDeRendu!:Date
    rendu!:boolean
    auteur!:string
    note!:number | null
    remarques!:string
    matiere!: Matiere
  }
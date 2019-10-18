export class User2 {
  public dateCreated: string;
  public lastUpdate: string;
  constructor(
    public nom: string,
    public prenom: string,
    public email: string,
    public tel: string,
    public apropos: string,
    public adress: string,
    public ville: string,
    public pays: string,
    public dateNaissance: string,
    public sexe: string,
    public password: string
    ) {}
}

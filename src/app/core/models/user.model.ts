export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public category: string,
    public integrationDate: string,
    public id?: string
  ) {}
}

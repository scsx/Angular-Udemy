export class Recipe {
    public name: string; // public, use anywhere; type defined
    public description: string;
    public imagePath: string;
    // estes são os nomes a ser invocados mais tarde (1)

    // constructor para que se possa depois criar uma nova instancia com "new Recipe"
    constructor(name: string, desc: string, imagePath: string) { // (1) estes nomes só servem aqui dentro do constructor
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}
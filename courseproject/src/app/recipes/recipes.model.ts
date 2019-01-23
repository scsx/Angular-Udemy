export class Recipe {
    public name: string; // public, use anywhere; type defined
    public description: string;
    public imagePath: string;

    // constructor para que se possa depois criar uma nova instancia com "new Recipe"
    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}
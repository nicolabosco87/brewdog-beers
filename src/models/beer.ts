export class Beer {
    constructor(
        public id: string,
        public name: string,
        public tagline: string,
        public description: string,
        public image_url: string,
        public abv: number,
        public ibu: number,
        public ebc: number
    ) {}
}
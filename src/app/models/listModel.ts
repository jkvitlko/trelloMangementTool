export interface List {
    title: string;
    cards: Card[]
}

export interface Card {
    id: number,
    title: string,
    desc: string,
}
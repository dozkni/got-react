// import React, {Component} from "react";

export default class GotService {

    constructor() {
        this.__apiBase = "https://anapioficeandfire.com/api";
    }

    getResourse = async (url) => {
        const res = await fetch(this.__apiBase + url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (page, pageSize=10) => {
        const res = await this.getResourse(`/characters?page=${page}&pageSize=${pageSize}`);
        return res.map(this.__transformCharacter);
    }

    getCharacter = async (id) => {
        const char = await this.getResourse(`/characters/${id}`);
        return this.__transformCharacter(char);
    }    

    getAllBooks = async (page, pageSize=10) => {
        const res = await this.getResourse(`/books?page=${page}&pageSize=${pageSize}`);
        return res.map(this.__transformBook);
    }

    getBook = async (id) => {
        const book = await this.getResourse(`/books/${id}`);
        return this.__transformBook(book);
    }    

    getAllHouses = async (page, pageSize=10) => {
        const res = await this.getResourse(`/houses?page=${page}&pageSize=${pageSize}`);
        return res.map(this.__transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`);
        return this.__transformHouse(house);
    }

    __extractId = (item) => {
        return item.url.match(/\d+/)[0];
    };
    
    __transformCharacter = (char) => {
        return {
            id: this.__extractId(char),
            name: char.name || 'n / a',
            gender: char.gender || 'n / a',
            born: char.born || 'n / a',
            died: char.died || 'n / a',
            culture: char.culture || 'n / a'
        }
    }

    __transformHouse = (house) => {
        return {
            id: this.__extractId(house),
            name: house.name || 'n / a',
            region: house.region || 'n / a',
            words: house.words || 'n / a',
            titles: house.titles || 'n / a',
            overlord: house.overlord || 'n / a',
            ancestralWeapons: house.ancestralWeapons || 'n / a'
        }
    }

    __transformBook = (book) => {
        return {
            id: this.__extractId(book),
            name: book.name || 'n / a',
            numberOfPages: book.numberOfPages || 'n / a',
            publisher: book.publisher || 'n / a',
            released: book.released || 'n / a',
            culture: book.culture || 'n / a'
        }
    }

    

}

import {makeAutoObservable} from "mobx";


export default class BlockStore {
    constructor() {
        this._blocks = []
        this._selectedBlocks = []
        this._news = []
        this._lines = []
        this._allFiles = []

        makeAutoObservable(this)
    }


    setBlocks(blocks) {
        this._blocks = blocks
    }

    setSelectedBlocks(selectedBlocks) {
        this._selectedBlocks = selectedBlocks
    }

    setNews(news) {
        this._news = news
    }

    setLines(lines) {
        this._lines = lines
    }

    setAllFiles(allFiles) {
        this._allFiles = allFiles
    }


    get blocks() {
        return this._blocks
    }

    get selectedBlocks() {
        return this._selectedBlocks
    }

    get news() {
        return this._news
    }

    get lines() {
        return this._lines
    }

    get allFiles() {
        return this._allFiles
    }
}
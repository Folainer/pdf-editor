export default class JsonManager {
    private jsonData: Record<string, any>

    constructor(initialData : Record<string, any>) {
        this.jsonData = initialData
    }

    getJson() {
        return this.jsonData
    }

    replaceJson(newJson : Record<string, any>) {
        this.jsonData = newJson
    }

    
}
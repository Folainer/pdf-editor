export interface JsonType {
    type?: 'saved' | 'unsaved'
    name: string,
    json: Record<string, any>
}

export interface JsonManagerType {
    replaceJson: (jsontype: JsonType) => void,
    replaceByName: (name: string, jsontype : JsonType) => void,
    getUnsaved: () => JsonType | null,
    getByName: (name: string) => JsonType | null,
    getAll: () => JsonType[]
}

export default class JsonManager implements JsonManagerType {
    private jsonData: JsonType[]

    constructor() {
        this.jsonData = []
        this.load()
    }

    //needed to be updated
    load() {
        console.log('Loading server\'s json files')
        this.jsonData.push({
            name: 'test',
            type: 'saved',
            json: {name: 'hello'}
        })
    }

    //neded to be updated
    save() {
        console.log('Saving server\s json files')
    }

    isNameUsed(name: string) {
        for (let json of this.jsonData) {
            if (json.name === name) {
                return true
            }
        }
        return false
    }

    replaceJson(jsontype: JsonType) {
        jsontype.type = 'unsaved'
        let isUnsaved = false

        for (let json of this.jsonData) {
            if (json.type === 'unsaved') {
                isUnsaved = true
                if (this.isNameUsed(json.name)){
                    json = jsontype
                } else if (json.name === jsontype.name) {
                    json = jsontype
                }
                break
            }
        }
        if (!isUnsaved && !this.isNameUsed(jsontype.name)) {
            this.jsonData.push(jsontype)
        } 
    }

    replaceByName(name: string, jsontype : JsonType) {
        let isFound = false

        for (let json of this.jsonData) {
            if (name === json.name) {
                isFound = true
                json = jsontype
                break
            }
        }

        if (!isFound) {
            this.jsonData.push(jsontype)
        }
    }

    getUnsaved() {
        for (let json of this.jsonData) {
            if (json.type === 'unsaved') {
                return json
            }
        }
        return null
    }

    getByName(name: string) {
        for (let json of this.jsonData) {
            if (json.name === name) {
                return json
            }
        }
        return null
    }

    getAll() {
        return this.jsonData
    }
}
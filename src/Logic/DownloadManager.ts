export default class DownloadManager {
    static exportObject(object: any, fileName: string) {
        let link = document.createElement('a')
        let blob = new Blob([object])
        link.href = URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        URL.revokeObjectURL(link.href)
    }
}
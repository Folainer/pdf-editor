import { EventEmitter } from 'fbemitter'

export type EventTypes = "updateData" | "otherEvent"

const eventBus = new EventEmitter()

export default eventBus
export class GridEventManager {

    constructor(grid) {
        this.grid = grid;
        this.handlers = new Map();
    }

    addEventListener(eventName, handler) {
        if (!this.handlers.get(eventName)) {
            this.handlers.set(eventName, new Array());
        }
        this.handlers.get(eventName).push(handler);
    }

    fireEventListener(event) {
        const { name } = event;
        if (this.handlers.has(name)) {
            event.grid = this.grid;
            this.handlers.get(name).forEach(each => {
                if (typeof each === 'function') {
                    each(event);
                }
            });
        }
    }

}
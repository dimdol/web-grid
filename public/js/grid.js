import { GridDataBinder } from '/js/grid_data_binder.js';
import { GridEventManager } from '/js/grid_event_manager.js';
import { Row } from "/js/row.js";
import { VerticalScrollbar } from "/js/vertical_scrollbar.js";

class Grid {
    constructor(panel, option) {
        this.panel = panel;
        this.option = option;
        this.eventManager = new GridEventManager(this);
        this.dataBinder = new GridDataBinder(this);

        panel.dataset.grid = 'true';
        const header = document.createElement('div');
        header.className = 'grid_header';
        let headerHtml = '';
        option.columns.forEach(each => {
            headerHtml += `<span>${each.name}</span>`;
        });
        header.innerHTML = headerHtml;
        panel.appendChild(header);

        const columnCount = option.columns.length;
        const bodyHeight = panel.offsetHeight - header.offsetHeight;
        const rowCount = Math.ceil(2 * (bodyHeight / 24));

        const body = document.createElement('div');
        body.style.height = `${bodyHeight}px`;
        body.className = 'grid_body';

        this.rows = new Array();
        let i = 0;
        while (i++ < rowCount) {
            const row = new Row(body, columnCount, this);
            this.rows.push(row);
        }
        panel.appendChild(body);

        new VerticalScrollbar(this);
        if (option.data) {
            this.dataBinder.bind(option.data);
            this.eventManager.fireEventListener({
                name: 'data-loaded',
                data: option.data,
            });
        }

        let y = 0;
        body.addEventListener('wheel', event => {
            y += event.deltaY;
            const count = option.data.length;
            let offset = Math.max(0, Math.floor(y / 24));
            for (let i = 0; i < count; i++) {
                if (i > this.rows.length - 1) {
                    break;
                }
                this.rows.at(i).load(option.data.at(i + offset));
            }
        });
    }

    addComponent(component) {
        this.panel.appendChild(component);
    }

    getColumn(i) {
        return this.option.columns.at(i);
    }

    getHeaderHeight() {
        return this.panel.querySelector('.grid_header').offsetHeight;
    }

    getBodyHeight() {
        return this.panel.querySelector('.grid_body').offsetHeight;
    }

    addEventListener(eventName, handler) {
        this.eventManager.addEventListener(eventName, handler);
    }

    fireEventListener(event) {
        this.eventManager.fireEventListener(event);
    }

}

export { Grid };
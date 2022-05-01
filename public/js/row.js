export class Row {

    constructor(panel, columnSize, grid) {
        this.grid = grid;
        this.columns = new Array();
        let i = 0;
        while (i++ < columnSize) {
            const column = document.createElement('span');
            panel.appendChild(column);
            this.columns.push(column);
        }
    }

    load(data) {
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.grid.getColumn(i);
            const cell = this.columns.at(i);
            cell.innerHTML = data[column.id];
        }
    }

}
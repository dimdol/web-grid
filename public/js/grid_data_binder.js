export class GridDataBinder {

    constructor(grid) {
        this.grid = grid;
        this.grid.addEventListener('data-scrolled', this.scrolled.bind(this));
    }

    bind(data) {
        this.data = data;
        const rows = this.grid.rows;
        const count = data.length;
        for (let i = 0; i < count; i++) {
            if (i > rows.length - 1) {
                break;
            }
            rows.at(i).load(data.at(i));
        }
    }

    scrolled(event) {
        const rows = this.grid.rows;
        const count = this.data.length;
        let offset = count * event.rate;
        if (count - offset < rows.length) {
            let j = count - 1;
            for (let i = rows.length; i > 0; i--) {
                rows.at(i - 1).load(this.data.at(j--));
            }
        } else {
            for (let i = 0; i < count; i++) {
                if (i > rows.length - 1) {
                    break;
                }
                rows.at(i).load(this.data.at(i + offset));
            }
        }
    }

}
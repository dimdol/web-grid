export class VerticalScrollbar {

    constructor(grid) {
        this.grid = grid;
        grid.addEventListener('data-loaded', this.dataLoaded.bind(this));
        const scrollbar = document.createElement('div');
        scrollbar.dataset.gridComponent = 'vertical_scrollbar';
        scrollbar.style.top = `${grid.getHeaderHeight()}px`;
        this.thumb = document.createElement('div');
        scrollbar.appendChild(this.thumb);
        grid.addComponent(scrollbar);

        this.thumb.addEventListener('mousedown', event => {
            event.preventDefault();
            const bodyHeight = grid.getBodyHeight();
            const min = 0;
            const max = bodyHeight - this.thumb.offsetHeight;
            let { y } = event;
            const body = window;
            const move = event => {
                const { y: yy } = event;
                const dy = y - yy;
                y = yy;
                const top = Math.max(min, Math.min(max, this.thumb.offsetTop - dy));
                this.thumb.style.top = `${top}px`;
                this.grid.fireEventListener({
                    name: 'data-scrolled',
                    rate: top / bodyHeight, 
                });
            };
            const up = () => {
                body.removeEventListener('mousemove', move);
                body.removeEventListener('mouseup', up);
            };
            body.addEventListener('mousemove', move);
            body.addEventListener('mouseup', up);
        });
    }

    dataLoaded({ grid, data }) {
        const bodyHeight = grid.getBodyHeight();
        const requiredHeight = data.length * 24;
        if (bodyHeight > requiredHeight) {
            this.thumb.style.display = 'none';
        } else {
            this.thumb.style.display = 'block';
            this.thumb.style.height = Math.max(12, bodyHeight * bodyHeight / requiredHeight);
        }
    }

}
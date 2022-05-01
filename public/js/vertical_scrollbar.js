export class VerticalScrollbar {

    constructor(grid) {
        const scrollbar = document.createElement('div');
        scrollbar.dataset.gridComponent = 'vertical_scrollbar';
        scrollbar.style.top = `${grid.getHeaderHeight()}px`;
        const thumb = document.createElement('div');
        scrollbar.appendChild(thumb);
        grid.addComponent(scrollbar);

        thumb.addEventListener('mousedown', event => {
            event.preventDefault();
            const min = 0;
            const max = grid.getBodyHeight() - thumb.offsetHeight;
            let { y } = event;
            const body = document.body;
            const move = event => {
                const { y: yy } = event;
                const dy = y - yy;
                y = yy;
                const top = Math.max(min, Math.min(max, thumb.offsetTop - dy));
                thumb.style.top = `${top}px`;
            };
            const up = () => {
                body.removeEventListener('mousemove', move);
                body.removeEventListener('mouseup', up);
            };
            body.addEventListener('mousemove', move);
            body.addEventListener('mouseup', up);
        });
    }

}
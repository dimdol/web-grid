import { Grid } from "/js/grid.js";

const panel = document.getElementById('panel');
panel.style.height = '300px';

const option = {
    columns: [],
    data: [],
};
for (let i = 0; i < 8; i++) {
    option.columns.push({
        id: `id_${i}`,
        name: `Column ${i}`,
    });
}
for (let i = 0; i < 1000; i++) {
    option.data.push({
        id_0: `1 Data ${i}`,
        id_1: `2 Data ${i}`,
        id_2: `3 Data ${i}`,
        id_3: `4 Data ${i}`,
        id_4: `5 Data ${i}`,
        id_5: `6 Data ${i}`,
        id_6: `7 Data ${i}`,
        id_7: `8 Data ${i}`,
    });
}
new Grid(panel, option);
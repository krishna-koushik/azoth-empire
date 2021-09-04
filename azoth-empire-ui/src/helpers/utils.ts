// import * as cv from 'opencv4nodejs';

// export function sayHello() {
//     return Math.random() < 0.5 ? 'Hello' : 'Hola';
// }

export function warRoster(_imageFile, _resolution = [371, 672]) {
    // initialize image
    // const cvImage = cv.imread(imageFile);
    // //const image = cv.applyColorMap(cvImage, cv.COLOR_BGR2RGB);
    //
    // // breakup image
    // const anchor_coord = resolution; //[371, 672];
    //
    // const y_diff = 57;
    // const x_diff = 298;
    // const y_diff_groups_6to10 = 414;
    // const group_size = 5;
    //
    // const y_height = 45;
    // const x_width = 100;
    //
    // // create arrays for roster name locations
    // const range = (from, to, step) => [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);
    //
    // const y_range = range(anchor_coord[0], (group_size - 1) * y_diff, y_height);
    // const y_range_groups_6to10 = range(anchor_coord[0] + y_diff_groups_6to10, (group_size - 1) * y_diff, y_height);
    // const x_range = range(anchor_coord[1], (group_size - 1) * x_diff, x_width);
    //
    // // gray image is easier to read for tesseract
    // const grayImage = cv.applyColorMap(cvImage, cv.COLOR_BGR2GRAY);
    //
    // // OUTPUT IS the 50 small images
    const roster = new Array(50);
    //
    // let i = 0;
    //
    // for (let x of x_range) {
    //     for (let y of y_range) {
    //         let rect = new cv.Rect(x, y, 100, 45);
    //         roster[i++] = grayImage.getRegion(rect);
    //     }
    //
    //     for (let y of y_range_groups_6to10) {
    //         let rect = new cv.Rect(x, y, 100, 45);
    //         roster[i++] = grayImage.getRegion(rect);
    //     }
    // }

    return roster;
}

// export function warPerformance() {
//
// }

import MapClass from './data';
const simplifyLine = (line: Vector): Vector => {
    // check if any line between two points cross
    for (let i = 0; i < line.length - 1; i++) {
        for (let j = i + 2; j < line.length - 1; j++) {
            if (doIntersect(line[i], line[i + 1], line[j], line[j + 1])) {
                console.log(2 * (j - i), line.length)
                if (2 * (j - i) < line.length) {
                    line = [...line.slice(0, i + 1), ...line.slice(j + 1)]
                } else {
                    console.log('here')
                    line = [...line.slice(i + 1, j + 1)]
                }
            }
        }
    }
    line.push(line[0]);
    return line;
}



const doIntersect = (A: [number, number], B: [number, number], C: [number, number], D: [number, number]): boolean => {
    const p = [C[0] - A[0], C[1] - A[1]]
    const q = [B[0] - A[0], B[1] - A[1]]
    const r = [D[0] - C[0], D[1] - C[1]]

    if (q[0] * r[1] - q[1] * r[0] === 0 || q[0] === 0) return false;
    const t = (q[1] * p[0] - q[0] * p[1]) / (q[0] * r[1] - q[1] * r[0]);
    const u = (p[0] + t * r[0]) / q[0];

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

const numberOfIntersections = (A: [number, number], i: number, j: number): number => {
    const lands = MapClass.map.lands;
    const B = [0, 0] as [number, number];
    let count = 0;
    for (let k = 0; k < lands[i].vector.length - 1; k++) {
        if (lands[i].vector[k][0] !== A[0] || lands[i].vector[k][1] !== A[1] && doIntersect(A, B, lands[i].vector[k], lands[i].vector[k + 1])) {
            count++;
        }
    }

    for (let k = 0; k < lands[j].vector.length - 1; k++) {
        if (lands[j].vector[k][0] !== A[0] || lands[j].vector[k][1] !== A[1] && doIntersect(A, B, lands[j].vector[k], lands[j].vector[k + 1])) {
            count++;
        }
    }


    return count;

}


const simplifyMap = () => {
    const lands = MapClass.map.lands;
    for (let i = 0; i < lands.length; i++) {
        for (let j = i + 1; j < lands.length; j++) {
            for (let k = 0; k < lands[i].vector.length - 1; k++) {
                for (let l = 0; l < lands[j].vector.length - 1; l++) {
                    if (doIntersect(lands[i].vector[k], lands[i].vector[k + 1], lands[j].vector[l], lands[j].vector[l + 1])) {
                        const insideI = numberOfIntersections(lands[i].vector[k], i, j) % 2 === 1;
                        const insideJ = numberOfIntersections(lands[j].vector[l], i, j) % 2 === 1;
                        if (insideI && insideJ) {
                            console.log('both inside')
                        } else if (insideI) {
                            console.log('i inside')
                        }
                        else if (insideJ) {
                            console.log('j inside')
                        }
                        else {
                            console.log('both outside')
                        }

                    }
                }
            }
        }
    }
}



export { simplifyLine, simplifyMap }
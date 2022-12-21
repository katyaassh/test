export const Geodesia = (props) => {

    let T = 4.363323; //250
    let K = 0;
    let D = 0.05236; //3
    let L0 = 0.471239 //27

    let x1 = -15;
    let y1 = 3;
    let z1 = 6;

    let X = 4831112.7
    let Y = 278737.903
    let Z = 6332518.141


    const xi = [
        [x1],
        [y1],
        [z1]
    ]

    let array1 = [
        [Math.cos(T), -Math.cos(T), 0],
        [Math.sin(T), Math.cos(T), 0],
        [0, 0, -1]
    ];


    let array2 = [
        [1, 0, 0],
        [0, Math.cos(K), Math.sin(K)],
        [0, -Math.sin(K), Math.cos(K)]
    ];

    let array3 = [
        [Math.cos(D), 0, Math.sin(D)],
        [0, 1, 0],
        [-Math.sin(D), 0, -Math.cos(D)]
    ];


    const multiply = (a, b) => {
        var aNumRows = a.length,
            aNumCols = a[0].length,
            bNumRows = b.length,
            bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (var r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (var c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (var i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }


    const arr1 = multiply(array1, array2)

    const arr2 = multiply(arr1, array3)

    const deltaxyH = multiply(arr2, xi)

    const deltax = deltaxyH[0]
    const deltay = deltaxyH[1]
    const deltaH = deltaxyH[2]



    const S = Math.sqrt(X * X + Y * Y)

    const D2 = Math.sqrt(S * S + Y * Y)

    const q = Z / S * D2

    const y_ = Y * Math.cos(L0) - X * Math.sin(L0)

    const Fps = [
        [-q * (X + (Y * y_ / S)), -Y/S+q*q*X*y_, X/D2],
        [-q*(Y-(X*y_/S)), X/S + q*q * Y * y_, Y/D2],
        [S/D2, -Z*y_/D2*D2, Z/D]
    ]

    const deltaXYZ = multiply(Fps, deltaxyH)

    const deltaX = deltaXYZ[0]
    const deltaY = deltaXYZ[1]
    const deltaZ = deltaXYZ[2]



    const P1 = Math.sqrt(x1*x1+y1*y1+z1*z1)
    const P2 = Math.sqrt(deltax*deltax + deltay*deltay + deltaH*deltaH)
    const P3 = Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ)








    // console.log(P1, P2, P3)
    //
    // console.log('Fps=', Fps)


    // const q =
    //
    // const Fps = [
    //     []
    // ]


    return (
        <h1>Geodesia</h1>
    )
}

export const Geodesia = (props) => {

    let T = 4.363323; //250
    let K = 0;
    let D = 0.05236; //3
    let L0 = 0.471239 //27

    let x1 = -15;
    let y1 = 3;
    let z1 = 6;

    const xi = [
        [x1],
        [y1],
        [z1]
    ]

    let X = 4831112.7
    let Y = 278737.903
    let Z = 6332518.141

    const XYZ = [
        [X],
        [Y],
        [Z]
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
        let aNumRows = a.length,
            aNumCols = a[0].length,
            bNumCols = b[0].length,
            m = new Array(aNumRows);  // initialize array of rows
        for (let r = 0; r < aNumRows; ++r) {
            m[r] = new Array(bNumCols); // initialize the current row
            for (let c = 0; c < bNumCols; ++c) {
                m[r][c] = 0;             // initialize the current cell
                for (let i = 0; i < aNumCols; ++i) {
                    m[r][c] += a[r][i] * b[i][c];
                }
            }
        }
        return m;
    }


    const deltaxyH = multiply(multiply(multiply(array1, array2), array3), xi)

    const S = Math.sqrt(X * X + Y * Y)

    const D2 = Math.sqrt(S * S + Z * Z)

    const q = Z / (S * D2)

    const y_ = Y * Math.cos(L0) - X * Math.sin(L0)

    const Fps = [
        [-q * (X + (Y * y_ / S)), -Y/S+q*q*X*y_, X/D2],
        [-q*(Y-(X*y_/S)), X/S + q*q * Y * y_, Y/D2],
        [S/D2, -(Z*y_/(D2*D2)), Z/D2]
    ]

    const deltaXYZ = multiply(Fps, deltaxyH)

    const P = (array) => {
        let sum = 0
        array.forEach(el => {
            sum = sum += el**2;
        })
        return sum
    }

    const P1 = Math.sqrt(P(xi))
    const P2 = Math.sqrt(P(deltaxyH))
    const P3 = Math.sqrt(P(deltaXYZ))

    console.log(P1, P2, P3)

    const SumMatrix = (A,B) => {
        let m = A.length, n = A[0].length, C = [];
        for (let i = 0; i < m; i++)
        { C[ i ] = [];
            for (let j = 0; j < n; j++) C[ i ][j] = A[ i ][j]+B[ i ][j];
        }
        return C;
    }

    const deltaXYZg = SumMatrix(XYZ, deltaXYZ)

    console.log(deltaXYZg)

    return (
        <h1>Geodesia</h1>
    )
}

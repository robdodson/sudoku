import './App.css';

// prettier-ignore
const grid = {
  rows: 9,
  cols: 9,
  cells: [
    8, 6, 1, 7, 9, 4, 3, 5, 2,
    3, 5, 2, 1, 6, 8, 7, 4, 9,
    4, 9, 7, 2, 5, 3, 1, 8, 6,
    2, 1, 8, 9, 7, 5, 6, 3, 4,
    6, 7, 5, 3, 4, 1, 9, 2, 8,
    9, 3, 4, 6, 8, 2, 5, 1, 7,
    5, 2, 6, 8, 1, 9, 4, 7, 3,
    7, 4, 3, 5, 2, 6, 8, 9, 1,
    1, 8, 9, 4, 3, 7, 2, 6, 5,
  ]
};

function range(length) {
  return Array.from({ length }, (_, i) => i);
}

function getCell(grid, x, y) {
  return grid.cells[grid.cols * y + x];
}

function checkRows(grid) {
  let isValid = true;
  for (let y = 0; y < grid.rows; y++) {
    const numbers = new Set();
    for (let x = 0; x < grid.cols; x++) {
      const cell = getCell(grid, x, y);
      if (numbers.has(cell)) {
        isValid = false;
        break;
      }

      numbers.add(cell);
    }
  }
  return isValid;
}

function checkColumns(grid) {
  let isValid = true;
  for (let x = 0; x < grid.cols; x++) {
    const numbers = new Set();
    for (let y = 0; y < grid.rows; y++) {
      const cell = getCell(grid, x, y);
      if (numbers.has(cell)) {
        isValid = false;
        break;
      }

      numbers.add(cell);
    }
  }
  return isValid;
}

function checkGrids(grid) {
  let isValid = true;
  for (let y = 0; y < grid.rows; y += 3) {
    for (let x = 0; x < grid.cols; x += 3) {
      const numbers = new Set();
      for (let i = 0; i < 9; i++) {
        let newX = x + (i % 3);
        let newY = y + Math.floor(i / 3);
        const cell = getCell(grid, newX, newY);
        if (numbers.has(cell)) {
          isValid = false;
          break;
        }
        numbers.add(cell);
      }
    }
  }
  return isValid;
}

function App() {
  const isValid = checkGrids(grid) && checkRows(grid) && checkColumns(grid);
  return (
    <div className="App">
      <table>
        <tbody>
          {range(grid.rows).map((row) => (
            <tr key={`row${row}`}>
              {range(grid.cols).map((col) => (
                <td key={`row${row}col${col}`}>{getCell(grid, col, row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>isValid? {isValid.toString()}</div>
    </div>
  );
}

export default App;

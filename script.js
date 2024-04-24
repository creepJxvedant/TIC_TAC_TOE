   const cells = document.querySelectorAll("#cell");
    let statustext = document.querySelector("#playermove").textContent;
  //const resetbtn = document.getElementById("resetbtn");
    const winconditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let options = ["", "", "", "", "", "", "", "", ""];
    let gamerunning = false;
    let random = Math.floor(Math.random() * 2) + 1;
//    document.querySelector("#resetbtn").addEventListener("click", gamereset);
    let currentplayer;
    if (random == 1) {
      currentplayer = "X";
    } else {
      currentplayer = "O";
    }
    
    gamestart();
    function gamestart() {
      document.querySelector("#playermove").textContent = `${
        currentplayer + "'s Turn"
      }`;
      gamerunning = true;
      cells.forEach((cell) => cell.addEventListener("click", cellclicked));
      resetbtn.addEventListener("click", gamereset);
    }
    
    function cellclicked() {
      if (gamerunning) {
        let cellindex = this.getAttribute("index");
        if (options[cellindex] == "") {
          updatecell(cellindex, this);
        }
      }
    }
    
    function updatecell(cellindex, cell) {
      options[cellindex] = currentplayer;
      cell.textContent = currentplayer;
      checkwinner();
    }
    
    function changeplayer() {
      if (currentplayer == "X") {
        currentplayer = "O";
      } else {
        currentplayer = "X";
      }
      document.querySelector("#playermove").textContent = `${
        currentplayer + "'s Turn"
      }`;
    }
    
    function checkwinner() {
      for (let i = 0; i < 8; i++) {
        let j = 0;
        let grid = winconditions[i];
        const cella = options[grid[0]];
        const cellb = options[grid[1]];
        const cellc = options[grid[2]];
        if (cella != "" || cellb != "" || cellc != "") {
          if (cella === cellb && cellc === cellb) {
            gamerunning = false;
            document.querySelector("#playermove").textContent = `${
              currentplayer + " Won!"
            }`;
          }
        }
      }
      let Nemptyspaces = 0;
      for (let k = 0; k < options.length; k++) {
        if (options[k] != "") {
          Nemptyspaces++;
        }
      }
      if (Nemptyspaces == 9 && gamerunning) {
        document.querySelector("#playermove").textContent = `${"Draw!"}`;
        gamerunning = false;
      }
    
      if (gamerunning) {
        changeplayer();
      }
    }
    
    function gamereset() {
      gamerunning = false;
      cells.forEach((cell) => (cell.textContent = ""));
      for (let k = 0; k < options.length; k++) {
        options[k] = "";
      }
      gamestart();
    }

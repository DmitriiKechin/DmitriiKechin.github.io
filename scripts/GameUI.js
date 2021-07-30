export {
  createBoard,
  createBoardGrid,
  createBoardMatrix,
  createSignO,
  createSignX,
  animationBorder,
};

function createBoard(boardSizeRow, boardSizeCol) {
  const innerText = [];

  for (let i = 0; i < boardSizeRow; i++) {
    for (let j = 0; j < boardSizeCol; j++) {
      innerText.push(`
			<div
			class="board__cell"
			data-row="${i}"
			data-col="${j}"
			data-isEmpty="false"
			style="grid-row: ${i + 1}; grid-column: ${j + 1};"
		></div>`);
    }
  }

  return innerText.join('');
}

function createBoardGrid(boardSizeRow, boardSizeCol) {
  const innerText = [];

  for (
    let row = 0, col = 0, i = 0;
    i < Math.max(boardSizeRow, boardSizeCol) + 1;
    i++
  ) {
    console.log(row);
    console.log(col);
    innerText.push(`
			<div
          class="board__line-horizon"
          style="grid-row: ${row + 1}; 
					grid-column: 1/span ${boardSizeCol + 1};"
					${row === 0 || row === boardSizeRow ? `hidden` : ``}
        ></div>
        <div
          class="board__line-vertical"
          style="grid-row: 1/span ${boardSizeRow + 1}; grid-column: ${col + 1};"
					${col === 0 || col === boardSizeCol ? `hidden` : ``}
        ></div>`);

    if (row < boardSizeRow) {
      row++;
    }

    if (col < boardSizeCol) {
      col++;
    }
  }
  return innerText.join('');
}

function createBoardMatrix(boardSizeRow, boardSizeCol) {
  let matrixRow = [];
  const boardMatrix = [];
  for (let i = 0; i < boardSizeRow; i++) {
    for (let j = 0; j < boardSizeCol; j++) {
      matrixRow.push('');
    }
    boardMatrix.push(matrixRow);
    matrixRow = [];
  }

  return boardMatrix;
}

function createSignO(animationDuration) {
  const dur = animationDuration + 's';

  let shadow = `
  <animate attributeName="d" dur="${dur}" fill="freeze"   values=" M 50 17.5 
  A 32.5 32.5 0 0 1 50 17.5 
  A 32.5 32.5 0 0 1 50 17.5
  A 5 5 0 0 1 50 27.5 
  A 22.5 22.5 0 0 0 50 27.5
  A 22.5 22.5 0 0 0 50 27.5
  A 5 5 0 0 1 50 17.5
  Z;`;

  for (let i = 0; i <= 360; i += 1) {
    const radiusBig = 32.5;
    const radiusSmall = 22.5;
    const inRad = Math.PI / 180;

    let coordXBig = radiusBig * Math.sin(inRad * i) + 50;
    let coordYBig = -radiusBig * Math.cos(inRad * i) + 50;
    let coordXSmall = radiusSmall * Math.sin(inRad * i) + 50;
    let coordYSmall = -radiusSmall * Math.cos(inRad * i) + 50;

    if (i < 180) {
      shadow += `
    M 50 17.5
    A 32.5 32.5 0 0 1 ${coordXBig} ${coordYBig}
    A 32.5 32.5 0 0 1 ${coordXBig} ${coordYBig}
    A 5 5 0 0 1  ${coordXSmall} ${coordYSmall}
    A 22.5 22.5 0 0 0 ${coordXSmall} ${coordYSmall}
    A 22.5 22.5 0 0 0 50 27.5
    A 5 5 0 0 1 50 17.5
    Z;`;
    }

    if (i >= 180) {
      shadow += `
    M 50 17.5
    A 32.5 32.5 0 0 1 50 82.5
    A 32.5 32.5 0 0 1 ${coordXBig} ${coordYBig}
    A 5 5 0 0 1  ${coordXSmall} ${coordYSmall}
    A 22.5 22.5 0 0 0 50 72.5
    A 22.5 22.5 0 0 0 50 27.5
    A 5 5 0 0 1 50 17.5
    Z;`;
    }
  }

  shadow += '" />';

  let ligth = `
  <animate   attributeName="d" dur="${dur}" fill="freeze"   values=" M 50 20 
  A 30 30 0 0 1 50 20 
  A 30 30 0 0 1 50 20
  A 2.5 2.5 0 0 1 50 25 
  A 25 25 0 0 0 50 25 
  A 25 25 0 0 0 50 25 
  A 2.5 2.5 0 0 1 50 20
  Z;`;
  for (let i = 0; i <= 360; i += 1) {
    const radiusBig = 30;
    const radiusSmall = 25;
    const inRad = Math.PI / 180;

    let coordXBig = radiusBig * Math.sin(inRad * i) + 50;
    let coordYBig = -radiusBig * Math.cos(inRad * i) + 50;
    let coordXSmall = radiusSmall * Math.sin(inRad * i) + 50;
    let coordYSmall = -radiusSmall * Math.cos(inRad * i) + 50;

    if (i < 180) {
      ligth += `
    M 50 20
    A 30 30 0 0 1 ${coordXBig} ${coordYBig}
    A 30 30 0 0 1 ${coordXBig} ${coordYBig}
    A 2.5 2.5 0 0 1  ${coordXSmall} ${coordYSmall}
    A 25 25 0 0 0 ${coordXSmall} ${coordYSmall}
    A 25 25 0 0 0 50 25
    A 2.5 2.5 0 0 1 50 20
    Z;`;
    }

    if (i >= 180) {
      ligth += `
    M 50 20
    A 30 30 0 0 1 50 80
    A 30 30 0 0 1 ${coordXBig} ${coordYBig}
    A 2.5 2.5 0 0 1  ${coordXSmall} ${coordYSmall}
    A 25 25 0 0 0 50 75
    A 25 25 0 0 0 50 25
    A 2.5 2.5 0 0 1 50 20
    Z;`;
    }
  }

  ligth += '" />';

  return `
	<svg class="circle" viewBox="0 0 100 100">
	xmlns="http://www.w3.org/2000/svg">
	<filter id="Gauss">
  <feGaussianBlur stdDeviation="5"></feGaussianBlur>
  </filter>
  <path d=""  fill="#09de09" filter="url(#Gauss)">${shadow}</path>
  <path d=""  fill="white">${ligth}</path>
</svg>`;
}

function createSignX(animationDuration) {
  const dur = animationDuration / 2 + 's';
  return `
	<svg  class="cross" viewBox="0 0 100 100">
	xmlns="http://www.w3.org/2000/svg">
    <filter id="Gauss">
  <feGaussianBlur stdDeviation="5"></feGaussianBlur>
  </filter>
       <path d=""  fill="red" filter="url(#Gauss)">
         <animate   attributeName="d" dur="${dur}" fill="freeze"   values="M 17.5 72.5
            L 17.5 72.5
            A 5 5 0 0 1 27.5 82.5
            L 27.5 82.5
            A 5 5 0 0 1 17.5 72.5
            Z;
    M 17.5 72.5
            L 72.5 17.5
            A 5 5 0 0 1 82.5 27.5
            L 27.5 82.5
            A 5 5 0 0 1 17.5 72.5
            Z"/>                                                                     </path>
    <path d=""  fill="white">
               <animate   attributeName="d" dur="${dur}" fill="freeze"   values="M 20.75 75.75
            L 20.75 75.75
            A 5 5 0 0 1 24.25 79.25
            L 24.25 79.25
            A 5 5 0 0 1 20.75 75.75
            Z;
            M 20.75 75.75
            L 75.75 20.75
            A 2.5 2.5 0 0 1 79.25 24.25
            L 24.25 79.25
            A 2.5 2.5 0 0 1 20.75 75.75
            Z"/> 
            </path>
   <path d=""  fill="red" filter="url(#Gauss)">
              <animate   attributeName="d" begin="${dur}" dur="${dur}" fill="freeze"   values="M 27.5 17.5
            L 27.5 17.5
            A 5 5 0 0 1 17.5 27.5
            L 17.5 27.5
            A 5 5 0 0 1 27.5 17.5
            Z;
            M 27.5 17.5
            L 82.5 72.5
            A 5 5 0 0 1 72.5 82.5
            L 17.5 27.5
            A 5 5 0 0 1 27.5 17.5
            Z"/>  
            </path>
    <path d=""  fill="white">
               <animate   attributeName="d" begin="${dur}" dur="${dur}" fill="freeze"   values="M 24.25 20.75
            L 24.25 20.75
            A 5 5 0 0 1 20.75 24.25
            L 20.75 24.25
            A 5 5 0 0 1 24.25 20.75
            Z;
            M 24.25 20.75
            L 79.25 75.75
            A 2.5 2.5 0 0 1 75.75 79.25
            L 20.75 24.25
            A 2.5 2.5 0 0 1 24.25 20.75
            Z"/>
            </path>
      
     
    </svg>
`;
}

function animationBorder(element, duration) {
  const height = element.offsetHeight;
  const width = element.offsetWidth;

  element.innerHTML += `
  <svg class="border" viewBox="0 0 ${width} ${height}" height="100%" width="100%" preserveAspectRatio="none"> 
  
  <filter id="Gauss">
    <feGaussianBlur stdDeviation="5"></feGaussianBlur>
  </filter>
  
  <rect x="10" y="10" width="${width - 20}" height="${
    height - 20
  }" rx="20" ry="20"  
    filter="url(#Gauss)" stroke="blue" stroke-width="10" stroke-linecap="round"
    fill="none" vector-effect="non-scaling-stroke" 
    stroke-dasharray="${2 * (width - 20 + height - 20)}"  
    stroke-dashoffset="${2 * (width - 20 + height - 20)}">
    
        <animate   attributeName="stroke-dashoffset" dur="${duration}" fill="freeze"   values="${
    2 * (width - 20 + height - 20)
  };0"/> </rect>
    
     <rect class="lineLigth" x="10" y="10"width="${width - 20}" height="${
    height - 20
  }" rx="20" ry="20"  
        stroke="white" stroke-width="2" stroke-linecap="round" fill="none" 
        vector-effect="non-scaling-stroke" 
        stroke-dasharray="${2 * (width - 20 + height - 20)}"  
        stroke-dashoffset="${2 * (width - 20 + height - 20)}">
        
        <animate   attributeName="stroke-dashoffset" dur="${duration}" fill="freeze"   values="${
    2 * (width - 20 + height - 20)
  };0"/> </rect>
  </svg>`;
}

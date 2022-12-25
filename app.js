
const table = document.querySelector("table");
const id = '1CmQGM1ik9naPVDTLoBaBKC1AzopZdEWDc48REaFSmyk';
const base = 'https://docs.google.com/spreadsheets/d/';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
const q3 = 'sheet=sheet1';
const endPoint = `${base}${id}${q1}&${q2}&${q3}`;

fetch(endPoint).then(res=>res.text())
.then(data => {
let temp = data.replace('/*O_o*/','');
temp = temp.replace('google.visualization.Query.setResponse(','');
temp = temp.replace(');','');
const jsonData = JSON.parse(temp);
jsonData.table.rows.forEach((row)=>{
    row.c.forEach((cell)=>{
        console.log(`${cell.v}`)
    });
})

generateTableHead(table, jsonData, "heading")
generateTable(table,jsonData,"tablerow")
})


function generateTableHead(table, input, classAdd) {
    let thead = table.createTHead();
    thead.classList.add(classAdd);
    let row = thead.insertRow();
    input.table.cols.forEach((col)=>{
        let th = document.createElement("th");
        let text = document.createTextNode(col.label);
        th.appendChild(text);
      row.appendChild(th);
    })
     
    }


    function generateTable(table, input, classAdd) {
        input.table.rows.forEach((row)=>{
          let rowCreate = table.insertRow();
          rowCreate.classList.add(classAdd);
                row.c.forEach((cell)=>{
                    let cellcreate = rowCreate.insertCell();
                    let text = document.createTextNode(cell.v);
                    cellcreate.appendChild(text);               
                })})

    }
    

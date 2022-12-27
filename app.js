
const table = document.querySelector("table");
const id = '1CmQGM1ik9naPVDTLoBaBKC1AzopZdEWDc48REaFSmyk';
const base = 'https://docs.google.com/spreadsheets/d/';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
const q3 = 'sheet=sheet1';
const endPoint = `${base}${id}${q1}&${q2}&${q3}`;
const percent='/%/';


fetch(endPoint).then(res=>res.text())
.then(data => {
let temp = data.replace('/*O_o*/','');
temp = temp.replace('google.visualization.Query.setResponse(','');
temp = temp.replace(');','');
const jsonData = JSON.parse(temp);

generateTableHead(table, jsonData, "heading");

generateTable(table,jsonData,"tablerow");

let per = document.querySelectorAll('td:nth-of-type(7), td:nth-of-type(8)');
per.forEach((value)=>{
    value.classList.add("percentage");
});

perFormat();

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


    function formatAsPercent(num) {
        return new Intl.NumberFormat('default', {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(num / 100);
      }
    


    function generateTable(table, input, rowFormat) {
        input.table.rows.forEach((row)=>{
          let rowCreate = table.insertRow();
          rowCreate.classList.add(rowFormat);
                row.c.forEach((cell)=>{
                    let cellcreate = rowCreate.insertCell();
                    let text = document.createTextNode(cell.v); 
                    cellcreate.appendChild(text); 
                })}
                )

    }


    function perFormat(){
        var cells = document.getElementsByClassName("percentage");
      
        // Loop through the NodeList
        for (var i = 0; i < cells.length; i++) {
          // Get the current cell
          var cell = cells[i];
        
          // Set the innerHTML of the cell to the cell value plus the percentage string
          cell.innerHTML = cell.innerHTML*100 + "%";
        } 
      }

      function perFormat(){
        var cells = document.getElementsByClassName("dollar");
      
        // Loop through the NodeList
        for (var i = 0; i < cells.length; i++) {
          // Get the current cell
          var cell = cells[i];
        
          // Set the innerHTML of the cell to the cell value plus the percentage string
          cell.innerHTML = cell.innerHTML*100 + "%";
        } 
      }   
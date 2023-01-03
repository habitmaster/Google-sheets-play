
const table = document.querySelector("table");
const id = '1CmQGM1ik9naPVDTLoBaBKC1AzopZdEWDc48REaFSmyk';
const base = 'https://docs.google.com/spreadsheets/d/';
const q1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
const q3 = 'sheet=sheet1';
const q4 = 'sheet=sheet4';
const q5 = 'select%20cell%20B2';
const endPoint = `${base}${id}${q1}&${q2}&${q3}`;
const endPoint1 = `${base}${id}${q1}&${q2}&${q4}&${q5}`;


fetch(endPoint).then(res=>res.text())
.then(data => {
let temp = data.replace('/*O_o*/','');
temp = temp.replace('google.visualization.Query.setResponse(','');
temp = temp.replace(');','');
const jsonData = JSON.parse(temp); 
generateTableHead(table, jsonData, "heading");
generateTable(table,jsonData,"tablerow");
perFormat();
sharepriceFormat();
marketcapFormat();
KPIs();
})


function generateTableHead(table, input, classAdd) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    input.table.cols.forEach((col)=>{
        let th = document.createElement("th");
        th.classList.add(classAdd);  // Add the heading class to the th element
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
        var cells = document.querySelectorAll('td:nth-of-type(7), td:nth-of-type(8)');
        // Loop through the NodeList
        for (var i = 0; i < cells.length; i++) {
          // Get the current cell
          var cell = cells[i];
        
          // Set the innerHTML of the cell to the cell value plus the percentage string
          let formattedNumber = Number(cell.innerHTML).toFixed(2);
          cell.innerHTML = formattedNumber*100 + "%";
        } 
      }


      function sharepriceFormat(){
        var cells = document.querySelectorAll('td:nth-of-type(4), td:nth-of-type(5), td:nth-of-type(6)');
        // Loop through the NodeList
        for (var i = 0; i < cells.length; i++) {
          // Get the current cell
          var cell = cells[i];
      
          // Get the cell value as a number and format it with two decimal places
          let formattedNumber = Number(cell.innerHTML).toFixed(2);
      
          // Set the innerHTML of the cell to the formatted number with a dollar sign
          cell.innerHTML = "$" + formattedNumber;
        } 
      }

      function marketcapFormat(){
        var cells = document.querySelectorAll('td:nth-of-type(3)');
        // Loop through the NodeList
        for (var i = 0; i < cells.length; i++) {
          // Get the current cell
          var cell = cells[i];
      
          // Set the innerHTML of the cell to the formatted number with a dollar sign
          cell.innerHTML = "$" + cell.innerHTML;
        } 
      }

function KPIs(){
      const h2Elements = document.querySelector('.mid1-item');
      fetch(endPoint1).then(res=>res.text())
      .then(data => {
      let temp = data.replace('/*O_o*/','');
      temp = temp.replace('google.visualization.Query.setResponse(','');
      temp = temp.replace(');','');
      const jsonData = JSON.parse(temp);
        jsonData.table.rows.forEach((row)=>{
        row.c.forEach((cell)=>{
            h2Elements.insertAdjacentHTML("beforeend", `<h2>${cell.v}</h2>`);
      })});
})}
        


  

const output = document.querySelector('.output');
const id = '1NF43Fp18YOp79M1B1tqY-Im3Isx4g-iEQPoc3dcYzyo';
const base = 'https://docs.google.com/spreadsheets/d/';
const query = 'SELECT *';
const tq = '/gviz/tq?tqx=out:json&tq=';
const endPoint = `${base}${id}${tq}`;

fetch(endPoint).then(res=>res.text())
.then(data => {
let temp = data.replace('/*O_o*/','');
temp = temp.replace('google.visualization.Query.setResponse(','');
temp = temp.replace(');','');
const jsonData = JSON.parse(temp);


const rows = jsonData.table.rows;
rows.forEach((row) =>{
  const div = document.createElement("div");
    const temp1 = row.c;
    temp1.forEach((cell)=>{
      const box = document.createElement("div");
        box.textContent = cell.v;
        box.classList.add("box");
        div.append(box);
    })
    output.append(div);
    });
});

getData();


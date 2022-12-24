
const output = document.querySelector('.output');
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
console.log(jsonData.table); 
const headings = makeCell(output, '', 'heading');
jsonData.table.cols.forEach((col)=>{
 console.log(col);
    const el = makeCell(headings, col.label, 'box') 
})
jsonData.table.rows.forEach((row)=>{
    console.log(row);
    const div = makeCell(output, '','row');
    row.c.forEach((cell)=>{
    const ele1 = makeCell(div,`${cell.v}`,'box');
});
})


});

function makeCell(parent, html, classAdd){
    const ele = document.createElement('div');
    parent.append(ele);
    ele.innerHTML = html; 
    ele.classList.add(classAdd);
       return ele;
}

// cell.v


// const rows = jsonData.table.rows;
// rows.forEach((row) =>{
//   const div = document.createElement("div");
//     const temp1 = row.c;
//     temp1.forEach((cell)=>{
//       const box = document.createElement("div");
//         box.textContent = cell.v;
//         box.classList.add("box");
//         div.append(box);
//     })
//     output.append(div);
//     });
// });




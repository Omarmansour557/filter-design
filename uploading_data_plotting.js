const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
let x_column 
let y_column
let y_filtterd=[0,,0,0,0,0,0,0,0,0,0,0,0,0]
let x
let y
let dx
let b = [0.21546504, 0.01546504];
let a = [ 1.        , -0.06906992];

function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column; // return column data..
 }

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];

  dfd.read_csv(input).then((df) => {
    let tf_tensor = df.tensor
    x_column = getCol(df.values,0)
    dx = x_column[2]-x_column[1];
    y_column = getCol(df.values,1)

    let x=x_column[0]
    let y=y_column[0]

    console.log(x_column)
    // document.write(JSON.stringify(x_column));
    // console.log(x_column)
})


});
// let x=x_column[0]
// let y=y_column[0]
// console.log(x)


var data = [{
    x: [x], 
    y: [y],
    mode: 'lines',
    line: {color: '#80CAF6'}
  }]
var layout = {
    // xaxis: {range: [2, 5]},
    yaxis: {range: [-1, 2.5]}
  };

var filtter_data = [{
    x: [x], 
    y: [y_filtterd[0]],
    mode: 'lines',
    line: {color: '#8fce00'}
  }]

  
  Plotly.newPlot('graph', data,layout);  
  Plotly.newPlot('filterd', filtter_data,layout); 
  
  var cnt = 1;
  
  var interval = setInterval(function() {
    
    // var time = new Date();
    
    var update = {
    x:  [[x_column[cnt]]],
    y: [[y_column[cnt]]]
    }

    y_filtterd[cnt]=a[1]*y_filtterd[cnt-1] + b[0]*y_column[cnt] + b[1]*y_column[cnt-1];

    let yyyyy=a[1]*y_filtterd[cnt-1] + b[0]*y_column[cnt] + b[1]*y_column[cnt-1];

    // console.log(yyyyy)

    var update_filterd = {
      x:  [[x_column[cnt]]],
      y: [[y_filtterd[cnt]]]
      }

    // console.log(cnt);
    // var olderTime = time.setMinutes(x_column[cnt]);
    // var futureTime = time.setMinutes(x_column[cnt+10]);
    
    var minuteView = {
          xaxis: {

            range: [x_column[cnt]-dx,x_column[cnt]-dx]
          }
        };
    
    Plotly.relayout('graph', minuteView);
    Plotly.extendTraces('graph', update, [0])

    Plotly.relayout('filterd', minuteView);

    Plotly.extendTraces('filterd', update_filterd, [0])

    cnt++;
    if(cnt === 400) clearInterval(interval);
  }, 40);
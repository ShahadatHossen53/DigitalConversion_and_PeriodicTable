function setup() {
  createCanvas(1300, 1000);
}
var gap = 30;
var vgap = 60;
var b_number = "110101";
var temp_b_number = b_number;
var optn = "unipolar_NRZ";
var trnslt = 0;
var color_value = '#ff0000';
let strk_weight = 2.53;
function draw(){
  background(227); 
  translate(0,100);
  //QPSK_temp();
  
    if(optn == "Mancester"){
      manchester();
    }
    else if(optn == "Differential_Mancester"){
      differential_manchester();
    }
    else if(optn == "unipolar_NRZ"){
      unipolar_NRZ();
    }
    else if(optn == "polar_NRZ_L"){
      polar_NRZ_L();
    }
    else if(optn == "polar_NRZ_I"){
      polar_NRZ_I();
    }
    else if(optn == "polar_RZ"){
      polar_RZ();
    }
    else if(optn == "sine_wave"){
      sine_wave(0,100);
      show_graph(0,100);
    }
    else if(optn == "AMI"){
      AMI();
    }
    else if(optn == "Pseudoternary"){
      Pseudoternary();
    }
    else if(optn == "MLT_3"){
      MLT_3();
    }
    else{
      analog_to_digital();
    }
}
function sine_wave(poss_x, poss_y){
   translate(poss_x, poss_y);
   var x=0;
   var y=0;
   var px = 0;
   var py = 0;
   var amplitude = 50;
   var frequency = 3;
   for(i=0; i<width; i++){
     x = i;
     y = sin((i/gap)*(frequency*PI))*vgap;
     line(x, y, px, py);
     px = x;
     py = y;
     //circle(i, sin((i/gap)*TWO_PI)*amplitude, 3);
   }
   translate(-poss_x, -poss_y);
}

function toPossitive(x, y){
  negetive(x,y);
  translate(gap,0);
  line(x,y+40,x,y);
  possitive(x,y);
}
function toNegative(x, y){
  possitive(x,y);
  translate(gap,0);
  line(x,y+40,x,y);
  negetive(x,y);
}
function negetiveFull(x, y){
  line(x+0,y+40,x+gap*2,y+40);
}
function negetive(x, y){
  line(x+0,y+40,x+gap,y+40);
}
function negetiveZero(x, y){
  line(x+0,y+40,x+gap,y+40);
  translate(gap,0);
  line(x,y+40, x, y+20);
  line(x+0,y+20,x+gap,y+20);
}
function possitiveZero(x, y){
  line(x+0,y,x+gap,y);
  translate(gap,0);
  line(x,y, x, y+20);
  line(x+0,y+20,x+gap,y+20);
}
function zoro_value(x, y){
  line(x,y+20,x+gap*2,y+20);
}
function possitiveFull(x, y){
  line(x+0,y,x+gap*2,y);
}
function possitive(x, y){
  line(x+0,y+0,x+gap,y+0);
}

function show_graph(x,y){
  strokeWeight(1);
  line(x, y, x+width, y);
  line(x, y+40, x, y-40);
  for(i=-1; i*gap<width; i=i+2){
    for(j=-10; j<10; j++){
      line((i*gap),y+(5*j), (i*gap), y+(j*5)+2);
    }
  }
  strokeWeight(strk_weight);
}
function manchester(){
  show_graph(5,60);
  stroke(color_value);
    for(i=0; i<b_number.length; i++){
      if(b_number[i] == 0){
        toNegative(gap,40);
      }
      else if((b_number[i] == 1)){
        toPossitive(gap,40);
      }
      translate(gap,0);
      if((b_number[i] == b_number[i+1])){
        line(gap,40,gap,80);
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function differential_manchester(){
    show_graph(5,60);
    stroke(color_value);
    var value = 1;
    for(i=0; i<b_number.length; i++){
      if(value==1){
        if(b_number[i] == 0){
          toPossitive(gap,40);
        }
        else if((b_number[i] == 1)){
          toNegative(gap,40);
          value *= -1;
        }
      }
      else{
        if(b_number[i] == 0){
          toNegative(gap,40);
        }
        else if((b_number[i] == 1)){
          toPossitive(gap,40);
          value *= -1;
        }
      }
      translate(gap,0);
      if(b_number[i+1]==0){
        line(gap,40,gap,80);
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function unipolar_NRZ(){
  show_graph(5,60);
   stroke(color_value);
   for(i=0; i<b_number.length; i++){
      if(b_number[i] == 0){
        zoro_value(gap,40);
      }
      else if((b_number[i] == 1)){
        possitiveFull(gap,40);
      }
      translate(gap+gap,0);
      if((b_number[i] != b_number[i+1]) && i<b_number.length-1){
        line(gap,40,gap,60);
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function polar_NRZ_L(){
  show_graph(5,60);
   stroke(color_value);
   for(i=0; i<b_number.length; i++){
      if(b_number[i] == 0){
        negetiveFull(gap,40);
      }
      else if((b_number[i] == 1)){
        possitiveFull(gap,40);
      }
      translate(gap+gap,0);
      if((b_number[i] != b_number[i+1]) && i<b_number.length-1){
        line(gap,40,gap,80);
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function polar_NRZ_I(){
    show_graph(5,60);
    stroke(color_value);
    var value = 1;
    for(i=0; i<b_number.length; i++){
      if(value==1){
        if(b_number[i] == 0){
          possitiveFull(gap,40);
        }
        else if((b_number[i] == 1)){
          negetiveFull(gap,40);
          value *= -1;
        }
      }
      else{
        if(b_number[i] == 0){
          negetiveFull(gap,40);
        }
        else if((b_number[i] == 1)){
          possitiveFull(gap,40);
          value *= -1;
        }
      }
      translate(gap+gap,0);
      if(b_number[i+1]==1){
        line(gap,40,gap,80);
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function polar_RZ(){
  show_graph(5,60);
   stroke(color_value);
   for(i=0; i<b_number.length; i++){
      if(b_number[i] == 0){
        negetiveZero(gap,40);
      }
      else if((b_number[i] == 1)){
        possitiveZero(gap,40);
      }
      translate(gap,0);
      if((b_number[i+1] == 0) && i<b_number.length-1){
        line(gap,60,gap,80);
      }
      else if((b_number[i+1] == 1) && i<b_number.length-1){
        line(gap,60,gap,40);
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function AMI(){
    show_graph(5,60);
    stroke(color_value);
    var value = 1;
    for(i=0; i<b_number.length; i++){
      if(value==1){
        if(b_number[i] == 0){
          zoro_value(gap,40);
        }
        else if((b_number[i] == 1)){
          possitiveFull(gap,40);
          value *= -1;
        }
      }
      else{
        if(b_number[i] == 0){
          zoro_value(gap,40);
        }
        else if((b_number[i] == 1)){
          negetiveFull(gap,40);
          value *= -1;
        }
      }
      translate(gap+gap,0);
      if(b_number[i]==0){
        if((b_number[i+1] == 1 && value==-1) && i<b_number.length-1){
          line(gap,60,gap,80);
        }
        else if((b_number[i+1] == 1 && value==1) && i<b_number.length-1){
          line(gap,60,gap,40);
        }
      }
      else if(b_number[i]==1){
        if((b_number[i+1] == 1) && i<b_number.length-1){
          line(gap,40,gap,80);
        }
        else if((b_number[i+1] == 0 && value==-1) && i<b_number.length-1){
          line(gap,60,gap,40);
        }
        else if((b_number[i+1] == 0 && value==1) && i<b_number.length-1){
          line(gap,60,gap,80);
        }
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function Pseudoternary(){
    show_graph(5,60);
    stroke(color_value);
    var value = 1;
    for(i=0; i<b_number.length; i++){
      if(value==1){
        if(b_number[i] == 1){
          zoro_value(gap,40);
        }
        else if((b_number[i] == 0)){
          possitiveFull(gap,40);
          value *= -1;
        }
      }
      else{
        if(b_number[i] == 1){
          zoro_value(gap,40);
        }
        else if((b_number[i] == 0)){
          negetiveFull(gap,40);
          value *= -1;
        }
      }
      translate(gap+gap,0);
      if(b_number[i]==1){
        if((b_number[i+1] == 0 && value==-1) && i<b_number.length-1){
          line(gap,60,gap,80);
        }
        else if((b_number[i+1] == 0 && value==1) && i<b_number.length-1){
          line(gap,60,gap,40);
        }
      }
      else if(b_number[i]==0){
        if((b_number[i+1] == 0) && i<b_number.length-1){
          line(gap,40,gap,80);
        }
        else if((b_number[i+1] == 1 && value==-1) && i<b_number.length-1){
          line(gap,60,gap,40);
        }
        else if((b_number[i+1] == 1 && value==1) && i<b_number.length-1){
          line(gap,60,gap,80);
        }
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function MLT_3(){
    show_graph(5,60);
    stroke(color_value);
    var value = 0;
    var pre_value = -1;
    for(i=0; i<b_number.length; i++){
      if(value==0){
        if(pre_value==-1){
          if(b_number[i] == 1){
            possitiveFull(gap,40);
            value = 1;
            pre_value = 1;
          }
          else if((b_number[i] == 0)){
            zoro_value(gap,40);
          }
        }
        else if(pre_value==1){
          if(b_number[i] == 1){
            negetiveFull(gap,40);
            value = -1;
            pre_value = -1;
          }
          else if((b_number[i] == 0)){
            zoro_value(gap,40);
          }
        }
      }
      else if(value==1){
         if(b_number[i]==1){
           zoro_value(gap, 40);
           value = 0;
         }
         else if(b_number[i]==0){
           possitiveFull(gap, 40);
         }
      }
      else if(value==-1){
         if(b_number[i]==1){
           zoro_value(gap, 40);
           value = 0;
         }
         else if(b_number[i]==0){
           negetiveFull(gap, 40);
         }
      }  
      translate(gap+gap,0);
      if(value==0){
        if((b_number[i+1] == 1) && i<b_number.length-1){
          if(pre_value==1){
            line(gap,80,gap,60);
          }
          else{
            line(gap,40,gap,60);
          }
        }
      }
      else if(value==1){
        if((b_number[i+1] == 1) && i<b_number.length-1){
            line(gap,40,gap,60);
        }
      }
      else{
        if((b_number[i+1] == 1) && i<b_number.length-1){
            line(gap,80,gap,60);
        }
      }
      wText(b_number[i]);
    }
    stroke(0,0,0);
}
function select_option(){
    optn = document.getElementById('wave_function').value; 
}
function get_number(){
  b_number = document.getElementById('b_number').value;
  temp_b_number = b_number;
  var len = b_number.length;
  
}
function wText(bit){
  noStroke();
  text(bit, 0,25); 
  stroke(color_value);
}

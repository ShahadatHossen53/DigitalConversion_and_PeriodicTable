function analog_to_digital(){
  if(optn == "ASK"){
      ASK();
   }
   else if(optn == "FSK"){
      FSK();
   }
   else if(optn == "PSK"){
      PSK();
   }
   else if(optn == "QPSK"){
      QPSK();
   }
}

function ASK(){
  push();
  unipolar_NRZ();
  pop();
  push();
  translate(0,100);
  show_graph(5,60);
  stroke(color_value);
  carrier_signal(gap,60);
  stroke(0,0,0);
  pop();
  push();
  translate(0,200);
  show_graph(5,60);
  stroke(color_value);
  modulated_signal(gap,60);
  stroke(0,0,0);
  pop();
}
function FSK(){
  push();
  unipolar_NRZ();
  pop();
  push();
  translate(0,100);
  show_graph(5,60);
  stroke(color_value);
  carrier_signal(gap,60);
  stroke(0,0,0);
  pop();
  push();
  translate(0,200);
  show_graph(5,60);
  stroke(color_value);
  modulated_signal_FSK(gap,60);
  stroke(0,0,0);
  pop();
}
function PSK(){
  push();
  polar_NRZ_L();
  pop();
  push();
  translate(0,100);
  show_graph(5,60);
  stroke(color_value);
  carrier_signal(gap,60);
  stroke(0,0,0);
  pop();
  push();
  translate(0,200);
  show_graph(5,60);
  stroke(color_value);
  modulated_signal_PSK(gap,60);
  stroke(0,0,0);
  pop();
}

var b_number_1 = "";
var b_number_2 = "";
var qpsk_angle = 90;
var qpsk_y_result_1 = [];
var qpsk_y_result_2 = [];
var qpsk_y_1 = false;
function QPSK(){
  b_number_1 = "";
  b_number_2 = "";
  b_number = temp_b_number;
  polar_NRZ_L_QPSK();
  push();
  b_number = b_number_1;
  polar_NRZ_L();
  pop();
  push();
  translate(0,100);
  show_graph(5,60);
  stroke(color_value);
  carrier_signal(gap,60);
  stroke(0,0,0);
  pop();
  push();
  translate(0,200);
  show_graph(5,60);
  stroke(color_value);
  qpsk_y_1 = true;
  modulated_signal_QPSK(gap,60);
  qpsk_y_1 = false;
  stroke(0,0,0);
  pop();
  
  
  push();
  translate(0,300);
  b_number = b_number_2;
  polar_NRZ_L();
  pop();
  push();
  translate(0,400);
  show_graph(5,60);
  stroke(color_value);
  carrier_signal(gap,60, qpsk_angle);
  stroke(0,0,0);
  pop();
  push();
  translate(0,500);
  show_graph(5,60);
  stroke(color_value);
  modulated_signal_QPSK(gap,60, qpsk_angle);
  stroke(0,0,0);
  pop(); 
  b_number = temp_b_number;
  
  push();
  translate(0,600);
  show_graph(5,60);
  stroke(12,215,165);
  modulated_signal_QPSK_result(gap,60, 0);
  stroke(0,0,0);
  pop(); 
}

function carrier_signal(poss_x, poss_y, angle=0){
  translate(poss_x, poss_y);
   var x=0;
   var y=0;
   var amplitude = 30;
   var frequency = 2;
   var radin = 0.01745329*angle;
   var py = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
   var px = 0;
   for(i=0; i<=2*gap*b_number.length; i++){
     x = i;
     y = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     line(x, y, px, py);
     px = x;
     py = y;
   }
   translate(-poss_x, -poss_y);
}
function modulated_signal(poss_x, poss_y, angle=0){
   translate(poss_x, poss_y);
   var x=0;
   var y=0;
   var px = 0;
   var py = 0;
   var amplitude = 30;
   var frequency = 2;
   
   for(i=0; i<=2*gap*b_number.length; i++){
     x = i;
     var indx = int(map(i,0,2*gap*b_number.length, 0, b_number.length));
     if((b_number[indx])==1){
       y = -1*sin((i/gap)*(frequency*PI))*amplitude;
     }
     else{
       y = 0;
     }
     
     line(x, y, px, py);
     px = x;
     py = y;
   }
   translate(-poss_x, -poss_y);
}

function modulated_signal_FSK(poss_x, poss_y){
   translate(poss_x, poss_y);
   var x=0;
   var y=0;
   var px = 0;
   var py = 0;
   var amplitude = 30;
   var frequency = 2;
   
   for(i=0; i<=2*gap*b_number.length; i++){
     x = i;
     var indx = int(map(i,0,2*gap*b_number.length, 0, b_number.length));
     if((b_number[indx])==1){
       frequency = 4;
     }
     else{
       frequency = 2;
     }
     y = -1*sin((i/gap)*(frequency*PI))*amplitude;
     
     line(x, y, px, py);
     px = x;
     py = y;
   }
   translate(-poss_x, -poss_y);
}
function modulated_signal_PSK(poss_x, poss_y, angle=0){
   translate(poss_x, poss_y);
   var x=0;
   var y=0;
   var amplitude = 30;
   var frequency = 2;
   var radin = 0.01745329*angle;
   var py = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
   var px = 0;
   
   var pre_indx=-1;
   
   
   var toggle_line_print = -1;
   for(i=0; i<=2*gap*b_number.length; i++){
     x = i;
     var indx = int(map(i,0,2*gap*b_number.length, 0, b_number.length));
     if((b_number[indx])==1){
       y = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     }
     else{
       y = sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     }
     if(pre_indx==indx || angle==0){
       line(x, y, px, py);
     }
     pre_indx=indx;
     px = x;
     py = y;
   }
   translate(-poss_x, -poss_y);
}

function modulated_signal_QPSK(poss_x, poss_y, angle=0){
   translate(poss_x, poss_y);
   var x=0;
   var y=0;
   var amplitude = 30;
   var frequency = 2;
   var radin = 0.01745329*angle;
   var py = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
   var px = 0;
   
   var pre_indx=-1;
   
   
   var toggle_line_print = -1;
   for(i=0; i<=2*gap*b_number.length; i++){
     x = i;
     var indx = int(map(i,0,2*gap*b_number.length, 0, b_number.length));
     if((b_number[indx])==1){
       y = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     }
     else{
       y = sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     }
     if(qpsk_y_1){
       append(qpsk_y_result_1, y);
     }
     
     if(pre_indx==indx || angle==0){
       line(x, y, px, py);
     }
     pre_indx=indx;
     px = x;
     py = y;
   }
   translate(-poss_x, -poss_y);
}


let qpsk_angles = {
  "00" : -135+qpsk_angle,
  "01" : 135+qpsk_angle,
  "10" : -45+qpsk_angle,
  "11" : 45+qpsk_angle
};

function modulated_signal_QPSK_result(poss_x, poss_y, angle=0){
   translate(poss_x, poss_y);
   var x=0;
   var y=0;
   var amplitude = 30;
   var frequency = 2;
   var bits_2 = b_number[0]+""+b_number[1];
   angle = qpsk_angles[bits_2];
   var radin = 0.01745329*angle;
   var py = 0;
   py = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
   var px = 0;
   var pre_indx=-1;
   for(i=0; i<gap*b_number.length; i++){
     x = i;
     var indx = int(map(i,0,2*gap*b_number.length, 0, b_number.length));
     bits_2 = b_number[indx]+""+b_number[indx+1];
     angle = qpsk_angles[bits_2];
     radin = 0.01745329*angle;
     y = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     
     /*if((b_number[indx])==1){
       y = -1*sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     }
     else{
       y = sin(((x/gap)*(frequency*PI))+radin)*amplitude;
     }*/
     if(pre_indx==indx || angle==0){
       line(x, y, px, py);
     }
     pre_indx=indx;
     px = x;
     py = y;
   }
   translate(-poss_x, -poss_y);
}




function polar_NRZ_L_QPSK(){
  for(i=0; i<b_number.length; i+=2){
      b_number_1+=b_number[i];
      b_number_2+=b_number[i+1];
    }
}

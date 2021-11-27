function get_wave_color(){
  color_value = document.getElementById('wave_color').value;
}

function stroke_weight(){
  strk_weight = document.getElementById('stroke_weight').value;
}


function change_gap(){
  gap = document.getElementById('gap').value;
  gap = abs(gap);
  if(gap==0){
    gap = 1;
  }
}

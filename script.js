function main(){
  MAX_WIDTH  = 9;
  MAX_HEIGHT = 9;
  WIDTH = 30;
  HEIGHT = 30;
  BOM_LOCATION_FLAG="B";
  NON_BOM_LOCATION_FLAG="NB";
  CONTROLE_LOCATION_ROW=3;
  tileCount = null;
  tiles = {};
  tileElement = {}; 
  isStart = true;
  $('#level').change(function(){
    $('#r1').html($(this).val());
    var lev = $('#level').val();
    if(lev === "high"){
     	initWithLevel(30,16);
     	isStart = true;
     	return;
    }else if(lev === "mid"){
    	initWithLevel(16,16);
    	isStart = true;
    	return;
    }else{
    	initWithLevel(9,9);
    	isStart = true;
    	return;
    }
  });
  init();
}

function initWithLevel(wid,hei) {
MAX_WIDTH = wid;
MAX_HEIGHT=hei;
init();
}
function init() {
  tileCount = MAX_WIDTH * MAX_HEIGHT;
  var pane = document.getElementById('pane');
  //var pane = top.f1.document.getElementById('pane');
  for (var i = 0; i < MAX_WIDTH; i++) {
    tiles[i] = {};
    tileElement[i] = {};
    for(var j = CONTROLE_LOCATION_ROW; j < MAX_HEIGHT+CONTROLE_LOCATION_ROW; j++) {
      tiles[i][j] = 0;
      var tile = document.createElement('div');
      tile.style.backgroundColor = '#ccf';
      tile.style.width = WIDTH + "px";
      tile.style.height = HEIGHT + "px";
      tile.style.left = (i * WIDTH) + "px";
      tile.style.top = (j * HEIGHT) + "px";
      tile.className = "tile";
      var rand = Math.random() * 10 + 1;
      tile.innerHTML = '';
      if (rand > 9.5) {
        tiles[i][j] = BOM_LOCATION_FLAG;
        tileCount--;
      }
      tileCount--;
      tileElement[i][j] = tile;
      setActionForDisplayCompStage(i,j,tile);
      pane.appendChild(tile);
    }
  }
}
  
function selectTile(i, j, isClick, orgI, orgJ) {
  if(isStart && isClick){
  	isStart = false;
  	$('#start').click();
  }
  if (isClick && tiles[i][j] === BOM_LOCATION_FLAG) {
    displayAllBoms();
    $('#stop').click();
    showGameOverDialog()
    return false;
  } else if (tiles[i][j] == NON_BOM_LOCATION_FLAG) {
    return false;
  }

  tileCount--;
  tiles[i][j] = NON_BOM_LOCATION_FLAG;
  
  var bomCount = 0;
  for (var n = i-1; n <= i + 1; n++) {
    if (n < 0 || n >= MAX_WIDTH) {
      continue;
    }
    for (var m = j-1; m <= j +1; m++) {
      if (0 <= m && m < MAX_HEIGHT) {
        if (tiles[n][m] === BOM_LOCATION_FLAG) {
          bomCount++;
        }
      }
    }
  }
  if(bomCount == 0){
    tileElement[i][j].innerHTML = "";
  }else{
    tileElement[i][j].innerHTML = bomCount;
  }
  tileElement[i][j].style.backgroundColor = '#ddd';

  if (bomCount == 0) {
    for (var n = i-1; n <= i + 1; n++) {
      if (n < 0 || n >= MAX_WIDTH) {
        continue;
      }
      for (var m = j-1; m <= j + 1; m++) {
        if (0 <= m && m < MAX_HEIGHT) {
          if ((n == i && m ==j) || (n == orgI && m == orgJ)) {
            // OWN TILE or CLICK TILE
          } else {
            selectTile(n, m, false, orgI, orgJ);
          }
        }
      }
    }
  }

  if (tileCount == 0) {
    return true;
  } else {
    return false;
  }
}
        
function displayAllBoms() {
  for (var i = 0; i < MAX_WIDTH; i++) {
    for(var j = 0; j < MAX_HEIGHT; j++) {
      if (tiles[i][j] === BOM_LOCATION_FLAG) {
        tileElement[i][j].innerHTML = "<img src ='bom.png' width='20' height='20'>";
        tileElement[i][j].style.backgroundColor = '#f00';
      }
    }
  }
}
function setActionForDisplayCompStage(n, m,tile) {
  tile.onclick = function() {
  var isClear = selectTile(n, m, true, n, m);
    if (isClear) {
          alert('You did it !!');
          
          init();
    }
  }
}

		function showGameOverDialog() {
			var strTitle = "ゲームオーバー";
			var strComment = "ゲームもう一回やります？";
			
			// ダイアログのメッセージを設定
			$( "#confirm" ).html( strComment );
			isStart = true;
			// ダイアログを作成
			$( "#confirm" ).dialog({
				modal: true,
				title: strTitle,
				buttons: {
					"リトライ": function() {
						$( this ).dialog( "close" );
						
						init();
						//initWithLevel(16,16);
					}
				}
			});
		}

$(document).ready(main);
//window.onload=main;


$('#r1').html($('#level').val());

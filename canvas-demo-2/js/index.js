var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2017,0,11,18,47,52);
var curShowTimeSeconds = 0;


window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();

	render(context);
}
function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime(); //毫秒数
	ret = Math.round(ret/1000);

	return ret>0?ret:0; //倒计时结束，返回0
}

function render(cxt){
	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt(curShowTimeSeconds-hours*3600/60);
	var seconds = curShowTimeSeconds%60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt); //起始位置x,y,需要绘制的值，cxt
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt); //小时第二位
											//2*(7+1)+1(留一点间隙)
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt); //冒号 4*10
											//2*(4+1)+1(冒号4个位)
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);

	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt); //冒号

	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle = '#dddfff';
                                             // 即第i行	
	for(var i = 0; i < digit[num].length; i++){ //digit[num]表示要显示哪个数字，digit[0] -> 0;//digit[num].length具体数字里面长度行数																		
		for(var j= 0; j < digit[num][i].length; j++){ //遍历某数字里面列，即第j列
			if(digit[num][i][j] == 1){  //是1则绘制圆球
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill(); 
			}
		}
	}
}
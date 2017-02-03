var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//const endTime = new Date(2017,0,12,18,47,52);
//var endTime = new Date();
//endTime.setTime(endTime.getTime()+3600*1000); //设置为当前打开网页时间往后一个小时

var curShowTimeSeconds = 0;

var balls = [];
const colors =['#20B2AA','#545454','#FFB6C1 ','#63B8FF','#FFD700','#C0FF3E','#E0FFFF','#9B30FF','#CD3278','  #FFFF00 ']

window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();

	setInterval(function () {
		render(context);
		update();
	},50);
}
function getCurrentShowTimeSeconds(){
	var curTime = new Date(); 
	var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();//今天一共走过了多少秒

	return ret; 
}

function update(){
	//下一次要显示的时间是多少
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60); 
	var nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60); 
	var curSeconds = curShowTimeSeconds%60;

	if(nextSeconds != curSeconds){ //时间发生改变

		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39,MARGIN_TOP,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));//parseInt(nextSeconds%10),用nextSeconds彩色小球显示下一个数字
		}

		curShowTimeSeconds = nextShowTimeSeconds;
	}

	updateBalls();
}

//小球的弹跳更新
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g; //y轴有重力加速度再加上

		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){ //小球底部已经触碰到底部边缘
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.75; //每次反弹减速（更加真实）
		}
	}
	var cnt=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS > 0&&balls[i].x-RADIUS<WINDOW_WIDTH){ //小球还在画布内,i一定大于等于cnt
			balls[cnt++]=balls[i]; //，0-(cnt-1)是留在画布内的小球
		}
	}
	while (balls.length>Math.min(300,cnt)) { //至多留300个小球,性能考虑
		balls.pop();
	}
}

//位置加彩球
function addBalls(x,y,num){
	for(var i = 0; i < digit[num].length; i++){ 										
		for(var j= 0; j < digit[num][i].length; j++){ //
			if(digit[num][i][j] == 1){ 
				var aBall = {
					x: x+j*2*(RADIUS+1)+(RADIUS+1),
					y: y+i*2*(RADIUS+1)+(RADIUS+1),
					g: 1.5+Math.random(), //1.5-2.5
					vx: Math.pow(-1,Math.ceil(Math.random()*1000))*4,//取-1(奇数)或者+1(偶数)，再*4，即最终-4或者4
					vy: -5,
					color:colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
			
		}
	}
}

//绘制时间，绘制小球
function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT); //清空给定矩形内的指定像素

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60); 
	var seconds = curShowTimeSeconds%60;   console.log(hours+':'+minutes+':'+seconds);

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

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();

		cxt.fill();
	}
		
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle = '#23243E';
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

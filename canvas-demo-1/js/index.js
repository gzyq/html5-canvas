  /**
   * [context description]
   * @type {[type]}
   
	var context = canvas.getContext('2d'); //使用context进行绘制

	//js指定宽高
	canvas.width = 1024;
	canvas.height = 768;
    
  //基于状态的绘图，先有状态，后有绘制(先准备要画什么)

   context.moveTo(100,100); //笔尖放在（100,100）
    context.lineTo(700,700); //从（100,100）绘制到（700,700），以上操作，都为意图绘制并未开始画

    context.lineWidth =5 ; //粗细
    context.strokeStyle = '#005588';//颜色

    context.stroke(); //绘制线条

   context.moveTo(100,100); //笔尖放在（100,100）
    context.lineTo(700,700); //从（100,100）绘制到（700,700），以上操作，都为意图绘制并未开始画
    context.lineTo(100,700);
    context.lineTo(100,100); 

   	context.fillStyle ='rgb(2,60,30)';
   	context.fill();  //填充绘画的颜色、渐变或模式

//绘制弧形、圆
    arc(x,y,r,start,stop); 
*/
    /*七巧板-1*/
    var tangram1 = [
        {
          p:[{x:0,y:0},{x:200,y:0},{x:100,y:100}],
          color:'#ccffff'
        },
        {
          p:[{x:0,y:0},{x:100,y:100},{x:0,y:200}],
          color:"#ffcccc"
        },
        {
          p:[{x:200,y:0},{x:200,y:100},{x:150,y:150},{x:150,y:50}],
          color:"#ffffcc"},
        {
          p:[{x:150,y:50},{x:150,y:150},{x:100,y:100}],
          color:"#ccccff"
        },
        {
          p:[{x:100,y:100},{x:150,y:150},{x:100,y:200},{x:50,y:150}],
          color:"#ccffcc"
        },
        {
          p:[{x:50,y:150},{x:100,y:200},{x:0,y:200}],
          color:"#99cccc"
        },
        {
          p:[{x:200,y:100},{x:200,y:200},{x:100,y:200}],
          color:"#ffccff"
        },
    ];

    /*七巧板-2*/
    var tangram2 = [
        {
          p:[{x:150,y:0},{x:150,y:100},{x:100,y:150},{x:100,y:50}],
          color:'#FFFFCC'
        },
       {
          p:[{x:100-25*Math.sqrt(2),y:150},{x:100+25*Math.sqrt(2),y:150},{x:100+25*Math.sqrt(2),y:150+50*Math.sqrt(2)},{x:100-25*Math.sqrt(2),y:150+50*Math.sqrt(2)}],
          color:"#CCFFCC"
        },
        {
          p:[{x:100-50*Math.sqrt(2),y:150+50*Math.sqrt(2)},{x:100+50*Math.sqrt(2),y:150+50*Math.sqrt(2)},{x:100,y:150+100*Math.sqrt(2)}],
          color:"#FFCCFF"},
        {
          p:[{x:150,y:100+100*Math.sqrt(2)},{x:150,y:300+100*Math.sqrt(2)},{x:50,y:200+100*Math.sqrt(2)}],
          color:"#CCFFFF"
        },
        {
          p:[{x:50,y:100+100*Math.sqrt(2)},{x:100,y:150+100*Math.sqrt(2)},{x:50,y:200+100*Math.sqrt(2)}],
          color:"#99CCCC"
        },
        {
          p:[{x:50,y:200+100*Math.sqrt(2)},{x:100,y:250+100*Math.sqrt(2)},{x:50,y:300+100*Math.sqrt(2)}],
          color:"#CCCCFF"
        },
       {
          p:[{x:100,y:250+100*Math.sqrt(2)},{x:200,y:350+100*Math.sqrt(2)},{x:0,y:350+100*Math.sqrt(2)}],
          color:"#FFCCCC"
        },
    ];

  window.onload = function(){
    /*三角形*/
    var canvas0 = document.getElementById('canvas0');
    var context0 = canvas0.getContext('2d');

    context0.moveTo(60,160); //笔尖放在（100,100）
    context0.lineTo(190,190); //从（100,100）绘制到（700,700），以上操作，都为意图绘制并未开始画

    context0.lineWidth =2 ; //粗细
    context0.strokeStyle = '#005588';//颜色
    context0.stroke(); //绘制线条*/

    context0.beginPath();
    context0.moveTo(0,0); //笔尖放在（100,100）
    context0.lineTo(100,100); //从（100,100）绘制到（700,700），以上操作，都为意图绘制并未开始画
    context0.lineTo(0,100);
    context0.lineTo(0,0); 

    context0.fillStyle ='#66cc99';
    context0.fill(); 

    /*弧线、圆*/
    var canvas00 = document.getElementById('canvas00');
    var context00 = canvas00.getContext('2d');
    context00.lineWidth =2 ;
    context00.strokeStyle = '#005588';
    context00.arc(100,100,50,0,1.5*Math.PI); //arc()状态，以(100,100)为圆心，以50为半径，从0至1.5PI顺时针绘制（默认顺时针false）
    context00.stroke();

    /*七巧板-1*/
    var canvas1 = document.getElementById('canvas1');
    var context = canvas1.getContext('2d');

    for(var i=0;i<tangram1.length;i++){
      draw(tangram1[i].p,tangram1[i].color);
    }

    /*七巧板-2*/
    var canvas2 = document.getElementById('canvas2');
    var context = canvas2.getContext('2d');

    for(var i=0;i<tangram2.length;i++){
      draw(tangram2[i].p,tangram2[i].color);
    }

    function draw(point,color){
      context.beginPath();
      context.moveTo(point[0].x,point[0].y);
      for(var i=1;i<point.length;i++){
        context.lineTo(point[i].x,point[i].y);
      }
      context.lineTo(point[0].x,point[0].y); //闭合，有context.closePath();不要也可以
      context.fillStyle = color;
      //context.closePath();
      context.fill();
      context.stroke();

    }

  }
	var canvas=$('#canvas').get(0);
	var ctx=canvas.getContext('2d');
	var ctx=canvas.getContext('2d');
	var kuang=600;
	var row=15;
	var ju=kuang/row;
	// console.log(row)
	var hang=kuang-ju
	var xiaojianju=ju/2+0.5;

	var audio1=$('#audio1').get(0);
	var audio2=$('#audio2').get(0);
function gobang(){


		ctx.save();
		ctx.beginPath();

		ctx.translate(xiaojianju,xiaojianju);


		for(var i=0;i<row;i++){
			ctx.moveTo(0,0);
			ctx.lineTo(0,hang);
			ctx.translate(ju,0);
			ctx.strokeStyle = "#BA5605";
		}
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		ctx.save();
		ctx.beginPath();

		ctx.translate(xiaojianju,xiaojianju);


		for(var i=0;i<row;i++){
			ctx.moveTo(0,0);
			ctx.lineTo(hang,0);
			ctx.translate(0,ju);
			ctx.strokeStyle = "#BA5605";
		}
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		var points=[3.5*ju+0.5,11.5*ju+0.5]
		for(var i=0;i<2;i++){
			for(var j=0;j<2;j++){
				x=points[i];
				y=points[j];
				// console.log(x,y)

				ctx.save();
				ctx.beginPath();
				ctx.translate(x,y);
				ctx.arc(0,0,3,0,(Math.PI/180)*360)
				ctx.fill();
				ctx.closePath();
				ctx.restore();

			}
		}
		ctx.save();
		ctx.beginPath();
		ctx.translate(7.5*ju+0.5,7.5*ju+0.5);
		ctx.arc(0,0,3,0,(Math.PI/180)*360)
		ctx.fill();
		ctx.closePath();
		ctx.restore();}
		gobang();
		

function draw(qio){

			ctx.save();
			ctx.beginPath();
			ctx.translate((qio.x+0.5)*ju,(qio.y+0.5)*ju);
			ctx.arc(0,0,15,0,(Math.PI/180)*360)
			if(qio.color === 1){
				var rd = ctx.createRadialGradient(-1,-2,2,0,0,8);
				rd.addColorStop(0,'#87868B')
				rd.addColorStop(0.1,'#625950')
				rd.addColorStop(1,'#161207')
				ctx.fillStyle=rd
				$('#audio1').get(0).play()
			}else if(qio.color === 0){

				var rd = ctx.createRadialGradient(-1,-2,2,0,0,8);
				rd.addColorStop(0,'#D1CAC0')
				rd.addColorStop(0.1,'#F4F4E4')
				rd.addColorStop(1,'#DAE5E7')
				ctx.fillStyle=rd
				
				$('#audio2').get(0).play()
			}
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}





		var kaiguan=true;
		var step=1;
		var qizi={};

$('#canvas').on('click',function(e){
      
				var x=Math.floor(e.offsetX/ju)
				var y=Math.floor(e.offsetY/ju)
				if(qizi[x+'-'+y]){return}

				if(kaiguan){
					var qio={x:x,y:y,color:1,step:step++}
					audio1.play();
					draw(qio);
					qizi[x+'-'+y]=qio;
					if( panduan(qio) ){
						$('.cartel').show();
						$('.sspan').html('黑棋获胜')
						        // alert();
						      return;
						      };
						
						kaiguan=false;
						// console.log(step)
					}else{
						var qio={x:x,y:y,color:0,step:step++}
						draw(qio);
						qizi[x+'-'+y]=qio;
						if( panduan(qio) ){
							$('.cartel').show();
							$('.sspan').html('白棋获胜')
						        // alert('白棋获胜');
						      return;
						      };
						audio2.play();
						kaiguan=true;
						// console.log(step)
					}
				
	
				})
		// panduan();


function panduan(qio){

			var shuju={};
			$.each(qizi,function(k,v){
				if(v.color===qio.color){
					shuju[k]=v
					console.log(v)
				}
			})
			var shu = 1,hang=1,zuoxie=1,youxie=1;
			var tx,ty;
			tx=qio.x;ty=qio.y;
			// 1
			while(shuju[tx+'-'+(ty+1)]){
				shu++;ty++;
			}
			tx = qio.x; ty = qio.y;
			while ( shuju [ tx + '-' + (ty - 1) ]){
				shu ++; ty--;
			}
			// 2

			tx = qio.x ; ty = qio.y;
			while( shuju[ (tx+1) + '-' + ty ] ){
				hang++;tx++;
			}
			tx = qio.x ; ty = qio.y;
			while( shuju[ (tx-1) + '-' + ty ] ){
				hang++;tx--;
			}

			tx = qio.x; ty = qio.y;
			while( shuju[ (tx-1) + '-' + (ty-1) ] ){
				zuoxie++;tx--;ty--;
			}
			tx = qio.x ; ty = qio.y;
			while( shuju[ (tx+1) + '-' + (ty+1) ] ){
				zuoxie++;tx++;ty++;
			}

			tx =qio.x ; ty = qio.y;
			while( shuju[ (tx+1) + '-' + (ty-1) ] ){
				youxie++;tx++;ty--;
			}
			tx = qio.x ; ty = qio.y;
			while( shuju[ (tx-1) + '-' + (ty+1) ] ){
				youxie++;tx--;ty++;
			}
			if( shu >=5  || hang>=5 || zuoxie>=5 || youxie>=5){
				return true;
			}
		}

$('#tips span:nth-child(3)').on('click',function(){
	$('.cartel').hide();
    ctx.save();  
    ctx.font = "15px consolas";
    for( var i in qizi){
      if( qizi[i].color === 1){
          ctx.fillStyle = 'red';
      }else{
        ctx.fillStyle = 'blue';
      }
      ctx.textBaseline = "middle"
      ctx.textAlign ="center";
        ctx.fillText(qizi[i].step,
          (qizi[i].x+0.5)*ju,
          (qizi[i].y+0.5)*ju);
      
    }
    ctx.restore();
    var image = $('#canvas').get(0).toDataURL('image/png',1);
    $('.image').attr('href',image);
    $('.image').attr('download','qipu.png');

})
$('.cartel').on('click',function(){
	$('.cartel').hide();
   ctx.clearRect(0,0,600,600);
   gobang();
   var qio={x:x,y:y,color:1,step:step++}
	draw(qio);
    kaiguan = true;
    qizi = {};
    step = 1;
})
$('#tips').on('click',function(e){
e.stopPropagation();
})
$('#tips span:nth-child(2)').on('click',function(){
  $('.cartel').hide();
   ctx.clearRect(0,0,600,600);
   gobang();
   var qio={x:x,y:y,color:1,step:step++}
	draw(qio);
    kaiguan = true;
    qizi = {};
    step = 1;

})

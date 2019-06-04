window.onload = async function() {
	var stageTitle = getURLParameter('stagetitle');
	var areaNum = getAreaByStageTitle(stageTitle);

	var stageLoadData = loadStageData(stageTitle);
	var enemyIMGData = loadEnemyIMGData();
	drawPage(await stageLoadData, await enemyIMGData);
	
	$('.carousel-indicators').on('click', '.carousel-indicator', async function(e) {
		changeWave(Number(e.currentTarget.hash.slice(5)), (await stageLoadData).stageData.wave.length);
		e.preventDefault();
	});
	$('.carousel-control').on('click', async function(e) {
		changeWave(Number(e.currentTarget.hash.slice(5)), (await stageLoadData).stageData.wave.length);
		e.preventDefault();
	});
};

function drawPage(stageLoadData, imgData)
{
	var stageData = stageLoadData.stageData;
	var stageLength = stageLoadData.stageLength;
	document.title = stageData.title+' 스테이지 정보';
	$("a.btn-back").attr("href", "area.html?areanum="+getAreaByStageTitle(stageData.title));
	$('#stage-title').html(stageData.title+' 스테이지');
	$(".stage-control.control-left").attr("href", "stage.html?stagetitle="+getAreaByStageTitle(stageData.title)+"-"+(getIndexByStageTitle(stageData.title)-1));
	$(".stage-control.control-right").attr("href", "stage.html?stagetitle="+getAreaByStageTitle(stageData.title)+"-"+(getIndexByStageTitle(stageData.title)+1));
	if(getIndexByStageTitle(stageData.title)==1)
	{
		$(".stage-control.control-left").addClass("control-end");
	}
	if(getIndexByStageTitle(stageData.title)==stageLength)
	{
		$(".stage-control.control-right").addClass("control-end");
	}
    for(var i = 0; i < stageData.wave.length; i++)
	{
		$('.carousel-indicator').first().clone().appendTo('.carousel-indicators');
		$('.carousel-indicator').last().attr('href', '#wave'+i);
		
		$('.carousel-slide').first().clone().appendTo('.carousel-track');
		
		
		for(var j=0;j<stageData.wave[i].enemy.length;j++)
		{
			for(var k=0;k<stageData.wave[i].enemy[j].pos.length;k++)
			{
				var pos = stageData.wave[i].enemy[j].pos[k];
			    var row=3-parseInt((pos-1)/3);
			    var column=pos-parseInt((pos-1)/3)*3;
			    var enemyName=stageData.wave[i].enemy[j].name;
			    var enemyIMGData=imgData.filter(obj => obj.name==enemyName);
			    $('div:nth-of-type('+((row-1)*3+column)+')', '.carousel-slide:last-child > .wave-grid').html('<a href=\"javascript:show_enemy(\''+stageData.title+'\', '+i+', '+j+')\"><img src=\"images/profile/'+enemyIMGData[0].img+'.png\" /><p>'+enemyName+'</p></a>');
			}
		}
    }
    
    $('.carousel-indicator').first().remove();
    $('.carousel-slide').first().remove();
    
    changeWave(0, stageData.wave.length)
}

function changeWave(index, length)
{
	$('.carousel-slide-active').removeClass('carousel-slide-active');
	$('.carousel-slide').eq(index).addClass('carousel-slide-active');
	$('.carousel-indicator-active').removeClass('carousel-indicator-active');
	$('.carousel-indicator').eq(index).addClass('carousel-indicator-active');
	$('.carousel-control.control-end').removeClass('control-end');
	$('.carousel-control.control-left').attr("href", "#wave"+(index-1));
	$('.carousel-control.control-right').attr("href", "#wave"+(index+1));
	if($('.carousel-control.control-left').attr("href")=="#wave-1")
	{
		$('.carousel-control.control-left').addClass("control-end");
	}
	if($('.carousel-control.control-right').attr("href")=="#wave"+length)
	{
		$('.carousel-control.control-right').addClass("control-end");
	}
	
	$('.carousel-track').css("transform", "translateX("+(-100*index)+"%)");
}

function show_enemy(stage, wave, enemy) {
    var popupX = (window.screen.width / 2) - (540 / 2);
    var popupY= (window.screen.height /2) - (450 / 2);
    window.open('enemy.html?stage='+stage+'&wave='+wave+'&enemy='+enemy, "popup_enemy", 'status=no, height=450, width=540, left='+ popupX + ', top='+ popupY + ', screenX='+ popupX + ', screenY= '+ popupY);
}
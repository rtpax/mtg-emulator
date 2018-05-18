var pageid=[];
idcounter = 0;//TODO: set value with php script from file, load every time it updates
//all lower arrays indexed by pageid rather than standard indices
//if loop needed, for(...)zIndex[pageid[n]];
//pageid = ['card1','card2','card3',...,'cardn']; (not necessarily in order or hitting every number
var multiverseid=[];
var xLoc=[];//in % of width to preserve across different browser sizes (prevent drift by never converting back except to drag)
var yLoc=[];//----^
var angle=[];//0 - 90 - 180 - 270 (flipped 180 across u1/u2)
var faceUp=[];//boolean true or false;
var zIndex=[];
var counterTexts=[];//array of arrays, last in line when formatted to allow variable length
var zone=[];//zone is a string containing "graveyard", "hand", "battlefield", or "undefined"
            //note that exiled is intentionally not included as it's unnecessary -- just "battlefield"
            //note deck is note defined, only a member in a list
var middrag=[];//corallory - inaccessable
var remove=[];  //signal to other page to remove the specified card. When it's removed on the other page, it can be removed here
                //if recieved, remove immediately
//NOTE: all numerical values are NOT string representations above

var inp_pageid=[];
var inp_idcounter = 0;
var inp_multiverseid=[];
var inp_xLoc=[];
var inp_yLoc=[];
var inp_angle=[];
var inp_faceUp=[];
var inp_zIndex=[];
var inp_counterTexts=[];/
var inp_zone=[];
var inp_middrag=[];
var inp_remove=[];

function updatePage()
{
    var cur;
    for(var n=0;n<pageid.length;n++)
    {
        cur=document.getElementById(inp_pageid[n]);
        if(cur===null)
        {
            createCard(n);
            addCounter(pageid[n],a,counterTexts[inp_pageid[n]][a]);
        }
        else
        {
            for(var a=0;a<counterTexts[inp_pageid[n]].length;a++)
                if(counterTexts[inp_pageid[n]][a] !== counterTexts[inp_pageid[n]][a])
                  setCounter(pageid[n],a,counterTexts[inp_pageid[n]][a]);
            if(multiverseid[inp_pageid[n]][a] !== multiverseid[inp_pageid[n]][a])
                  setMultiverseid(
        }
    }
}

function createCard(index)
{
    cid=pageid[index];
    var card = document.createElement('div');
    card.setAttribute("id",cid);
    card.setAttribute("data-draggable","true");
    card.setAttribute("onmouseover","setBigImg(this)");
    card.style='background-image:url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiverseid[cid]+'&type=card");';
    card.innerHTML='';
    for(var c=0;c<counterTexts[cid].length;c++)
    {
        card.innerHTML+='<div class="counter" style="top: ' +(20*c)+ '%;"><div class="countertext" contenteditable="true">' +counterTexts[cid][c]+ '</div><div onclick="removeCounter(this)" class="counterbutton"></div></div>';//TODO create removeCounter

    }
    card.innnerHTML+='<button class="counter" style="height: 10%; color: white; top: ' +(20*counterTexts[cid].length)+ '%;" onclick="addCounter(this)">Add counter</button>';

}

function setBigImg(inputNode)
{
    document.getElementById("bigImg").setAttribute("src",inputNode.style.backgroundImage.slice(4, -1).replace(/["|']/g, ""));
}


window.onload = function(){
    window.addEventListener('mouseup', mouseUp, false);
}

var x_pos = 0,
  y_pos = 0;
var curDragNode;

function addListener(dragNode) {
    dragNode.addEventListener('mousedown', mouseDown, false);
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
    middrag[div.id] = false;
}

function mouseDown(e) {

    var div = e.target;

    if(div.getAttribute("data-draggable")!='true')
    {
        if(div.parentNode.getAttribute("data-draggable")=='true')
        {
            div=div.parentNode;
        }
        else
        {
            return;
        }
    }

    x_pos = e.clientX - div.offsetLeft;
    y_pos = e.clientY - div.offsetTop;
    curDragNode = div;
    middrag[div.id] = true;
    bringToTop(div.id);
    window.addEventListener('mousemove', divMove, true);

}

function divMove(e) {
    var div = curDragNode;
    div.style.position = 'absolute';
    div.style.top = (e.clientY - y_pos) + 'px';
    div.style.left = (e.clientX - x_pos) + 'px';
    xLoc[div.id] = e.clientX/window.innerWidth;
    yLoc[div.id] = e.clientY/window.innerHeight;
}

function bringToTop(index)
{
    var temp=pageid;
    var highest = 0;
    for(var n=0;n<pageid.length;n++)
    {
        if(zIndex[pageid[n]]>highest)
            highest=zIndex[pageid[n]];
    }
    zIndex[index]=highest+1;
    temp.sort(function(a, b){return zIndex[a] - zIndex[b]});
    for(var n=0;n<pageid.length;n++)
    {
        zIndex[temp[n]] = n;
    }
    applyZIndex();//TODO create applyZIndex
}
window.onload = function(){
    window.addEventListener('mouseup', mouseUp, false);
    }
var x_pos = 0,
  y_pos = 0;
var curDragNode;

function addListener(dragNode) {
  dragNode.addEventListener('mousedown', mouseDown, false);
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
    middrag[curdragNode.id]=false;
}

function mouseDown(e) {

  var div = e.target;
  if(div.getAttribute("data-draggable")!='true')
  {
    if(div.parentNode.getAttribute("data-draggable")=='true')
    {
      div=div.parentNode;
    }
    else
    {
      return;
    }
  }
  x_pos = e.clientX - div.offsetLeft;
  y_pos = e.clientY - div.offsetTop;
  curDragNode = div;
  div.style.zIndex='5';
  window.addEventListener('mousemove', divMove, true);

}

function divMove(e) {
  var div = curDragNode;
  div.style.position = 'absolute';
  div.style.top = (e.clientY - y_pos) + 'px';
  div.style.left = (e.clientX - x_pos) + 'px';
  middrag[div.id] = true;
  xLoc[div.id] = parseInt(div.style.top)/window.innerWidth;
  yLoc[div.id] = parseInt(div.style.top)/window.innerHeight;
}

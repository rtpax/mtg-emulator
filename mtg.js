var pageid=[];
idcounter = 0;//TODO: set value with php script from file, load every time it updates
//all lower arrays indexed by pageid rather than standard indices
//if loop needed, for(...)zIndex[pageid[n]];
//pageid = ['card1','card2','card3',....'cardn'];
var multiverseid=[];
var xLoc=[];//in % of width to preserve across different browser sizes (prevent drift by never converting back except to drag)
var yLoc=[];//----^
var angle=[];//0 - 90 - 180 - 270 (flipped 180 across u1/u2)
var faceUp=[];//boolean true or false;
var zIndex=[];
var counterTexts=[];//array of arrays, last in line when formatted to allow variable length
var zone=[];//zone is a string containing "graveyard", "deck", "hand", "battlefield", or "undefined"
            //note that exiled is intentionally not included as it's unnecessary -- just "battlefield"
//NOTE: all numerical values are NOT string representations above




var deck1 = [48438,12345,2282,1234,125,6536,2345,423453];
var deck2 = [];

function shuffle(deck)
{
    var ret=[];
    var index;
    for(var i=0;deck.length>0;i++)
    {
        index = Math.getRandomInt(0,deck.length);
        ret[i]=deck[index];
        deck.splice(index,1);
    }
    return ret;
}

//fragile, handle with care
function bringToTop(targetId)
{
    var basez = zIndex[targetId];
    var greatest = 0;
    for(var n=0;n<pageid.length;n++)
    {
        if(pageid[n]==targetId)continue;
        if(zIndex[pageid[n]]>basez)
            zIndex[pageid[n]]--;
        if(zIndex[pageid[n]]>greatest)
            greatest = zIndex[pageid[n]];
    }
}


function addCounter(inputNode)
{

  var nodeList = inputNode.parentNode.childNodes;
  var highest='0';
  for(var n=0;n<nodeList.length;n++)
  {

  	if(nodeList[n].nodeType == Node.ELEMENT_NODE && parseInt(nodeList[n].style.top) > parseInt(highest))
    {
        highest = ''+parseInt(nodeList[n].style.top);
    }
  }
  var newCounter = document.createElement('div');
  inputNode.parentNode.appendChild(newCounter);
  newCounter.className = 'counter';
  newCounter.style.top = highest+'%';
  inputNode.style.top = ''+(parseInt(highest) + 20)+'%';
  var newCounterText = document.createElement('div');
  newCounter.appendChild(newCounterText);
  newCounterText.className = 'countertext';
  newCounterText.setAttribute('contenteditable','true');
  //newCounterText.innerHTML = '+1/+1: 0'
  var newCounterX = document.createElement('div');
  newCounter.appendChild(newCounterX);
  newCounterX.setAttribute('onclick','removeCounter(this)')
  newCounterX.className = 'counterbutton';
}

function removeCounter(inputNode)
{
    var nodeList = inputNode.parentNode.parentNode.childNodes;
    var top = parseInt(inputNode.parentNode.style.top);
    inputNode.parentNode.parentNode.removeChild(inputNode.parentNode);
    for(var n=0;n<nodeList.length;n++)
    {
        if(nodeList[n].nodeType == Node.ELEMENT_NODE && parseInt(nodeList[n].style.top) > top)
            nodeList[n].style.top = '' + (parseInt(nodeList[n].style.top) - 20)+'%';
    }
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
    if(curDragNode!=null)curDragNode.style.zIndex='0';
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
}

function setBigImg(inputNode)
{
    document.getElementById("bigImg").setAttribute("src",inputNode.style.backgroundImage.slice(4, -1).replace(/["|']/g, ""));
}


/*
<div id="card3" class="card" data-draggable="true" style='background-image:url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=2282&type=card);' onmouseover='setBigImg(this)'>
  <button class="counter" style = 'height:10%;color:white;top:0px;z-index:5' onclick='addCounter(this)'>
    Add counter
  </button>
</div>
*/
function createCard(wizardsID)
{
    var card = document.createElement('div');
    card.setAttribute("class","card");
    card.setAttribute("data-draggable","true");
    card.setAttribute("onmouseover","setBigImg(this)");
    card.style='background-image:url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+wizardsID+'&type=card");';
    card.innerHTML = '<button class="counter" style = "height:10%;color:white;top:0;z-index:5" onclick="addCounter(this)">Add counter</button>';
    document.body.appendChild(card);
    addListener(card);
    card.style.bottom='5';

    if(deck1.length == 1)
    {
        document.getElementById("deck").setAttribute("src","./xback.jpg");
        document.getElementById("deck").setAttribute("onclick","");
    }

}

var xhr = new XMLHttpRequest();

function senddata(input)
{
  xhr.open("post","./u1.php", true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send("data="+encodeURIComponent(input));
}

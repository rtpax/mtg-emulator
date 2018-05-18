//#apply
function applyZIndex()
{
    for(var i=0;i<pageid.length;i++)
    {
        get(pageid[i]).style.zIndex = zIndex[pageid[i]];
    }
}

function applyVisibility()
{
    for(var i=0;i<pageid.length;i++)
        get(pageid[i]).style.visibility = visibility[pageid[i]];
}

function applyLoc()
{
    var card;
    for(var i=0;i<pageid.length;i++)
    {
        card = get(pageid[i]);
        card.style.top = yLoc[pageid[i]]*window.innerHeight;
        card.style.left = xLoc[pageid[i]]*window.innerWidth;
    }
}

//#apply one
function applyOneVisibility(id)
{
    get(id).style.visibility = visibility[id];
}

function applyOneLoc(id)
{
    var card = get(pageid[i]);
    card.style.top = yLoc[pageid[i]]*window.innerHeight;
    card.style.left = xLoc[pageid[i]]*window.innerWidth;

}

function applyOneFlip(id)
{
    console.log(id+": "+get(id).style.backgroundImage);
    get(id).style.backgroundImage = flipped[id] ? 'url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card")' : 'url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiverseid[id]+'&type=card")';
}

function applyOneAngle(id)
{
    console.log(get(id).style.transform + ' -> ' + angle[id]);
    get(id).style.transform = 'rotate('+angle[id]+'deg)';
}

//#setters
function show(id)
{
    visibility[id]='visible';
    applyOneVisibility(id);
}

function hide(id)
{
    visibility[id]='hidden';
    applyOneVisibility(id);
}

function bringToTop(targetId)
{
    var greatest = 0;


    for(var i=0;i<pageid.length;i++)
    {
        if(zIndex[pageid[i]]>greatest)
            greatest = zIndex[pageid[i]];
    }
    zIndex[targetId]=greatest+1;

    var newz=pageid;
    newz.sort(function(a,b){
        return zIndex[a]-zIndex[b];
    });
    for(var i=0;i<newz.length;i++)
    {
        zIndex[newz[i]]=i;
    }

    applyZIndex();
}


function move(id, x, y)
{
    xLoc[id] = x/(window.innerWidth - 215);
    yLoc[id] = y/(window.innerHeight - 215);
}

function xPos(id)
{
    return xLoc[id]*(window.innerWidth - 215);
}

function yPos(id)
{
    return yLoc[id]*(window.innerWidth - 215);
}

function flip(id)
{
    flipped[id]=!flipped[id];
    applyOneFlip(id);
}

function untap(id)
{
    angle[id] += 270;
    angle[id] %= 360;
    applyOneAngle(id);
}

function tap(id)
{
    angle[id] += 90;
    angle[id] %= 360;
    applyOneAngle(id);
}



//#misc
function addCounter(inputNode)
{

  var nodeList = inputNode.parentNode.childNodes;
  var highest='0';
  for(var n=0;n<nodeList.length;n++)
  {

  	if(nodeList[n].nodeType == Node.ELEMENT_NODE && parseInt(nodeList[n].style.top) > parseInt(highest) && nodeList[n].className == "counter")
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
        if(nodeList[n].nodeType == Node.ELEMENT_NODE && parseInt(nodeList[n].style.top) > top && nodeList[n].className == 'counter')
            nodeList[n].style.top = '' + (parseInt(nodeList[n].style.top) - 20)+'%';
    }
}



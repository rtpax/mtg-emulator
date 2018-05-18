var pageid=[];

var multiverseid=[];//[int]

var visibility=[];//["visible" or "hidden"]//not sent, implied from zone
var xLoc=[];//[float]
var yLoc=[];//[float]
var zIndex=[];//[int]
var locked=[];//data that is recieved and not sent, locks out this user
var newdata=[];//[int]

var zone=[]//["hand1/hand2" or "deck1/deck2" or "grave1/grave2" or "field"]
var flipped=[];//[bool]
var angle=[];//[0 or 90 or 180 or 270]

var lock=[];

var newz=false;
var newd1=false;
var newd2=false;
var newh1=false;
var newh2=false;
var newg1=false;
var newg2=false;

function onWindowResize()
{
    var card;
    var div = get("hand1");
    var spacing = min((window.innerWidth - 215 - 100 - 5)/(hand1.length - 1), 110);
    for(var i=0;i<hand1.length;i++)
    {
        card = get(hand1[i]);

        zIndex[card.id]=i + 1000;
        visibility[card.id]=div.style.visibility;
        move(card.id, 5 + spacing*i, window.innerHeight - 5 - card.offsetHeight);
    }
    div = get("hand2");
    spacing = min((window.innerWidth - 215 - 100 - 5)/(hand2.length - 1), 110);
    for(var i=0;i<hand2.length;i++)
    {
        card = get(hand2[i]);

        zIndex[card.id]=i + 1000;
        visibility[card.id]=div.style.visibility;
        move(card.id, 5 + spacing*i, 5);
    }
    applyLoc();
}


window.onload = function(){
    window.addEventListener('mouseup', mouseUp, false);
    window.addEventListener('resize', onWindowResize, false);

    _init();
}

var x_pos = 0, y_pos = 0;
var curDragNode;

function addListener(dragNode) {
  dragNode.addEventListener('mousedown', mouseDown, false);
}

function mouseUp(e) {
    window.removeEventListener('mousemove', divMove, true);

    if(get("hand1").style.visibility == 'visible')
    {
        hand1.sort(function(a,b){return xLoc[a]-xLoc[b];});
        refreshHand1();

    }
    if(get("hand2").style.visibility == 'visible')
    {
        hand2.sort(function(a,b){return xLoc[a]-xLoc[b];});
        refreshHand2();
    }

    if(curDragNode != null)
    {
        if(overLow(e,get("hand1spoiler")))
            attachHand1(curDragNode.id);
        else if(overHigh(e,get("hand2spoiler")))
            attachHand2(curDragNode.id);
        else if(overLow(e,get("deck1")))
            attachDeck1(curDragNode.id);
        else if(overHigh(e,get("deck2")))
            attachDeck2(curDragNode.id);
        else if(overLow(e,get("grave1")))
            attachGrave1(curDragNode.id);
        else if(overHigh(e,get("grave2")))
            attachGrave2(curDragNode.id);



    }

    curDragNode = null;
}

function overHigh(e,div)
{
    //console.log(div.id+': '+(div.offsetLeft+div.parentNode.offsetLeft)+' < '+e.clientX+' && '+e.clientX+' < '+(div.offsetLeft+div.parentNode.offsetLeft+div.offsetWidth)+' && '+e.clientY+' > '+div.offsetTop);
    if(div.offsetLeft+div.parentNode.offsetLeft < e.clientX && e.clientX < div.offsetLeft+div.parentNode.offsetLeft+div.offsetWidth
        && e.clientY < div.offsetHeight){
        return true;
    }
    else
    {
        return false;
    }

}

function overLow(e,div)
{
    //console.log(div.id+': '+(div.offsetLeft+div.parentNode.offsetLeft)+' < '+e.clientX+' && '+e.clientX+' < '+(div.offsetLeft+div.parentNode.offsetLeft+div.offsetWidth)+' && '+e.clientY+' > '+div.offsetTop);
    if(div.offsetLeft+div.parentNode.offsetLeft < e.clientX && e.clientX < div.offsetLeft+div.parentNode.offsetLeft+div.offsetWidth
        && e.clientY > div.offsetTop){
        return true;
    }
    else
    {
        return false;
    }

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
  window.addEventListener('mousemove', divMove, true);

  bringToTop(div.id);
}

function divMove(e) {
  var div = curDragNode;
  div.style.position = 'absolute';
  div.style.top = (e.clientY - y_pos) + 'px';
  div.style.left = (e.clientX - x_pos) + 'px';
  move(div.id, e.clientX - x_pos, e.clientY - y_pos);
  hideHand1(e);
  hideHand2(e);
}

function setBigImg(inputNode)
{
    document.getElementById("bigImg").setAttribute("src",inputNode.style.backgroundImage.slice(4, -1).replace(/["|']/g, ""));
}


/*
<div id="card3" class="card" data-draggable="true" style='background-image:url(http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=2282&type=card);' onmouseover='setBigImg(this)'>
  <button class="counter" style = 'height:10%;color:white;top:0px;' onclick='addCounter(this)'>
    Add counter
  </button>
</div>
*/
function createCard(wizardsID)
{
    var i;
    for(i=1;i<=1000;i++)
    {
        if(document.getElementById('card'+i) === null)
            break;
    }
    if(i==1001)
        return null;
    return createCardWID(wizardsID,'card'+i);
}

function createCardWID(wizardsID, id)
{
    var card = document.createElement('div');
    card.id = pageid[pageid.length] = id;

    visibility[id] = 'visible';
    xLoc[id] = 0;
    yLoc[id] = 0;
    zIndex[id] = 0;
    angle[id] = 0;
    multiverseid[id] = wizardsID;
    newdata[id] = 0;


    card.setAttribute("class","card");
    card.setAttribute("data-draggable","true");
    card.setAttribute("onmouseover","setBigImg(this)");
    card.style='background-image:url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+wizardsID+'&type=card");transform:rotate(0deg);';
    card.innerHTML = '<button class="counter" style = "height:10%;color:white;top:0;" onclick="addCounter(this)">Add counter</button>';
    card.innerHTML += '<div class="taps" style="height:10%;bottom:0;top:90%">'+
        '<img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card" style="position:absolute;height:10;width:7;left:10;top:2" onclick="flip(this.parentNode.parentNode.id)">'+
        '<img src="../img/untap.png" style="position:absolute;height:10;width:10;left:35;top:2" onclick="untap(this.parentNode.parentNode.id)">'+
        '<img src="../img/tap.png" style="position:absolute;height:10;width:10;left:55;top:2" onclick="tap(this.parentNode.parentNode.id)">'+
        '</div>';
    document.body.appendChild(card);
    addListener(card);


    //bringToTop(inpId);
    return card;
}

function attachField(id)
{
    var card = get(id);
    card.parentNode.removeChild(card);
    document.body.appendChild(card);

    setVisibility(id,'visible');
    zone[id] = 'field';
    newdata[id] = true;


    card.setAttribute("class","card");
    card.setAttribute("data-draggable","true");
    card.setAttribute("onmouseover","setBigImg(this)");
    card.style='background-image:url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiverseid[id]+'&type=card");transform:rotate(0deg);';
    card.innerHTML = '<button class="counter" style = "height:10%;color:white;top:0;" onclick="addCounter(this)">Add counter</button>';
    card.innerHTML += '<div class="taps" style="height:10%;bottom:0;top:90%">'+
        '<img src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card" style="position:absolute;height:10;width:7;left:10;top:2" onclick="flip(this.parentNode.parentNode.id)">'+
        '<img src="../img/untap.png" style="position:absolute;height:10;width:10;left:35;top:2" onclick="untap(this.parentNode.parentNode.id)">'+
        '<img src="../img/tap.png" style="position:absolute;height:10;width:10;left:55;top:2" onclick="tap(this.parentNode.parentNode.id)">'+
        '</div>';

    addListener(card);


    //bringToTop(inpId);
    return card;
}

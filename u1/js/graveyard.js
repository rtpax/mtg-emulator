





var grave1=[];
var grave2=[];








function attachGrave1(id)
{
    newg1=2;
    grave1[grave1.length] = id;
    zone[id]='grave1';
    hide(id);
    applyOneVisibility(id);
    get("grave1").style.backgroundImage = get(id).style.backgroundImage;
}

function attachGrave2(id)
{
    newg2=2;
    grave2[grave2.length] = id;
    zone[id]='grave2';
    hide(id);
    applyOneVisibility(id);
    get("grave2").style.backgroundImage = get(id).style.backgroundImage;
}

function removeGrave1(id)
{
    grave1.splice(grave1.indexOf(id),1);
}

function removeGrave2(id)
{
    grave2.splice(grave2.indexOf(id),1);
}


function openGrave1Interface()
{
    closeAllInterface();
    get("grave1Interface").style.visibility = 'visible';
    g1window = get("g1window");
    for(var i=0;i<grave1.length;i++)
    {
        g1window.innerHTML += '<img style="position:static;background-image:url(\'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiverseid[grave1[i]]+'&type=card\');transform:rotate(0deg);" class="card" onclick="removeGrave1(\''+grave1[i]+'\');attachHand1(\''+grave1[i]+'\');this.parentNode.removeChild(this)" onmouseover="setBigImg(this)"></img>';
    }
}

function openGrave2Interface()
{
    closeAllInterface();
    get("grave2Interface").style.visibility = 'visible';
    g2window = get("g2window")
    for(var i=0;i<grave2.length;i++)
    {
        g2window.innerHTML += '<img style="position:static;background-image:url(\'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiverseid[grave2[i]]+'&type=card\');transform:rotate(0deg);" class="card" onclick="removeGrave2(\''+grave2[i]+'\');attachHand2(\''+grave2[i]+'\');this.parentNode.removeChild(this)" onmouseover="setBigImg(this)"></img>';
    }
}

function closeGrave1Interface()
{
    get("grave1Interface").style.visibility = 'hidden';
    get("g1window").innerHTML = '';
}

function closeGrave2Interface()
{
    get("grave2Interface").style.visibility = 'hidden';
    get("g2window").innerHTML = '';
}

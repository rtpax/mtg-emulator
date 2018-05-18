





var grave1=[];
var grave2=[];








function attachGrave1(id)
{
    grave1[grave1.length] = id;
    zone[id]='grave1';
    hide(id);
    applyOneVisibility(id);
    get("grave1").style.backgroundImage = get(id).style.backgroundImage;
}

function attachGrave2(id)
{
    grave2[grave2.length] = id;
    zone[id]='grave2';
    hide(id);
    applyOneVisibility(id);
    get("grave2").style.backgroundImage = get(id).style.backgroundImage;
}


function graveInterface1(){/*TODO*/}
function graveInterface2(){/*TODO*/}

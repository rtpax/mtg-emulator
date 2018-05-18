var xhr = new XMLHttpRequest();


function _send(data)
{
    xhr.open("post","./u1.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("type=send&data="+encodeURIComponent(data));
}

function _init()
{
    xhr.open("post","./u1.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("type=init");
}

function _exchange()
{
    xhr.open("post","./u1.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "type=exchange&";
    for(var i=0;i<pageid.length;i++)
    {
        data+="id["+i+"]="+pageid[i]+"&z["+i+"]="+zIndex[pageid[i]]+"&x["+i+"]="+xLoc[pageid[i]]+"&y["+i+"]="+yLoc[pageid[i]]+"&mid["+i+"]="+multiverseid[pageid[i]]+"&v["+i+"]="+visibility[pageid[i]]+"&newLoc["+i+"]="+newLoc[pageid[i]]+"&";
    }

    xhr.send("type=exchange")
}

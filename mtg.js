xhr = new XMLHttpRequest();

function start(deck1,deck2)
{
    xhr.open('post','./loadDecks.php');
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("deck1="+encodeURIComponent(deck1)+"&deck2="+encodeURIComponent(deck2));
}

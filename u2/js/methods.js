function spliceStr(str, index, count, add) {
  var ar = str.split('');
  ar.splice(index, count, add);
  return ar.join('');
}

function get(id)
{
    return document.getElementById(id);
}

function closeAllInterface()
{
    closeDeck2Interface();
    closeSearchDeck2Interface();
    closeDeck1Interface();
    closeSearchDeck1Interface();
    closeGrave2Interface();
    closeGrave1Interface();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function removeEmpty(arr)
{
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i] == '')
        {
            arr.splice(i,1);
            i--;
        }
    }
}

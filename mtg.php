<html>
<head>
<link rel="stylesheet" href="mtg.css"/>
<script src='mtg.js'></script>
</head>
<body>
<div id="topArea" style="position:fixed; top:0px; right:225px; border:1px solid #808080; width:100%; height:50%; padding:0; box-sizing:border-box; overflow:hidden;"></div>

<div id="bottomArea" style="position:fixed; bottom:0px; right:225px; border:1px solid #808080; width:100%; height:50%; padding:0; box-sizing:border-box; overflow:hidden;"></div>

<div style="position:fixed; bottom:0px; right:0px; border:1px solid #808080; width:225px; height:100%; padding:0; box-sizing:border-box; overflow:hidden;">
    <img id="bigImg" src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card"><?php echo "stuff!"?>
    <img id="deck" src="http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card" style='position:fixed;top:50%;left:100%-250px' onclick='createCard(deck1[0]);deck1.splice(0,1);'>
</div>

</body>
</html>
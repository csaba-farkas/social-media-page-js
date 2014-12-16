/*
Date Last Modified: 16/12/14
Interactive Web Development - Assignment 2
*/

function initialise() {
	//Hide child menus
	hide();
	
	//Show child menus onmouseover
	var group = document.getElementsByClassName('group');
	
	for(var i = 0; i < group.length; i++) {
		//Add onclick attributes to elements with className 'group'
		group[i].setAttribute('onmouseover', 'showChildMenu(this)');
		group[i].setAttribute('onmouseout', 'hideChildMenu(event)');
	}
	
	//Rotating images using 'setInterval' function
	setInterval(function(){
		images = new Array(4);
	
		for(var i = 0; i < images.length; i++) {
			images[i] = new Image();
		}
		images[0].src = 'images/bob.png';
		images[1].src = 'images/robot.png';
		images[2].src = 'images/kvj.png';
		images[3].src = 'images/cat.png';
		
		var avatar = document.getElementById('friendrotate');
		for(var i = 0; i < images.length; i++) {
			if(images[i].src == avatar.src) {
				if(i < images.length-1) {
					avatar.src = images[i+1].src;
					break
				}
				else {
					avatar.src = images[0].src;
					break
				}
			}
	}}, 3000);
	
	//Like - unlike - refresh
	//Find elements with className 'fakelink'
	var likes = document.getElementsByClassName('fakelink');
	
	for(var i = 0; i < likes.length; i++) {
		if(likes[i].innerHTML == 'Like') {
			//Add onclick attribute with 'likeIt(elem)' function to Like buttons
			likes[i].setAttribute('onclick', 'likeIt(this)');
		}
		else if(likes[i].innerHTML == 'Hide') {
			//Add onclick attribute with 'hideMessage(elem)' function to Hide buttons
			likes[i].setAttribute('onclick', 'hideMessage(this)');
		}
		
		else if(likes[i].innerHTML == 'Refresh') {
			//Add refreshMsg() function to Refresh button. Called onclick.
			likes[i].setAttribute('onclick', 'refreshMsg()');
		}
	}
	
}

function refreshMsg() {
	//Refresh
	
	//Create four arrays to store messages, userIds, userNames, source of images. Also, I created an array for the action buttons
	var messages = ["Still waiting for a reply... What's the plan?", "So it goes...", "Don't worry... found some."];
	var userIds = ["@bob", "@kvj", "@robot"];
	var userNames = ["Bob ", "Kurt ", "Robbie "];
	var imageSrc = ["images/bob.png", "images/kvj.png", "images/robot.png"];
	var actions = ["Like", "Hide", "Reply"];
	
	//For loop, executes 3 times.
	for(var i = messages.length-1; i >= 0; i--) {
		//Create new msg div
		var msgPanel = document.createElement('div');
		msgPanel.setAttribute('class', 'msg');
		
		//Create img element with attributes, append it to msg div
		var imgElem = document.createElement('img');
		imgElem.setAttribute('class', 'userpic');
		imgElem.setAttribute('title', 'userNames[0]');
		imgElem.setAttribute('src', imageSrc[i]);
		msgPanel.appendChild(imgElem);
		
		//Create username node, append it to msg div
		var usrNameEl = document.createElement('span');
		usrNameEl.setAttribute('class', 'username');
		var usrName = document.createTextNode(userNames[i]);
		usrNameEl.appendChild(usrName);
		msgPanel.appendChild(usrNameEl);
		
		//Create userid node, append it to msg div
		var userIdEl = document.createElement('span');
		userIdEl.setAttribute('class', 'userid');
		var userId = document.createTextNode(userIds[i]);
		userIdEl.appendChild(userId);
		msgPanel.appendChild(userIdEl);
		
		//Create message node, append it to msg div
		var msgTextEl = document.createElement('div');
		msgTextEl.setAttribute('class', 'msgtext');
		var msgText = document.createTextNode(messages[i]);
		msgTextEl.appendChild(msgText);
		msgPanel.appendChild(msgTextEl);
		
		//Create msgaction div for like-hide-reply, append it to msg div
		var msgAction = document.createElement('div');
		msgAction.setAttribute('class', 'msgactions');
		msgPanel.appendChild(msgAction);
		
		//Create 3 span nodes, append them to msgaction div and add new attributes to call functions
		for(var j = 0; j < actions.length; j++) {
			var actionSpan = document.createElement('span');
			actionSpan.setAttribute('class', 'fakelink');
			var myAction = document.createTextNode(actions[j]);
			
			actionSpan.appendChild(myAction);
			msgAction.appendChild(actionSpan);
			
			if(actions[j] === 'Like') {
				actionSpan.setAttribute('onclick', 'likeIt(this)');
			}
			else if(actions[j] === 'Hide') {
				actionSpan.setAttribute('onclick', 'hideMessage(this)');
			}
		}
		
		//Prepend created msg div to msgpanel, after the header and before the first message.
		document.getElementById('msgpanel').insertBefore(msgPanel, document.getElementById('msgpanel').childNodes[2]);
	}
}

//Hid message function. 
function hideMessage(elem) {
	//Get the parent of parent --> msg div and change display to 'none'
	var parentOfHide = elem.parentNode;
	var grandParent = parentOfHide.parentNode;
	grandParent.style.display = 'none';
	console.log(grandParent.className);
}
function likeIt(elem) {
	//Get the parent of parent, to change the bgcolor
	var parent = elem.parentNode;
	var grandParent = parent.parentNode;
	//Change innerHTML to 'Unlike', change bgcolor and add new onclick attribute to call 'unlikeIt(el)'
	elem.innerHTML = 'Unlike';
	grandParent.style.backgroundColor = '#FFFFE0';
	elem.setAttribute('onclick', 'unlikeIt(this)');
}

function unlikeIt(elem) {
	//Get 'grandparent' to change bgcolor
	var parent = elem.parentNode;
	var grandParent = parent.parentNode;
	//Revers of likeIt. Change text to 'Like', remove bgcolor and add new onclick attribute to call 'likeIt(el)';
	elem.innerHTML = 'Like';
	grandParent.style.backgroundColor = '';
	elem.setAttribute('onclick', 'likeIt(this)');
}

function showChildMenu(elem) {
	//This function sets the display property of elements with 'item' class to 'block' if they are siblings of
	//the element that called this function.
	var siblingCounter = 1;
	while(elem.nextSibling) {
		var item = elem.nextSibling;
		//If node is an element, change display to 'block' and add an onclick attribute to call onmouseout function
		if(item.nodeType === 1) {
			item.style.display="block";
			if(siblingCounter == 1) {
				//this is the first 'item' in the list. hideChildMenu function is a bit different, sending true.
				//Function explained below
				item.setAttribute('onmouseout', 'hideChildMenu(event, true)');
			}
			else {
				item.setAttribute('onmouseout', 'hideChildMenu(event, false)');
			}
			siblingCounter++;
		}
		elem = elem.nextSibling;
	}
}

function hideChildMenu(evt, isItFirstItem) {
	//Capture the className of the element where pointer moved to
	var mouseEvent = evt.relatedTarget.className;
	
	//If it is first item in child menu:
	if(isItFirstItem) {
		//If pointer doesn't move to 'item' and it doesn't  move to 'group' --> hide child menu
		if(mouseEvent != 'item' && mouseEvent != 'group') {
			hide();
		}
	}
	//If it is not first item in child menu:
	else {
		//If pointer doesn't move to 'item', hide child menu
		if(mouseEvent != 'item') {
			hide();
		}
	}
}

function hide() {
	//Hide child menu by changing display property of elements with className 'item' to 'none'
	var items = document.getElementsByClassName('item');
		for(var i = 0; i < items.length; i++) {
			items[i].style.display = 'none';
		}
}


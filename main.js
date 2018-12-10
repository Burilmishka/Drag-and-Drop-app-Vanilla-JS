var noteCnt;
var butDiv;
var counter = 0;
var notesArr = [];
var noteCntCall;
var dX;
var dY;
var noteTextArr;
var flag = true;
var targetArr = [];
var targetNoteInSpace;


//Add(plus) button creation
function createPlusBut(){
    butDiv = document.createElement('div');
    butDiv.className = 'plusbut';

    var iconCnt = document.createElement('i');
    iconCnt.className = 'fas fa-plus';

    butDiv.appendChild(iconCnt);
}

createPlusBut();
document.body.appendChild(butDiv);


// view collection by clicking on Plus button
function collectView(){
    createNote(counter);
    dataDefaultCollector(counter);
    counter++;
}

var addButton = document.querySelector('.plusbut');
addButton.addEventListener('click', collectView);



// creation and view of note
function createNote(counter){
    noteCnt = document.createElement('div');
    var newClass = 'c' + counter;
    noteCnt.classList.add('note', newClass);
    document.body.appendChild(noteCnt);

    var noteHeaderDiv = document.createElement('div');
    noteHeaderDiv.className = 'header';
    noteCnt.appendChild(noteHeaderDiv);

    var headerText = document.createElement('div');
    headerText.className = 'headertext';
    headerText.textContent = 'New text is here';
    noteHeaderDiv.appendChild(headerText);

    closeButDiv = document.createElement('div');
    closeButDiv.className = 'xbut';
    noteHeaderDiv.appendChild(closeButDiv);

    var icon = document.createElement('i');
    icon.className = 'fas fa-times';
    closeButDiv.appendChild(icon);


    var textCnt = document.createElement('div');
    textCnt.className = 'text';
    noteCnt.appendChild(textCnt);

    var textArea = document.createElement('textarea');
    textArea.className = 'textarea';
    textArea.style.display = 'none';
    textCnt.appendChild(textArea);

    //func for deleting note from view and array
    closeButDiv.onclick = function(e){
        var noteTarget = e.target.parentElement.parentElement.parentElement;
        var targetClass = noteTarget.classList[1];
        for(i = 0; i < notesArr.length; i++){
            if(notesArr[i].identifier == targetClass){
                if(notesArr.length == 1){
                    notesArr.shift();
                }else{
                    notesArr.splice(i, 1);
                }
            }
        }
        noteTarget.remove(); 
    }
    
    //activating, moving, text changing in note
    noteCnt.onclick = function(e){
        targetNoteInSpace = e.target;
        while(targetNoteInSpace.classList[0] != 'note'){
            targetNoteInSpace = targetNoteInSpace.parentElement;
            targetArr.push(targetNoteInSpace);
        }

        //Shadows and z-index activating
        if(targetArr.length == 1){
            targetNoteInSpace.classList.add('noteshadow');
            targetNoteInSpace.classList.add('noteZ');
            
        }else if(targetNoteInSpace != targetArr[targetArr.length - 2]){
            targetNoteInSpace.classList.add('noteshadow');
            targetArr[targetArr.length - 2].classList.remove('noteshadow');
            if(targetArr.length > 4)
            targetArr.splice(1, targetArr.length - 2);

            var allNotes = document.getElementsByClassName('note');
            for(i = 0; i < allNotes.length; i++){
                if(allNotes[i].classList.contains('noteZ')){
                    allNotes[i].classList.remove('noteZ');
                }
                targetNoteInSpace.classList.add('noteZ');
            } 
        }


        //text event
        targetNoteInSpace.ondblclick = function(){
            if(flag){
                textArea.style.display = 'block';
                flag = false;
        
                textArea.onchange = function(){
                    positionWriter(notesArr, targetNoteInSpace, textArea);
                    console.log(notesArr);
                };
            }else{
                textArea.style.display = 'none';
                flag = true;
            }
        }
        

        //move event
        targetNoteInSpace.onmousedown = function(e){
            dX = e.pageX - targetNoteInSpace.offsetLeft;
            dY = e.pageY - targetNoteInSpace.offsetTop;
            window.addEventListener('mousemove', trackCursor);
        }


        //delete move event 
        targetNoteInSpace.onmouseup = function(e){
            positionWriter(notesArr, targetNoteInSpace);
            window.removeEventListener('mousemove', trackCursor);
        }   
    }
} 


//function collects default data from new note and push it ot notes array
function dataDefaultCollector(counter){
    noteTextArr = document.getElementsByClassName('textarea');
    var newObj = {
        identifier: 'c' + counter,
        text: '',
        positX: '0',
        positY: '0',
        // zInd: '0',
    }
    notesArr.push(newObj);
}


//tracks cursor and change style to replaced
function trackCursor(e){
    var posX = e.pageX;
    var finalPosX = posX - dX;
    var posY = e.pageY;
    finalPosY = posY - dY;
    targetNoteInSpace.style.cssText = 'top:' + finalPosY + 'px; left:' + finalPosX + 'px;';
}

//writes positionX positionY and text(if exists) to array;
function positionWriter(targetArr, targetElem, textElem){
    var tClass = targetElem.classList[1];
    for(i = 0; i < targetArr.length; i++){
        if(targetArr[i].identifier == tClass){
            targetArr[i].positX = targetElem.offsetLeft;
            targetArr[i].positY = targetElem.offsetTop;
            if(textElem){
                targetArr[i].text = textElem.value;
            }
        }
    }
}



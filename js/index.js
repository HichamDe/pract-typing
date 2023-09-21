// * ======================================================================================
// * ==                                                                                 ===
// * ==                                                                                 ===
// * ==                                 Prac-Typing                                     ===
// * ==                                                                                 ===
// * ==                                                                                 ===
// * ======================================================================================

//* Created to test typing speed and also
//* improve it with some practice : by writing your name you will be able 
//* to watch a video that explains everything at the current moment 
//* then you can passe a test by typing a given sentence.

//* Each user has a Level => Each "Level" has a "step" or a sentence => Each sentence 
//* will be written with a sertain "speedLevel" 

//* steps (1,2,...,n) should increase by 1 if the speedLevel equals 3
//* Level (1,2,3,4) should increase by 1 when steps are compeleted 


//* Viewer will be the variable screen
const viewer = document.getElementById("viewer");
const message = document.getElementById("message");
const texts = [["Hi !" , "Hello World"],["Hello Mr Jhon, how is it going ?","I can't handel cats , not my fault"],
    ["What is the password mate? it's la&==>xxb","lets go kids ABDCEFGH...0123456789 @&=)([]"],[
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ipsum vel non repudiandae error id?",
        "Aspernatur cum dolores nulla veniam molestiae odit, quo veritatis ex facilis quos doloremque placeat debitis odio nobis, adipisci consequuntur.",
    ]
];
let userName,userSession;

//* Set Sessions info 
userSession = hasPassed() || {level : 0 , step : 0};
if(hasPassed()) startVideo();

function view(obj,content){
    //* Views the content  
    obj.innerHTML = content;
}

function startVideo(){
    //* This function will invoked to launch the course
    userName = document.getElementById("user-name").value;
    view(viewer ,`<div class="container"><h1>Video to explain the plateform  </h1><p>1- Never look at the keyboard !</p>
    <button onclick='startTest()'>Start The Test</button></div>`);
}

function speedLevel(time,textLen){
    //* time = new Date - startTime 
    //* textLen = text.length
    //? fast means being able to type X charachters in X*1000/2 (ms) or less 
    if(time < (textLen*1000)/3) return 3; // Fast
    if((textLen*1000)/2 > time && time >= (textLen*1000)/3) return 2; // Normall
    if(time >= (textLen*1000)/2) return 1; // Too Slow
}

function hasPassed(){
    return JSON.parse(localStorage.getItem("user-session")) || false;
}

function startTest(){
    //* Start the test 
    let charTyped = 0; //* Number of written charachter
    
    //* Get session info 
    let {level,step} = userSession;
    let text = texts[level][step];
    
    //TODO: View
    view(viewer,`<div class="container"><p>Start Typing Now</p><section><h1><span id="written"></span><span 
    id="remainder">${text}</span></h1></section></div>`);
    
    let remainder = document.getElementById("remainder");
    let written = document.getElementById("written");
    const startTime = new Date();

    //TODO: Event Manager
    document.addEventListener("keypress" , function(event){
        if(charTyped >= text.length-1){
            //* Show Result
            const speedLevel_res = speedLevel((new Date() - startTime), text.length);
            if(texts[level].length-1 === step){
                step = 0;
                level +=1;
                view(message,`Your level is ${level}`);
            }else{
                if(speedLevel_res === 3) {
                    step +=1;
                    view(message,`Good job!`);
                }
                else view(message,`try harder!`);
            }
            localStorage.setItem("user-session" , JSON.stringify(
                {userName : userSession.userName || userName ,level : level ,step : step}
            ));
        } if(event.key == text[charTyped]){
            view(written,`${text.slice(0,charTyped+1)}`);
            view(remainder,`${text.slice(charTyped+1)}`);
            charTyped += 1; // how many time he wrote a correct charachter
        }
    });
}

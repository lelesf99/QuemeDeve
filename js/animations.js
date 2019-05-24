var validationMessagesSwitches_shortPass = 0;
var validationMessagesSwitches_invalidPass = 0;
function animate({duration, timing, draw},callback) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
//these functions will create timing-graphs for the animations
function makeEaseOut(timing) {
  return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
  }
}
function quad(timeFraction) {
  return Math.pow(timeFraction, 2);
}
// function circ(timeFraction) {
//   return 1 - Math.sin(Math.acos(timeFraction));
// }
var quadEaseOut = makeEaseOut(quad);

//login disapeears
function login(i){
  let loginBox = document.getElementById('loginBox');
  let signUpBox = document.getElementById('signUpBox');
  if(i==1){
    animate({
      duration: 300,
      timing: quadEaseOut,
      draw: function(progress) {
        loginBox.style.height = 170 - (170 * progress) + 'px';
        signUpBox.style.height = 0 + (210 * progress) + 'px';
      }
    });
  }else{
    animate({
      duration: 300,
      timing: quadEaseOut,
      draw: function(progress) {
        loginBox.style.height = 0 + (170 * progress) + 'px';
        signUpBox.style.height = 210 - (210 * progress) + 'px';
      }
    });
  }
}
//Shows short password alert
function aniShortPass(){
  let shortPsw = document.getElementById('shortPsw');
  let pass = document.getElementById('signPswInput');
  let signUpBox = document.getElementById('signUpBox');
  let heightBox = 210 + (validationMessagesSwitches_invalidPass+validationMessagesSwitches_shortPass)*27
  if(pass.value.length<6&&validationMessagesSwitches_shortPass==0){
    validationMessagesSwitches_shortPass=1;
    animate({
        duration: 300,
        timing: quadEaseOut,
        draw: function(progress) {
        shortPsw.style.height = 0 + (27 * progress) + 'px';
        signUpBox.style.height = heightBox + (27 * progress) + 'px';
      }
    });
  }else if(pass.value.length>=6&&validationMessagesSwitches_shortPass==1){
    validationMessagesSwitches_shortPass=0;
    animate({
        duration: 300,
        timing: quadEaseOut,
        draw: function(progress) {
        shortPsw.style.height = 27 - (27 * progress) + 'px';
        signUpBox.style.height = heightBox - (27 * progress) + 'px';
      }
    });
  }
}
//Shows invalid password alert
function aniInvalidPass(){
  let invalidPsw = document.getElementById('invalidPsw');
  let pass = document.getElementById('signPswInput');
  let repPass = document.getElementById('signRepeatPswInput');
  let signUpBox = document.getElementById('signUpBox');
  let heightBox = 210 + (validationMessagesSwitches_invalidPass+validationMessagesSwitches_shortPass)*27
  console.log(pass.value);
  console.log(repPass.value);
  if(pass.value===repPass.value&&validationMessagesSwitches_invalidPass==1){
    validationMessagesSwitches_invalidPass=0;
    animate({
        duration: 300,
        timing: quadEaseOut,
        draw: function(progress) {
          invalidPsw.style.height = 27 - (27 * progress) + 'px';
          signUpBox.style.height = heightBox - (27 * progress) + 'px';
      }
    });
  }else if(validationMessagesSwitches_invalidPass==0&&pass.value!==repPass.value){
    validationMessagesSwitches_invalidPass=1;
    animate({
        duration: 300,
        timing: quadEaseOut,
        draw: function(progress) {
          invalidPsw.style.height = 0 + (27 * progress) + 'px';
          signUpBox.style.height = heightBox + (27 * progress) + 'px';
      }
    });
  }
}
//Successful signup
function signUp(){

  let backBox = document.getElementById('successfulSignUpBox');
  let signUpBox = document.getElementById('signUpBox');
  animate({
    duration: 300,
    timing: quadEaseOut,
    draw: function(progress) {
      signUpBox.style.height = 210 - (210 * progress) + 'px';
      backBox.style.height = 0 + (87 * progress) + 'px';
    }
  });
}
function backToLogin(){
  let backBox = document.getElementById('successfulSignUpBox');
  let loginBox = document.getElementById('loginBox');
  animate({
    duration: 300,
    timing: quadEaseOut,
    draw: function(progress) {
      loginBox.style.height = 0 + (170 * progress) + 'px';
      backBox.style.height = 87 - (87 * progress) + 'px';
    }
  });
}
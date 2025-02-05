const bells = new Audio('./sounds/bell.wav'); 
const startPauseBtn = document.getElementById("play-pause");
const restartBtn = document.getElementById("restart");
const settingsBtn = document.getElementById("settings");
const sessionMinutes = document.getElementById("minutes"); 
let myInterval; 
let started = false;

const appTimer = () => {
    const idButton = this.document.activeElement.id
    console.log('APP TIMER FUNCTION', idButton)
    const sessionAmount = Number.parseInt(sessionMinutes.textContent)
  
    if(!started) {
      started = true;
      let totalSeconds = sessionAmount * 60;
  
      const updateSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');
      
        totalSeconds--;
      
        let minutesLeft = Math.floor(totalSeconds/60);
        let secondsLeft = totalSeconds % 60;
      
        if(secondsLeft < 10) {
          secondDiv.textContent = '0' + secondsLeft;
        } else {
          secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`
      
        if(minutesLeft === 0 && secondsLeft === 0) {
          bells.play()
          clearInterval(myInterval);
        }
      }
      myInterval = setInterval(updateSeconds, 1000);
    } else {
      alert('Session has already started.')
      // pausar
    }
  }

const showEditMinutes = () => {
  document.getElementById('modal-edit').style.display='block'
}

// get edited element from input edited-minutes ok
  // edit this eleemnt sessionMinutes
// mostrar el modal
// al hacer click en el boton de salvar revisar si tiene un inut valido y cambiar el numero
// al hacer click en cancelar dejar e mostrar el modal sin hacer nada

const saveEditedMinutes = () => {
  const newSessionMinutesInput = document.getElementById("edited-minutes");
  const newSessionMinutes = newSessionMinutesInput.value;
  const dangerAlert = document.getElementById('danger-alert')
  console.log(newSessionMinutesInput);

  if (1 < newSessionMinutes && newSessionMinutes< 61) {
    sessionMinutes.innerText = newSessionMinutes;
    newSessionMinutesInput.value = '';
    document.getElementById('modal-edit').style.display='none'
    dangerAlert.style.display = 'none';
  }else{
    console.log('revisa el iinout')
    dangerAlert.style.display = 'block';
    // alert
  }
}


  restartBtn.addEventListener('click', appTimer)
  startPauseBtn.addEventListener('click', appTimer);
  settingsBtn.addEventListener('click', showEditMinutes);
  saveEditedBtn.addEventListener('click', saveEditedMinutes)
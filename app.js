const bells = new Audio('./sounds/bell.wav'); 
const startPauseBtn = document.getElementById("play-pause");
const restartBtn = document.getElementById("restart");
const settingsBtn = document.getElementById("settings");
const sessionMinutes = document.getElementById("minutes");
const playPauseIcon = document.getElementById('play-pause-icon')
let sessionAmount = Number.parseInt(sessionMinutes.textContent)
let myInterval; 
let started = false;
let totalSeconds = sessionAmount * 60;

const appTimer = () => {
    if(!started) {
      started = true;
      playPauseIcon.innerText = 'pause_circle';
  
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
      started = false;
      clearInterval(myInterval)
      playPauseIcon.innerText = 'play_circle'
    }
  }

const showEditMinutes = () => {
  document.getElementById('modal-edit').style.display='block'
}

const saveEditedMinutes = () => {
  const newSessionMinutesInput = document.getElementById("edited-minutes");
  const newSessionMinutes = newSessionMinutesInput.value;
  const dangerAlert = document.getElementById('danger-alert')

  if (0 < newSessionMinutes && newSessionMinutes< 61) {
    clearInterval(myInterval);
    started = false;
    sessionMinutes.innerText = newSessionMinutes;
    const secondDiv = document.querySelector('.seconds');
    secondDiv.textContent = '00'
    sessionAmount = Number.parseInt(sessionMinutes.innerText)
    newSessionMinutesInput.value = '';
    document.getElementById('modal-edit').style.display='none'
    dangerAlert.style.display = 'none';
  }else{
    dangerAlert.style.display = 'block';
  }
}

const restartPomodoro = () => {
  clearInterval(myInterval);
  totalSeconds = sessionAmount * 60;
  sessionMinutes.textContent = sessionAmount;
  const secondDiv = document.querySelector('.seconds');
  secondDiv.textContent = '00';
  started = false;
  appTimer()
}

  restartBtn.addEventListener('click', restartPomodoro)
  startPauseBtn.addEventListener('click', appTimer);
  settingsBtn.addEventListener('click', showEditMinutes);
  saveEditedBtn.addEventListener('click', saveEditedMinutes)
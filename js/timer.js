const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

displayTimeShiwDown("timeSpentSittingId", "baseTimerSpendSittingId" ,"timeSpendSittingLabel", 0);
displayTimeShiwDown("timeWrongPositionId", "baseTimerWrongPositionId", "timeWrongPositionLabel", 0);
displayTimeShiwDown("breakTimeId", "baseTimerBreakTimeId", "breakTimeLabel", 0);
function displayTimeShiwDown(timeSpentSittingId, baseTimerPathRemaining, baseTimeLabel,timeLeft) {
    document.getElementById(timeSpentSittingId).innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="${baseTimerPathRemaining}"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="${baseTimeLabel}" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
    </div>
    `;
}

function formatTime(time) {
  let seconds = Math.floor(time/10);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  
  if(seconds >= 60) {
    seconds = seconds - (minutes * 60)
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if(minutes >= 60) {
    minutes = minutes - (hours * 60)
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft, id) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById(id)
      .classList.remove(warning.color);
    document
      .getElementById(id)
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById(id)
      .classList.remove(info.color);
    document
      .getElementById(id)
      .classList.add(warning.color);
  }
}

function calculateTimeFraction(timeLeft,time) {
  const rawTimeFraction = timeLeft / time;
  return rawTimeFraction - (1 / time) * (1 - rawTimeFraction);
}

function setCircleDasharray(timeLeft,time, id) {
  const circleDasharray = `${(
    calculateTimeFraction(timeLeft,time) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById(id)
    .setAttribute("stroke-dasharray", circleDasharray);
}
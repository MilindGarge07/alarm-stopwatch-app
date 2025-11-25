// ---------------- STOPWATCH -----------------

let stopwatchSeconds = 0;
let stopwatchInterval;

function updateStopwatch() {
  let hrs = Math.floor(stopwatchSeconds / 3600);
  let mins = Math.floor((stopwatchSeconds % 3600) / 60);
  let secs = stopwatchSeconds % 60;

  document.getElementById("stopwatch").innerText = `${String(hrs).padStart(
    2,
    "0"
  )}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  stopwatchSeconds++;
}

function startStopwatch() {
  if (!stopwatchInterval)
    stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  pauseStopwatch();
  stopwatchSeconds = 0;
  updateStopwatch();
}

// ---------------- ALARM -----------------

let alarmTimer = null;

function setAlarm() {
  let timeInput = document.getElementById("alarmTime").value;
  if (!timeInput) {
    alert("Select a valid time!");
    return;
  }

  let now = new Date();
  let alarmTime = new Date();

  let [hours, minutes] = timeInput.split(":");
  alarmTime.setHours(hours, minutes, 0);

  let timeToAlarm = alarmTime - now;

  if (timeToAlarm < 0) timeToAlarm += 24 * 60 * 60 * 1000;

 alarmTimer = setTimeout(() => {
    let alarmSound = document.getElementById("alarmSound");

    alarmSound.play();
    document.getElementById("stopAlarmBtn").style.display = "block";

    alert("Alarm ringing!");
}, timeToAlarm);

}

function clearAlarm() {
  if (alarmTimer) {
    clearTimeout(alarmTimer);
    alarmTimer = null;
    alert("Alarm cleared!");
  }
}

// ---------------- ALARM STOP -----------------

function stopAlarm() {
  let alarmSound = document.getElementById("alarmSound");
  alarmSound.pause();
  alarmSound.currentTime = 0;

  document.getElementById("stopAlarmBtn").style.display = "none";
}

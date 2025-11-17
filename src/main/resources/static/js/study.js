let currentRecordId = null;
let timerInterval = null;
let elapsed = 0;
let records = [];
let studyChart;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", function() {
    if(timerInterval) return;
    fetch('/start', {method: 'POST'})
     .then(res => res.json())
     .then(data => {
          currentRecordId = data.id;
          document.getElementById("timer").textContent = formatTime(elapsed);

          timerInterval = setInterval(() => {
            elapsed++;
            document.getElementById("timer").textContent = formatTime(elapsed);
          }, 1000);
  
          console.log("Start:", data);
        });
  });
  
  document.getElementById("endBtn").addEventListener("click", function() {
    if(!currentRecordId) return;
    fetch('/end/' + currentRecordId, {method: 'POST'})
       .then(res => res.json())
       .then(data => {
          clearInterval(timerInterval);
          timerInterval = null;
          
          document.getElementById("timer").textContent = formatTime(elapsed);
          currentRecordId = null;
  
          records.push(data);
          updateChart();
          console.log("End:", data);
        });
  });
  
  const ctx = document.getElementById('studyChart').getContext('2d');
  studyChart =  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: '学習時間(秒)',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        barThickness: 5
      }]
    },
    options: {
      responsive: false,
      scales: { y: { beginAtZero: true } }
    }
  });
});

function updateChart() {
  const today = new Date();
  const weekLabels = [];
  const weekData = Array(7).fill(0);

  for(let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    weekLabels.push(`${d.getMonth() + 1}/${d.getDate()}`);
  }

  records.forEach(r => {
    const rDate = new Date(r.startTime);
    const diff = Math.floor((today - rDate) / (1000 * 60 * 60 * 24));
    if(diff >= 0 && diff < 7) {
      weekData[6 - diff] += r.duration;
    }
  })

  studyChart.data.labels = weekLabels;
  studyChart.data.datasets[0].data = weekData;
  studyChart.update();
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const hStr = h.toString().padStart(2, '0');
  const mStr = m.toString().padStart(2, '0');
  const sStr = s.toString().padStart(2, '0');

  return `${hStr}:${mStr}:${sStr}`;
}
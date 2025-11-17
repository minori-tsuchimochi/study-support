let currentRecordId = null;
let timerInterval = null;
let elapsed = 0;
let records = [];
let studyChart;

window.addEventListener("DOMContentLoaded", () =>{
  document.getElementById("startBtn").addEventListener("click", function() {
    fetch('/start', {method: 'POST'})
     .then(res => res.json())
     .then(data => {
          currentRecordId = data.id;
          elapsed = 0;
          document.getElementById("timer").textContent = elapsed + "秒";
  
          clearInterval(timerInterval);
          timerInterval = setInterval(() => {
            elapsed++;
            document.getElementById("timer").textContent = elapsed + "秒";
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
          document.getElementById("timer").textContent = "終了： " + elapsed + "秒";
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
      scales: { y: { beginAtZero: true } }
    }
  });
});

function updateChart() {
  const labels = records.map(r => r.startTime);
  const data = records.map(r => r.duration);
  studyChart.data.labels = labels;
  studyChart.data.datasets[0].data = data;
  studyChart.update();
}
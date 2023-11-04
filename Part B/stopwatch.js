$(document).ready(function() {
    let interval;
    let running = false;
    let time = 0;
    const timeLabel = $("#timeLabel");
    const datePicker = $("#datePicker");
    const startButton = $("#startButton");
    const stopButton = $("#stopButton");
    const resetButton = $("#resetButton");

    async function updateTime() {
      return new Promise((resolve) => {
        if (running) {
          time++;
          const hours = Math.floor(time / 3600);
          const minutes = Math.floor((time % 3600) / 60);
          const seconds = time % 60;
          timeLabel.text(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
          resolve();
        }
      });
    }

    startButton.on("click", async () => {
      running = true;
      startButton.prop("disabled", true);
      stopButton.prop("disabled", false);
      resetButton.prop("disabled", true);
      interval = setInterval(async () => {
        await updateTime();
      }, 1000);
    });

    stopButton.on("click", () => {
      running = false;
      startButton.prop("disabled", false);
      stopButton.prop("disabled", true);
      resetButton.prop("disabled", false);
      clearInterval(interval);
    });

    resetButton.on("click", () => {
      running = false;
      time = 0;
      timeLabel.text("00:00:00");
      startButton.prop("disabled", false);
      stopButton.prop("disabled", true);
      resetButton.prop("disabled", true);
    });

    datePicker.datepicker({
      dateFormat: 'yy-mm-dd',
      onSelect: function(dateText) {
        console.log(dateText);
      },
      minDate: null,
      beforeShow: function (input, inst) {
        setTimeout(function () {
          inst.dpDiv.css({
            top: 'auto',
            bottom: '40px'
          });
        }, 0);
      }
    });

    const estDate = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    const yyyy = estDate.getFullYear();
    const mm = String(estDate.getMonth() + 1).padStart(2, '0');
    const dd = String(estDate.getDate()).padStart(2, '0');
    datePicker.val(`${yyyy}-${mm}-${dd}`);
})
const dailyLimit = document.getElementById('daily-limit');
const resetBtn = document.getElementById('reset');
const saveBtn = document.getElementById('saveButton');
const dailyLimitInput = document.getElementById('daily-limit-input');

console.log(dailyLimit.textContent);

saveBtn.addEventListener('click', () => {
  if (NaN) {
    alert('Please Enter a Number.');
    return;
  }

  dailyLimit.textContent = dailyLimitInput.value;
  dailyLimitInput.value = '';
});

// event listeners

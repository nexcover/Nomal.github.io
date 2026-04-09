const monthYear = document.getElementById('month-year');
const daysContainer = document.getElementById('days');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();
let selectedDates = JSON.parse(localStorage.getItem('selectedDates')) || [];

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    monthYear.textContent = `${year}년 ${month + 1}월`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const today = new Date();

    daysContainer.innerHTML = '';

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = d.getDate();

        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        if (d.getMonth() !== month) {
            dayDiv.classList.add('other-month');
        }

        if (d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()) {
            dayDiv.classList.add('today');
        }

        if (d.getDay() === 0 || d.getDay() === 6) {
            dayDiv.classList.add('weekend');
        }

        if (selectedDates.includes(dateStr)) {
            dayDiv.classList.add('selected');
        }

        dayDiv.addEventListener('click', () => {
            if (selectedDates.includes(dateStr)) {
                selectedDates = selectedDates.filter(date => date !== dateStr);
                dayDiv.classList.remove('selected');
            } else {
                selectedDates.push(dateStr);
                dayDiv.classList.add('selected');
            }
            localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
        });

        daysContainer.appendChild(dayDiv);
    }
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
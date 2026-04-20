let hours = document.getElementById("hours");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let days = document.getElementById("day");
let dates = document.getElementById("date");
let years = document.getElementById("year");


function time() {
    let clock = new Date();
    // console.log(clock);

    let hour = clock.getHours();
    console.log(hour);
    let mins = clock.getMinutes();
    console.log(mins);
    let secs = clock.getSeconds();
    console.log(secs);

    let day = clock.getDay();
    console.log(day);
    let dayes = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log(dayes[day]);
    let date = clock.getDate();
    console.log(date);
    let year = clock.getFullYear();
    console.log(year);

    hours.innerText = hour;
    min.innerText = mins;
    sec.innerText = secs;

    days.innerText = dayes[day];
    dates.innerText = date;
    years.innerText = year;
}

setInterval(time, 1000);

time()
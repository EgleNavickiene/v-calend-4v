let nav = 0;

let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
// const backDrop = document.getElementById('modalBackDrop');
const form = document.querySelector('create-new-event');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventTypeInput = document.getElementById('eventTypeInput');
const eventDateInput = document.getElementById('eventDateInput');
const eventStartInput = document.getElementById('eventStartInput');
const eventEndInput = document.getElementById('eventEndInput');
const eventDescriptionInput = document.getElementById('eventDescriptionInput');


function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        
        document.getElementById('eventText').innerText = eventForDay.title;
        document.getElementById('eventType').innerText = eventForDay.type;
        document.getElementById('eventDate').innerText = eventForDay.event_date;
        document.getElementById('eventStart').innerText = eventForDay.event_start;
        document.getElementById('eventEnd').innerText = eventForDay.event_end;
        document.getElementById('eventDescription').innerText = eventForDay.description;

        deleteEventModal.style.display = 'block';

    } else {
        newEventModal.style.display = 'block';
    }

    //backDrop.style.display = 'block';
}



function load() {
    const dt = new Date();
        // console.log(dt);

    if(nav !==0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
        // console.log(day, month, year);

    const firstDayOfMonth = new Date(year, month, 1)

    const daysInMonth = new Date(year, month+1, 0).getDate(); ////---Kodel?
        // console.log(daysInMonth);    

    const dateString = firstDayOfMonth.toLocaleDateString('us-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
        // console.log(dateString)    
    const paddingDays = weekdays.indexOf(dateString.split(', ') [0]);
        //console.log(paddingDays);

    document.getElementById('monthDisplay').innerText =
    `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    calendar.innerHTML = '';

    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find(e => e.date === dayString);

            if(i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if(eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            // -----------------------------------------------
            
            // ------------------------------------------------

            daySquare.addEventListener('click', () => openModal(dayString));

        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function clearForm() {
    eventTitleInput.classList.remove("error");
    eventDateInput.classList.remove("error");
    eventStartInput.classList.remove("error");
    eventEndInput.classList.remove("error");
    eventTypeInput.classList.remove("error");
    eventTitleInput.value = "";
    eventDateInput.value = "";
    eventStartInput.value = "";
    eventEndInput.value = "";
    eventTypeInput.value = "";
    eventDescriptionInput.value = "";
    clicked = null;
    load();
  }

function closeModal () {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    // backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

// ----------------------
/*
form.addEventListener('submit', (event) => {
    event.preventDefault();

    validateForm();
})

function validateForm() {
    if(eventTypeInput.value.trim() == '')
    setError(eventTypeInput, 'Type is required');
}

function setError(element, erorMessage) {
    const parent = element.parentElement;
    parent.classList.add('error');
}
*/
// ------------------------

function saveEvent( ) {

     if(eventTitleInput.value && eventTitleInput.value.length <50) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
            type: 'type:'+eventTypeInput.value,
            event_date: 'date: '+eventDateInput.value,
            event_start: 'start: '+eventStartInput.value,
            event_end: 'end: '+eventEndInput.value,
            description: 'description: '+eventDescriptionInput.value,
        })

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();

        clearForm();

     } else {
        eventTitleInput.classList.add('error');
     }
}

function deleteEvent() {
    let userAction = confirm("Do You want to delete this event?")

    events = events.filter(e => e.date !== clicked);

    if(userAction) {
        localStorage.setItem('events', JSON.stringify(events));    
        closeModal();
    }    
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();
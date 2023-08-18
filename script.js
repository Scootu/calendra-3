// Events database

let events = [
  {
    id: crypto.randomUUID(),
    eventTitle: "HCR2",
    eventDate: "2022-08-14T20:30:00",
    eventIcon: "https://i.ibb.co/NpSxzCq/star-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "It works lol",
    eventDate: "2023-05-13T12:00:00",
    eventIcon: "https://i.ibb.co/7gD6YvQ/cart-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "Dinner with dad",
    eventDate: "2023-08-03T20:00:00",
    eventIcon: "https://i.ibb.co/Jv8PNcg/cutlery-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "Pay phone bills",
    eventDate: "2023-08-13T12:00:00",
    eventIcon: "https://i.ibb.co/7gD6YvQ/cart-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "Special day :)",
    eventDate: "2023-08-14T16:00:00",
    eventIcon: "https://i.ibb.co/NpSxzCq/star-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "100 completed challenges",
    eventDate: "2023-08-20T12:00:00",
    eventIcon: "https://i.ibb.co/NpSxzCq/star-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "Meeting with John",
    eventDate: "2023-08-23T10:00:00",
    eventIcon: "https://i.ibb.co/dGnHnbH/presentation-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "Meeting with BAGI3TA",
    eventDate: "2024-08-31T10:00:00",
    eventIcon: "https://i.ibb.co/dGnHnbH/presentation-icon.png",
  },
  {
    id: crypto.randomUUID(),
    eventTitle: "You found that :D",
    eventDate: "2023-11-02T22:22:00",
    eventIcon: "https://i.ibb.co/dGnHnbH/presentation-icon.png",
  },
];
const iconEvent = [
  { src: "https://i.ibb.co/dGnHnbH/presentation-icon.png" },
  { src: "https://i.ibb.co/Jv8PNcg/cutlery-icon.png" },
  { src: "https://i.ibb.co/NpSxzCq/star-icon.png" },
  { src: "https://i.ibb.co/7gD6YvQ/cart-icon.png" },
  { src: "https://i.ibb.co/k94gb9x/heart-icon.png" },
  { src: "https://i.ibb.co/6RmH6yZ/baguette-icon.png" },
  { src: "https://i.ibb.co/122XwvY/bell-icon.png" },
  { src: "https://i.ibb.co/RHRzyn6/sport-icon.png" },
];
// i can put this in server

const yearContainer = document.querySelector(".years");
const allYearsContainerBtn = document.querySelectorAll(".years div");
const currentYearElement = document.querySelector(".current_year");
const nextYearElement = document.querySelector(".next_year");
const prevYearElement = document.querySelector(".prev_year");
//monthes
const monthContainer = document.querySelector(".monthes");
const monthesList = document.querySelector(".monthes-list");
const allMonthesButton = document.querySelectorAll(".monthes-list button");
//days
const daysList = document.querySelector(".days");
const weekList = document.querySelector(".weeks");
let cartDetailList = document.querySelector(".event-list");
//addNewEvent Container
const formAddNewEvent = document.querySelector(".event-new-content form");
const addNewEventContainer = document.getElementById("addNewEventContainer");
const closeNewEventContainerBtn = document.querySelector(
  ".add-new-event-container .new-event-hed span"
);
//editEvent Container
const editEventContainer = document.getElementById("editEventContainer");
const closeEditContainerBtn = document.querySelector(
  ".container-event-edit .new-event-hed span"
);
const editEventForm = document.querySelector(".event-edit-content form");
//icon container
const selectEventContainer = document.querySelector(".selectIconList");
const selectIconListEdit = document.getElementById("selectIconListEdit");
/// btns
const addNewEventbtn = document.querySelector(".event-btn");
const MonthesNavigationBtn = document.querySelectorAll(".monthes span");
////Month
const MONTH_CONTAINER_WIDTH = monthesList.clientWidth;
const MONTH_CONTAINER_WIDTH_TOTAL = monthesList.scrollWidth;
const MONTH_BUTTON_WIDTH = 75;
let scrollIndex = 0;
const monthes = [
  "jan",
  "feb",
  "mar",
  "apr",
  "mai",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const week = ["Fri", "Sat", "Sun", "Mon", "Thu", "Wed", "Thur"];

const date = new Date();
let currDate = date.getDate();
let currDay = date.getDay(); // the day in the week
let currMonth = date.getMonth();
let currMonthName = monthes[date.getMonth()].toUpperCase(); // because latter we will change the currMonth value
let currYear = date.getFullYear();
// selected days
let selectedDay = undefined;
let selectedMonth = currMonth;
let selectedYear = currYear;
//

function renderYears() {
  currentYearElement.textContent =
    `${monthes[currMonth].toUpperCase()}.` + currYear;
  prevYearElement.textContent = currYear - 1;
  nextYearElement.textContent = currYear + 1;
}
function addEventListaineToMonthes() {
  allMonthesButton.forEach((item) => {
    item.classList.remove("selectedMonth");
    item.addEventListener("click", selecteMonthFun.bind(null, item));
  });
}
function addEventListainerToYears() {
  allYearsContainerBtn.forEach((item) => {
    item.addEventListener("click", selecteYearFun.bind(null, item));
  });
}
function selecteYearFun(item) {
  deleteElementsClass(allYearsContainerBtn, "selectedYear");
  if (+item.textContent) {
    item.classList.add("selectedYear");
    currYear = parseInt(item.textContent);
    selectedYear = currYear;
    selectedDay = undefined;
    renderYears();
    renderDays();
    renderEvents();
  }
}
function selecteMonthFun(item) {
  deleteElementsClass(allMonthesButton, "selectedMonth");
  item.classList.add("selectedMonth");
  let itemIndexMonth = +item.getAttribute("data-num-mon");
  currMonth = itemIndexMonth;
  selectedMonth = currMonth;
  selectedDay = undefined;
  renderYears();
  renderDays();
  renderEvents();
}

function deleteElementsClass(elemCon, elemClass) {
  elemCon.forEach((item) => {
    item.classList.remove(elemClass);
  });
}

function selectPlannedEventDays() {
  let eventTimes = events.map((event) => {
    let eventDate = new Date(event.eventDate);
    let eventMonth = eventDate.getMonth();
    let eventYear = eventDate.getFullYear();
    let eventDateDay = eventDate.getDate();

    return { date: eventDateDay, month: eventMonth, year: eventYear };
  });
  // i wounte want this aprouch for solving this  pattren for select planned
  document
    .querySelectorAll(".days li:not(outher_month)")
    .forEach((itemElem) => {
      eventTimes.forEach((item) => {
        let dayItem = +itemElem.textContent;
        let monthItem = currMonth;
        let yearItem = currYear;
        if (
          item.date === dayItem &&
          item.month === monthItem &&
          item.year === yearItem
        ) {
          itemElem.classList.add("planned");
        }
      });
    });
}

const renderDays = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
  daysList.textContent = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    // creating li of previous month last days
    let liTagElement = document.createElement("li");
    liTagElement.className = "outher_month";
    liTagElement.textContent = `${lastDateOfLastMonth - i + 1}`;
    daysList.appendChild(liTagElement);
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    //create li element of the month , with indicator
    // adding selected if selected existe
    // adding active month if it's active
    let liTagElement = document.createElement("li");
    liTagElement.setAttribute("data-num-indicator", i);
    liTagElement.textContent = i;

    liTagElement.addEventListener(
      "click",
      selecteDayMon.bind(null, liTagElement)
    );
    daysList.appendChild(liTagElement);
  }
  for (let i = lastDayOfMonth; i < 6; i++) {
    // creating li of next month first days
    // for continue the list of element
    let liTagElement = document.createElement("li");
    liTagElement.className = "outher_month";
    liTagElement.textContent = `${i - lastDayOfMonth + 1}`;
    daysList.appendChild(liTagElement);
  }
  // select planned day
  selectPlannedEventDays();
};
function selecteDayMon(liTag) {
  const daysList = document.querySelectorAll(".days li");
  deleteElementsClass(daysList, "selectedItem");
  if (!liTag.classList.contains("planned")) {
    liTag.classList.toggle("selectedItem");
    selectedDay = +liTag.textContent;
  }
}
//events
function eventComponent(event) {
  let eventDate = new Date(event.eventDate);
  let currDayEvent = eventDate.getDay();
  let currDateEvent = eventDate.getDate();
  let currHoureEvent = eventDate.getHours();
  let currMinuteEvent = String(eventDate.getMinutes()).padStart(2, "0");
  let eventDateText = `${week[currDayEvent]} ${currDateEvent} ${currHoureEvent}:${currMinuteEvent}`;
  return eventDate.getFullYear() === currYear &&
    eventDate.getMonth() === currMonth
    ? ` <li class="event-item" data-event-id=${event.id}>
                    <img class="event_icon" src=${event.eventIcon}>
                    <div class="text">
                        <h1>${event.eventTitle}</h1>
                        <p data-select-day=${currDateEvent}>${eventDateText}</p>
                    </div>
                    <div class="icon-control">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </div>
                </li>`
    : "";
}

function addEventListainerToControlIcon() {
  const iconCartDetailControl = document.querySelectorAll(".icon-control");
  iconCartDetailControl.forEach((elem) => {
    let id = elem.parentElement.getAttribute("data-event-id");

    elem.firstElementChild.addEventListener(
      "click",
      editEvent.bind(null, elem, id)
    );
    elem.lastElementChild.addEventListener("click", deleteEvent.bind(null, id));
  });
}

function deleteEvent(id) {
  let eventArr = events.filter((item, index) => {
    return item.id !== id;
  });
  events = eventArr;
  renderEvents();
  renderDays();
}
function renderEvents() {
  let eventList = "";
  events.forEach((event, index) => {
    eventList += eventComponent(event, index);
  });
  cartDetailList.innerHTML = eventList;
  addEventListainerToControlIcon();
}
function editEvent(elem, id) {
  const eventTitleInput = editEventForm.querySelector("input");
  editEventContainer.classList.remove("hidden");
  const eventTitle = elem.previousElementSibling;
  eventTitleInput.value = eventTitle.firstElementChild.textContent;
  const eventDay = +eventTitle.lastElementChild.getAttribute("data-select-day");
  console.log(eventDay);
  editEventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getDataFromForm(editEventForm, eventDay, id);
  });
}

function getDataFromForm(formDataContainer, eventDay, id) {
  const data = new FormData(formDataContainer);
  const formDataObj = [];
  for (const [key, value] of data.entries()) {
    // formDataObj = {...formDataObj ,key : value  };
    if (value === "") {
      alert("form inputs not valid");
      return;
    }
    formDataObj.push({ key, value });
  }

  let resultFormObj = formDataObj.reduce((obj, item) => {
    obj[item.key] = item.value;
    return obj;
  }, {});
  const eventClock = resultFormObj.eventHoure.split(":");
  const eventDateNotFormated = new Date(
    selectedYear,
    selectedMonth,
    selectedDay ? selectedDay : eventDay,
    eventClock[0],
    eventClock[1],
    0,
    0
  );
  const eventDateFormated = formatDateToISOString(eventDateNotFormated);
  delete resultFormObj.eventHoure;
  // the diffrence
  formDataContainer.parentElement.parentElement.classList.add("hidden");

  if (!id) {
    resultFormObj = {
      ...resultFormObj,
      eventDate: eventDateFormated,
      id: crypto.randomUUID(),
    };
    addValidateEventToEventDataBase(resultFormObj);
  } else {
    console.log(eventDateFormated);
    resultFormObj = { ...resultFormObj, eventDate: eventDateFormated, id };
    editExistingEvent(resultFormObj, id);
  }
}
function addEventListainerToFormNewEvent(formDataContainer) {
  formDataContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    getDataFromForm(formDataContainer, undefined, undefined);
  });
}

function formatDateToISOString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
// form add new event
function addListainerToAddNewEventBtn() {
  addNewEventbtn.addEventListener("click", () => {
    if (selectedDay && selectedMonth && selectedYear !== undefined) {
      addNewEventContainer.classList.remove("hidden");
    } else {
      alert("select a day first !");
    }
  });
}
function addListainerCloseNewEventContainer(closebtn, container) {
  closebtn.addEventListener("click", () => {
    container.classList.add("hidden");
  });
}
function editExistingEvent(eventObj, id) {
  const eventIndex = events.findIndex((event) => {
    return event.id === id;
  });
  console.log(eventIndex, eventObj);
  events[eventIndex] = eventObj;
  renderEvents();
  renderDays();
}
function addValidateEventToEventDataBase(event) {
  // try to put this with edit
  events.push(event);
  renderEvents();
  selectPlannedEventDays();
}
//render Event new item icons :

function renderIconsNewEvent(selectEventContainer) {
  iconEvent.forEach((item, i) => {
    const liTagElement = document.createElement("li");
    const inputTagElement = document.createElement("input");
    inputTagElement.setAttribute("name", "eventIcon");
    inputTagElement.setAttribute("type", "radio");
    inputTagElement.setAttribute("value", item.src);
    inputTagElement.setAttribute("id", `icon-${i}`);
    inputTagElement.setAttribute("class", "inputEventNew");
    const liLabel = document.createElement("label");
    liLabel.setAttribute("for", `icon-${i}`);
    const imgIcon = document.createElement("img");
    liTagElement.classList.add("iconEventSelectNew");
    imgIcon.setAttribute("src", item.src);

    liLabel.appendChild(imgIcon);
    liTagElement.appendChild(inputTagElement);
    liTagElement.appendChild(liLabel);
    selectEventContainer.appendChild(liTagElement);
  });
}
const handleMonthNavigation = (button) => {
  if (button.classList.contains("prev")) {
    scrollIndex -= MONTH_BUTTON_WIDTH;
    monthesList.scroll(scrollIndex, 0);
    console.log(scrollIndex);
  }

  if (button.classList.contains("next")) {
    scrollIndex += MONTH_BUTTON_WIDTH;
    monthesList.scroll(scrollIndex, 0);
  }

  if (scrollIndex >= 895 - 5 * MONTH_BUTTON_WIDTH) {
    MonthesNavigationBtn[1].classList.add("inactive");
  } else {
    MonthesNavigationBtn[1].classList.remove("inactive");
  }

  if (scrollIndex === 0) {
    MonthesNavigationBtn[0].classList.add("inactive");
  } else {
    MonthesNavigationBtn[0].classList.remove("inactive");
  }
};
// all events
renderIconsNewEvent(selectEventContainer);
renderIconsNewEvent(selectIconListEdit);
renderYears();
renderDays();
renderEvents();
MonthesNavigationBtn.forEach((monthNavigation) => {
  monthNavigation.addEventListener("click", () => {
    handleMonthNavigation(monthNavigation);
  });
});
addEventListainerToYears();
addEventListaineToMonthes();
addEventListainerToFormNewEvent(formAddNewEvent);
// addEventListainerToFormNewEvent(editEventForm);
addListainerToAddNewEventBtn();
addListainerCloseNewEventContainer(
  closeNewEventContainerBtn,
  addNewEventContainer
);
addListainerCloseNewEventContainer(closeEditContainerBtn, editEventContainer);
// leftBtn.addEventListener("click", updateChangeLeft);
// rightBtn.addEventListener("click", updateChangeRight);

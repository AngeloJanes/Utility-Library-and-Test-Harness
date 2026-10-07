// This is how many people can be at an event
const MaxAttendees = 50;

//Terms that aren't allowed in the Event Name
const BannedTerms = ["BadWord", "OtherBadWord"]


//Checks if any of these are blank or not the right type of value
function validation(EventName, Fee, StartTime, EndTime, Attendees) {
    if (EventName === undefined || EventName.trim() === "") {
        return "Title Must Include Words"
    }
    if (Fee === undefined || Fee === "" || isNaN(Fee)) {
        return "Fee Must Use A Number"
    }
    if (StartTime === undefined || StartTime === "" || isNaN(StartTime)) {
        return "StartTime Must Use A Number"
    }
    if (EndTime === undefined || EndTime === "" || isNaN(EndTime)) {
        return "EndTime Must Use A Number"
    }
    if (Attendees === undefined || Attendees === "" || isNaN(Attendees)) {
        return "Attendees Must Use A Number"
    }
    return "Valid"
} 

//Price can't be negative
function fee(BasePrice) {
    if (BasePrice < 0) {
        return "Price Must Not Be Negative"
    }
    return BasePrice;
}

//Time has to be between 8am to 10pm and can't be the same time for start and end
function duration(StartTime, EndTime) {
    if (StartTime >= 8 && EndTime <= 22 && EndTime > StartTime) {
        return EndTime - StartTime
    }
    return "Invalid Times";
} 

//Checks if the attendees are less than the max allowed in the constants
function capacity(Attendees) {
    if (Attendees > 0 && Attendees <= MaxAttendees ) {
        return MaxAttendees - Attendees
    }
    return "Invalid Number Of Attendees"
} 

//Checks the name for any banned terms
function label(EventName) {
    if (BannedTerms.includes(EventName)) {
        return "Event Name Must Not Include Any Banned Terms"
    }
    return "Event: " + EventName;
}

function summary(EventName, Fee, StartTime, EndTime, Attendees) {
    return label(EventName) + " Fee: $" + fee(Fee) + " Duration: " + duration(StartTime, EndTime) + " hours (Start: " + StartTime + " End: " + EndTime + ") capacity: " + capacity(Attendees);
}




const TestEvents = [
    { name: "Baking", fee: 10, start: 12, end: 15, attendees: 30 },
    { name: "", fee: 10, start: 12, end: 15, attendees: 30 },

    { name: "Book Club", fee: 5, start: 12, end: 15, attendees: 25 },
    { name: "Book Club", fee: -5, start: 12, end: 15, attendees: 25 },

    { name: "Lecture", fee: 0, start: 12, end: 15, attendees: 20 },
    { name: "Lecture", fee: 0, start: 15, end: 12, attendees: 20 },

    { name: "Concert", fee: 20, start: 12, end: 15, attendees: 50 },
    { name: "Concert", fee: 20, start: 12, end: 15, attendees: 60 },

    { name: "Workshop", fee: 15, start: 12, end: 15, attendees: 20 },
    { name: "BadWord", fee: 15, start: 12, end: 15, attendees: 20 },

    { name: "Meeting", fee: 10, start: 12, end: 15, attendees: 10 },
    { name: "Meeting", fee: "ten", start: 12, end: 15, attendees: 10 }
];

for (let i = 0; i < TestEvents.length; i = i + 1) {
    let currentEvent = TestEvents[i];

    let checkInputs = validation(
        currentEvent.name, 
        currentEvent.fee, 
        currentEvent.start, 
        currentEvent.end, 
        currentEvent.attendees
    );

    if (checkInputs === "Valid") {
        let finalLabel = label(currentEvent.name);
        let finalFee = fee(currentEvent.fee);
        let finalDuration = duration(currentEvent.start, currentEvent.end);
        let finalCapacity = capacity(currentEvent.attendees);

        if (finalLabel === "Event Name Must Not Include Any Banned Terms") {
            console.log("Error: " + finalLabel);
        } else if (finalFee === "Price Must Not Be Negative") {
            console.log("Error: " + finalFee);
        } else if (finalDuration === "Invalid Times") {
            console.log("Error: " + finalDuration);
        } else if (finalCapacity === "Invalid Number Of Attendees") {
            console.log("Error: " + finalCapacity);
        } else {
            let finalSummary = summary(
                currentEvent.name, 
                currentEvent.fee, 
                currentEvent.start, 
                currentEvent.end, 
                currentEvent.attendees
            );
            console.log("Valid " + finalSummary);
        }
    } else {
        console.log(checkInputs);
    }
}
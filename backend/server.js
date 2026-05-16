const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


let alarmStatus = "armed";
let history = [];
let lastSeen = 0;
let autoMode = true;
let manualOverride = false;

/* =========================
   Auto arm and disarm times
========================= */
let autoArmTime = "16:00";
let autoDisarmTime = "06:30";
function logSchedule() {
    console.log("SCHEDULE → ARM:", autoArmTime, "DISARM:", autoDisarmTime);
}

function formatTime() {
    return new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

/* =========================
   History tracker of Beep
========================= */

function addHistory(description, source = "System", status = "Info") {
    history.push({
        description,
        source,
        status,
        datetime: formatTime()
    });

    if (history.length > 50) history.shift();
}

/* =========================
   Auto arm and disarm schedule
========================= */

setInterval(() => {
    const now = new Date();

    const currentTime =
        String(now.getHours()).padStart(2, '0') +
        ":" +
        String(now.getMinutes()).padStart(2, '0');

    // Auto arm alarm
    if (currentTime === autoArmTime) {
        if (alarmStatus !== "armed") {
            alarmStatus = "armed";
            autoMode = true;
            manualOverride = false;

            console.log("AUTO ARMED", currentTime);
            addHistory("AUTO ARMED", "Scheduler", "Armed");
        }
    }

    // Auto disarm alarm
    if (currentTime === autoDisarmTime) {
        if (alarmStatus !== "disarmed") {
            alarmStatus = "disarmed";
            autoMode = false;
            manualOverride = true;

            console.log("AUTO DISARMED", currentTime);
            addHistory("AUTO DISARMED", "Scheduler", "Disarmed");
        }
    }

    if (manualOverride === true) {
        if (currentTime !== autoDisarmTime) {
            manualOverride = false;
            autoMode = true;
        }
    }

}, 1000);

app.post("/event", (req, res) => {
    console.log("ESP32 EVENT:", req.body);

    lastSeen = Date.now();

    // Intrusion detected event
    if (req.body.type === "intrusion") {

        let msg = "INTRUSION DETECTED";

        if (req.body.distance) {
            msg += ` (${req.body.distance}cm)`;
        }

        addHistory(msg, "Sensor", "Triggered");
    }

    // RFID card event reader
    if (req.body.type === "rfid_tap" && req.body.status === "toggle") {

        alarmStatus =
            (alarmStatus === "armed") ? "disarmed" : "armed";

        autoMode = false;
        manualOverride = true;

        addHistory(
            `RFID → ${alarmStatus.toUpperCase()}`,
            "RFID Scanner",
            alarmStatus === "armed" ? "Armed" : "Disarmed"
        );
    }

    res.json({ success: true });
});

app.get("/device-status", (req, res) => {
    const online = (Date.now() - lastSeen) < 8000;

    res.json({
        online,
        alarmStatus
    });
});

app.get("/status", (req, res) => {
    res.json({
        status: alarmStatus,
        autoArmTime,
        autoDisarmTime,
        autoMode
    });
});

app.post("/arm", (req, res) => {
    alarmStatus = "armed";
    autoMode = true;
    manualOverride = false;

    addHistory("MANUAL ARM", "Dashboard", "Armed");

    res.json({ success: true });
});

app.post("/disarm", (req, res) => {
    alarmStatus = "disarmed";
    autoMode = false;
    manualOverride = true;

    addHistory("MANUAL DISARM", "Dashboard", "Disarmed");

    res.json({ success: true });
});

app.post("/toggle", (req, res) => {
    alarmStatus =
        (alarmStatus === "armed") ? "disarmed" : "armed";

    autoMode = false;
    manualOverride = true;

    addHistory(
        `MANUAL TOGGLE ${alarmStatus.toUpperCase()}`,
        "Dashboard",
        alarmStatus === "armed" ? "Armed" : "Disarmed"
    );

    res.json({
        success: true,
        status: alarmStatus
    });
});

/* =========================
   Set times for auto arm and disarm
========================= */

app.post("/set-times", (req, res) => {
    autoArmTime = req.body.armTime;
    autoDisarmTime = req.body.disarmTime;

    console.log("NEW SCHEDULE SET:", autoArmTime, autoDisarmTime);

    addHistory(
        `AUTO TIMES UPDATED (${autoArmTime} - ${autoDisarmTime})`,
        "Settings",
        "Updated"
    );

    res.json({ success: true, autoArmTime, autoDisarmTime });
});


app.get("/api/history", (req, res) => {
    res.json(history);
});

app.get("/history", (req, res) => {
    res.json(history);
});

app.get("/command", (req, res) => {
    res.json({ status: alarmStatus });
});

/* =========================
   START SERVER
========================= */

app.listen(PORT, "0.0.0.0", () => {
    console.log("SERVER RUNNING ON PORT", PORT);
});

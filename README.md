[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AnR2QgvN)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22927791&assignment_repo_type=AssignmentRepo)
# 🌐 IoT Elective Project 2026
### Cape Peninsula University of Technology — IT Diploma
**Module:** Internet of Things (IoT) Elective | **Year:** 2026

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Group Members](#group-members)
3. [Project Idea & Problem Statement](#project-idea--problem-statement)
4. [System Architecture & Design](#system-architecture--design)
5. [Hardware Components](#hardware-components)
6. [Software & Technologies](#software--technologies)
7. [Circuit Diagram / Wiring](#circuit-diagram--wiring)
8. [Build Process (with photos)](#build-process-with-photos)
9. [Code Documentation](#code-documentation)
10. [Testing & Results](#testing--results)
11. [Challenges & Solutions](#challenges--solutions)
12. [Project Demonstration](#project-demonstration)
13. [References](#references)
14. [Assessment Rubric](#assessment-rubric)
15. [Embedding Images in Your README](#embedding-images-in-your-readme)

---

## 📌 Project Overview

**Project Title:** `Beep Boop (RFID Enabled Alarm System)`  
**Group Name / Number:** `BEEP`  
**Presentation Date:** 20 May 2026 — 10:00 to 15:00 (SAST)

---

## 🗓️ Presentation Schedule — 20 May 2026

> 📍 **Date:** Wednesday, 20 May 2026  
> 🕙 **Time:** 10:00 – 15:00 (South Africa Standard Time, UTC+2)  
> ⏱️ **Slot duration:** 15 minutes per group  
> ⚠️ **All groups must be present and ready before their slot.**

| Slot | Time (SAST) | Group |
|------|-------------|-------|
| 1 | 10:00 – 10:15 | Group 1 |
| 2 | 10:15 – 10:30 | Group 2 |
| 3 | 10:30 – 10:45 | Group 3 |
| — | 10:45 – 11:00 | ☕ Short Break |
| 4 | 11:00 – 11:15 | Group 4 |
| 5 | 11:15 – 11:30 | Group 5 |
| — | 11:30 – 12:30 | 🍽️ Lunch Break |
| 6 | 12:30 – 12:45 | Group 6 |
| 7 | 12:45 – 13:00 | Group 7 |
| — | 13:00 – 15:00 | 🧑‍🏫 Moderation / Feedback Session |

> 📌 Group numbers will be replaced with actual group names once confirmed with the lecturer.

---

## 👥 Group Members

| Student Name | Student Number | Role / Responsibility |
|---|---|---|
| Raul Ja'aim Everts | 230270565 | Hardware Lead/Assembly |
| Ryle Peter May  | 230333907 | Software Lead & ESP32 Programmer |
| Chaz Kalo Rudolph | 230893287 | Dashboard Frontend & 3D Modelling |
| David Daniel Sepkitt  | 240046935 | Dashboard Backend |
| Robyn Dominique Stevens | 222201789 | Documentation Lead & ESP32 Programmer |

---

## 💡 Project Idea & Problem Statement

### Problem Statement
Traditional alarm systems as well as most alarm systems are often hardware dependent and requires users to physically/ manually arm or disarm the alarm via buttons on a remote or via keys on the keypad on the alarm itself. This causes limitations in terms of accessibility as well as automation.
In many existing alarm systems that are still widely used:  

-	The alarm requires users to manually arm or disarm the alarm.
-	There is limited or no remote access control over the alarm system.
-	Scheduling the alarm to automatically arm or disarm is either unavailable or not very user friendly.

The above-mentioned problems results in alarm systems that does not align with the requirements of modern smart homes/ modern smart environments, where remote access, automation as well as seamlessly integrating the device into user’s daily routine are essential.


### Proposed Solution
The Beep IoT alarm system addresses these limitations by introducing a fully integrated security system that combines both hardware and software into a single connected system.

The solution includes the following:
-	A web-based dashboard for users to control the device remotely.
-	A backend server which manages the system as well as to save the history of events that happened.
-	A ESP32 IoT device that has a RFID sensor for quick manual arming and disarming the alarm.
-	An alarm scheduling system which allows users to set times when the alarm should automatically arm and disarm itself.

Instead of relying on physical buttons or manual input from users to arm and disarm the alarm, Beep allows for users to interact with in multiple different ways:
Users can now remotely arm or disarm the alarm system through the dashboard, which gives users full control from any device (Mobile, PC, Tablets, etc) that is connected to their account. RFID cards provide a faster and more secure physical method of immediately arming or disarming the alarm.  Users can also make use of the automatic schedules for setting a specific time to arm and disarm the alarm. Lastly the dashboard allows for users to have real time monitoring of the activity logs, which allows for users to track events such as arming, disarming as well as triggered alerts.


### Objectives
- [ ] Objective 1: Automated scheduling 
This enables users to set times when the alarm should automatically arm and disarm itself, which reduces the need for users to manually interact with the alarm which improves security automation.

- [ ] Objective 2: Real time monitoring:
Provides users with live updates and logs of:
-	System status (if the alarm is currently armed or disarmed).
-	Trigger events (When intruder is detected as well as how close the intruder is to the sensor).
-	Lastly history activity tracking which shows the history of updates or logs which would be displayed on the device’s dashboard.

- [ ] Objective 3:
Support for both:
-	RFID card arming and disarming the alarm (Physically arming or disarming the alarm).
-	Dashboard authentication (remote access control).
This ensures that there is flexibility on how users control the device.


---

## 🏗️ System Architecture & Design

<img width="1185" height="736" alt="Screenshot 2026-05-20 090458" src="https://github.com/user-attachments/assets/6f3c6f63-c07d-4308-9bb6-2f593f6dee43" />

### Design Decisions
The firmware was built around a non-blocking architecture. Rather than using delay() for the buzzer, a millis() -based interval in soundAlarm() keeps the main loop responsive, ensuring RFID reads and server polling continue uninterrupted while the alarm sounds. The ESP32’s native WI-FI was leveraged over the SPI bus simultaneously alongside the RFID RC522, with a deliberate 3-second stability delay after Wi-Fi connection to allow the network stack to settle before SPI is Initialized. Communication with the backend follows a polling model over HTTP rather than a persistent socket; the ESP32 checks/command every loop cycle for arm/disarm instructions and posts events to /event, keeping the server stateless and the firmware simple. The 40cm trigger threshold on the HC-SR04 was chosen as a practical proximity boundary, with distance data posted every 5 seconds to avoid flooding the server. The buzzer is driven through a BC547 transistor to safely switch the 5V load from a 3.3V GPIO pin, and RFID authorization is handled entirely on-device via hardcoded UID byte comparison, meaning no network round-trip is required for physical access control.

---

## 🔧 Hardware Components

| Component | Description | Quantity | Purpose |
|---|---|---|---|
| Wemos LOLIN32 ESP32 | Dual-core microcontroller with built-in Wi-Fi and Bluetooth | 1 | Main microcontroller, Wi-Fi connectivity & alarm logic |
| RFID RC522 | 13.56MHz RFID reader/writer module | 1 | Reading RFID cards/tags for user authentication |
| HC-SR04 | Ultrasonic distance sensor (2cm–400cm range) | 1 | Intrusion detection while alarm is armed |
| TDB05LFPN Buzzer | 5V passive buzzer | 1 | Audible alarm output on intrusion detection |
| BC547 Transistor | NPN general-purpose transistor | 1 | Switching the 5V buzzer from a 3.3V ESP32 GPIO pin |
| 1kΩ Resistor | Carbon film resistor | 1 | Current limiting on the BC547 transistor base |
| Breadboard | Full/half-size solderless prototyping board | 1 | Component mounting and circuit prototyping |
| Jumper Cables | Male-to-male and male-to-female jumper wires | — | Connecting components on the breadboard |

---

## 💻 Software & Technologies

| Tool / Platform | Purpose |
|---|---|
| Visual Studio Code | Primary development environment used for both frontend and backend development |
| Node.js | Backend runtime environment used to handle API requests, system logic and communication with the IoT device |
| Express.js | Lightweight backend framework used to create the REST API endpoints for the system |
| React.js | Frontend framework used to build the interactive dashboard interface |
| Arduino IDE (v2.3.8) | Used to develop and upload the firmware to the ESP32 microcontroller using C++ |
| Figma | Used to design the wireframes and plan the layout, look and feel (UI/UX) of the dashboard prior to frontend development |
| GitHub | Used for version control, source code management and project documentation |
| Autodesk Fusion | Used to create a 3D model housing for the breadboard, RFID scanner and sensor |
| Stitch | Used to create a base for the frontend elements |

---

## 🔌 Circuit Diagram / Wiring

<img width="1302" height="816" alt="Screenshot 2026-05-20 084853" src="https://github.com/user-attachments/assets/5a0a4a3f-c018-473d-9e4c-5afef2234f3d" />


### Wiring

| Component Pin     | ESP32      |
|------------------|-----------|
| RFID SDA         | GPIO 5    |
| RFID RST         | GPIO 21   |
| RFID SCK         | GPIO 18   |
| RFID MOSI        | GPIO 23   |
| RFID MISO        | GPIO 19   |
| HS-SR04 TRIG     | GPIO 13   |
| HC-SR04 ECHO     | GPIO 12   |
| Buzzer 1         | GPIO 25   |
| RFID 3.3V        | ESP32 3V3 |
| HC-SR04 VCC      | ESP32 5V  |

---

## 🏭 Build Process (with photos)

### Step 1: [Step Title]
> Main devices (ESP32, HC-SR04, RFID-RC522) are inserted into the breadboard

<img width="1599" height="1599" alt="WhatsApp Image 2026-05-20 at 07 48 31" src="https://github.com/user-attachments/assets/8ded9935-165a-4769-8fdd-67b20576d1ba" />

### Step 2: [Step Title]
> Smaller parts (buzzer, resistor, transistor) are inserted into the board.

<img width="1599" height="1599" alt="WhatsApp Image 2026-05-20 at 07 48 33" src="https://github.com/user-attachments/assets/1634be01-1275-4c4d-8d88-44bb21f01f42" />

### Step 3: [Step Title]
> Cables are inserted and connected to all devices that require 3.3V (ESP, RFID) for power and grounding.

<img width="1599" height="1599" alt="WhatsApp Image 2026-05-20 at 07 48 32" src="https://github.com/user-attachments/assets/a98b3c0e-c084-4d8a-adb9-a2bc7f85c1cc" />

### Step 4: [Step Title]
> Cables are inserted and connected to all devices that require 5V (Buzzer, Ultrasonic sensor) for power and grounding.

<img width="1599" height="1599" alt="WhatsApp Image 2026-05-20 at 07 48 32 (1)" src="https://github.com/user-attachments/assets/be439dbb-9383-4f55-b3f9-6e7041705887" />

### Step 5: [Step Title]
> All secondary and GPIO pins/connections are inserted.

<img width="1599" height="1599" alt="WhatsApp Image 2026-05-20 at 07 48 32 (2)" src="https://github.com/user-attachments/assets/901ce697-9773-433a-b545-89ecc941e582" />

---

## 🖥️ Code Documentation

### Main Firmware (`arduino.ino`)

```cpp
// MAIN CODE (portion of alarm_system.ino)

void setup() {

  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Connected! IP: ");
  Serial.println(WiFi.localIP());

  //STABILITY DELAY
  delay(3000);

  SPI.begin();
  rfid.PCD_Init();

  // FIXED BOOT FLOW
  if (waitForServer()) {
    postEvent("status", "armed", -1, "");
  } else {
    Serial.println("Server not reachable on boot");
  }
}

void loop() {

  checkServerCommand();
  checkRFID();

  // SERVER RECOVERY LOOP
  if (millis() - lastServerCheck > 10000) {

    if (WiFi.status() == WL_CONNECTED) {

      HTTPClient http;
      http.begin(COMMAND_URL);

      int code = http.GET();

      if (code == 200) {
        Serial.println("Server reachable (loop check)");
      } else {
        Serial.println("Server NOT reachable");
      }

      http.end();
    }

    lastServerCheck = millis();
  }

  if (alarmArmed) {

    long distance = readDistance();

    if (millis() - lastPost >= POST_INTERVAL) {
      postEvent("distance", "armed", distance, "");
      lastPost = millis();
    }

    if (distance > 0 && distance <= TRIGGER_DISTANCE) {
      if (!alarmTriggered) {
        alarmTriggered = true;
        postEvent("intrusion", "armed", distance, "");
      }
    }

  } else {
    alarmTriggered = false;
    digitalWrite(BUZZER_PIN, LOW);
  }

  if (alarmTriggered) {
    soundAlarm();
  }

  delay(100);
}
```

### Key Functions

| Function Name        | Description |
|---------------------|------------|
| **setup()** | Initializes serial communication at 115200 baud, sets pin modes for the ultrasonic sensor (TRIG as OUTPUT, ECHO as INPUT) and buzzer (OUTPUT), connects to WiFi, initializes the SPI bus and MFRC522 RFID reader, then posts the initial "armed" status event to the server |
| **loop()** | Main execution loop that runs continuously. It calls `checkRFID()` and `checkServerCommand()` every cycle, handles periodic distance posting to the server every 5 seconds, triggers the intrusion alert if an object is detected within 40cm while armed, silences the buzzer when disarmed, and calls `soundAlarm()` if an intrusion is active |
| **readDistance()** | Fires a 10-microsecond pulse on the TRIG pin of the HC-SR04 ultrasonic sensor, measures the duration of the echo pulse on ECHO pin using `pulseIn()` with a 30ms timeout, then converts the duration to centimetres using the formula `(duration / 2) / 29.1`. Returns `-1` if no echo is received (nothing in range) |
| **soundAlarm()** | Non-blocking beep function. Uses `millis()` to toggle the buzzer pin HIGH/LOW every 300ms without using `delay()`, so the rest of the program can keep running while the alarm sounds |
| **checkRFID()** | Checks if a new RFID card is present and readable. If so, builds a formatted UID string from the card's bytes, prints it to Serial, then calls `isAuthorised()` to check if it matches a registered card. Authorised taps post a "toggle" event to the server and silence the buzzer. Unauthorised taps post an "unauthorised" event. Ends with `PICC_HaltA()` and a 500ms debounce delay |
| **isAuthorised()** | Takes a UID byte array and its size, iterates through `AUTHORISED_CARDS`, comparing each byte of the scanned card against each stored card. Returns `true` if all 4 bytes match any registered card, otherwise `false` |
| **postEvent()** | Sends an HTTP POST request to `SERVER_URL` with a JSON body containing the event type, alarm status, distance reading, and optionally a `cardUID` string. Only runs if WiFi is connected. Prints the HTTP response code to Serial for debugging |
| **waitForServer()** | Called once in `setup()`. Attempts to reach the server via a GET request to `COMMAND_URL` up to 10 times with 1 second between attempts. Returns `true` once the server responds with HTTP 200 or `false` if all attempts fail, allowing the device to boot even if the server is slow |
| **CheckServerCommand()** | Polls `COMMAND_URL` with a GET request and reads the JSON response. If the payload contains "disarmed" it sets `alarmArmed = true`. This allows the dashboard to remotely control the device. The ESP32 checks every loop cycle and updates its state accordingly |

---

## 🧪 Testing & Results

## Testing & Results

| Test # | Description                                  | Expected Results                                                                 | Actual Results                                                                                                      | Pass/Fail |
|--------|----------------------------------------------|----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|----------|
| 1      | ESP32 connects to Wi-Fi network              | Device successfully connects to Wi-Fi on startup (when it’s turned on or plugged in) | Device connects automatically to the Wi-Fi within a few seconds                                                     | Pass     |
| 2      | Backend server receives data from ESP32      | Sensor/event data is received from the device and displayed on dashboard in real time | Data successfully sent from device, received by the backend, and logged via API                                     | Pass     |
| 3      | Arming the device from the dashboard         | System arms immediately when the "Arm" button is pressed on the dashboard        | The alarm state instantly updates when the "Arm" button is pressed                                                  | Pass     |
| 4      | Disarming the device from the dashboard      | System disarms immediately when the "Disarm" button is pressed on the dashboard  | The alarm state instantly updates when the "Disarm" button is pressed                                               | Pass     |
| 5      | RFID card test                              | System ignores any unknown RFID tag                                              | System does not react when an unregistered card is tapped on the RFID sensor                                        | Pass     |
| 6      | Scheduled arm and disarm activation          | System automatically arms and disarms based on times set via the dashboard       | System automatically arms and disarms based on the set times without user input                                     | Pass     |
| 7      | RFID card arms and disarms the system        | RFID card arms/disarms the device and dashboard syncs with RFID                  | RFID successfully arms/disarms the system and dashboard updates based on device status                              | Pass     |

---

## ⚠️ Challenges & Solutions

| Challenge Encountered | Solution Applied |
|---|---|
| [e.g. Wi-Fi connection drops] | [e.g. Added reconnect logic] |
| [e.g. Noisy sensor readings] | [e.g. Applied moving average filter] |

---

## 🎥 Project Demonstration

- 📹 **Demo Video:** [Insert link here]
- 📊 **Presentation Slides:** [Insert link here]
- 🔗 **Live Dashboard (if applicable):** [Insert link here]

---

## 📚 References

### Assembling
1. Velxio — Free Online Circuit & Arduino Simulator | SPICE · ESP32 (https://velxio.dev/editor) — Used to play around and figure out pins for Assembling Hardware

### 3D Modelling
1. 3d print box (https://www.youtube.com/watch?v=CD1XSw5toJk) — used to guide how to use Fusion 360 software

2. Arduino case (https://youtu.be/LJtJcum1YjE?si=QVMqEfUTdd40qZLt) — Autodesk Fusion software guide

### Programming ESP32 & Dashboard
1. Tap to Trigger: RFID + ESP32 + OLED Tutorial = AWESOME (https://www.youtube.com/watch?v=7sqpxrMZuvo) — YouTube Video used to guide connecting our ESP32 and RFID

2. Installing ESP32 in Arduino IDE (Windows, Mac OS X, Linux) | Random Nerd Tutorials (•	https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/ ) — Used to install Arduino IDE

3. Ultrasonic security system | Arduino Project Hub (https://projecthub.arduino.cc/nimishac/ultrasonic-security-system-92e684?_gl=1*12u56cr*_up*MQ..*_ga*NTM3NzQyNDY5LjE3NzkxMTk1MDA.*_ga_NEXN8H46L5*czE3NzkxMTk0OTgkbzEkZzAkdDE3NzkxMTk0OTgkajYwJGwwJGgxMjI5MzEwNzE5) — Used as reference for code

4. FreeCodeCamp Node.js and Express.js - Full Backend Tutorial (https://www.youtube.com/watch?v=4vd-36QpFRc — Used for Dashboard Backend reference

5. ESP32 GPIO pins, differences - 3rd Party Boards - Arduino Forum (https://forum.arduino.cc/t/esp32-gpio-pins-differences/993683) — Used for physical vs. logical pin reference

---

## 📊 Assessment Rubric

> ⚠️ **Students: Do NOT modify this section.**

### 📝 T1 — 50 Marks

| Criteria | Excellent (5) | Good (4) | Satisfactory (3) | Needs Improvement (2) | Incomplete (0-1) | Marks |
|---|---|---|---|---|---|---|
| Project Proposal & Problem Statement | Clear, detailed, well-researched | Clear with minor gaps | Stated but lacks depth | Vague | Not submitted | /5 |
| System Design & Architecture | Detailed diagram + design decisions | Good diagram with some docs | Basic diagram | Incomplete | Not submitted | /5 |
| Hardware Component Selection | All justified with images | Most documented | Listed not justified | Incomplete | Not attempted | /5 |
| Circuit Diagram / Wiring | Complete + pin mapping | Mostly complete | Partial | Incomplete | Not submitted | /5 |
| GitHub Repository Setup | Well-structured, clear commits | Good with minor issues | Basic structure | Minimal | Repo not set up | /5 |
| Markdown Documentation Quality | Excellent: headings, tables, images, code | Good with minor issues | Basic Markdown | Minimal | None | /5 |
| GitHub Commit History (T1) | Regular commits, all members | Regular, most members | Some commits | Few | None | /5 |
| Initial Code / Prototype | Working + well-commented | Working + some comments | Partial prototype | Started, not working | None | /5 |
| Group Collaboration Evidence | Issues, PRs, commits from all | Good evidence | Some evidence | Minimal | None | /5 |
| Build Progress Photos | Step-by-step + descriptions | Good photos | Photos, few descriptions | Few photos | None | /5 |
| | | | | | | **T1 Total** | **/50** |

---

### 📝 T2 — 50 Marks *(Final Presentation: 20 May 2026, 10:00–15:00 SAST)*

| Criteria | Excellent (5) | Good (4) | Satisfactory (3) | Needs Improvement (2) | Incomplete (0-1) | Marks |
|---|---|---|---|---|---|---|
| Final Working Project | Fully functional | Mostly functional | Partially functional | Limited functionality | Not functional | /5 |
| Live Demonstration | Confident, all features | Good, minor issues | Core features shown | Partial/unclear | No demonstration | /5 |
| Testing & Results Documentation | All tests + analysis | Most documented | Some documented | Minimal | None | /5 |
| Code Quality & Comments | Clean, structured, fully commented | Good, most commented | Works, lacks comments | Messy/partial | None | /5 |
| Markdown Documentation Quality (T2) | Complete professional README | Good with minor gaps | Most sections filled | Incomplete | Minimal/none | /5 |
| GitHub Commit History (T2) | Consistent, all members | Good, most members | Some commits | Few | None | /5 |
| Challenges & Solutions | All documented with solutions | Most documented | Some documented | Vague | Not documented | /5 |
| System Architecture (Final) | Updated, matches build | Mostly matches | Partially updated | Outdated | Not present | /5 |
| Presentation Quality | Professional, all members | Good, all contribute | Acceptable | Weak/incomplete | None | /5 |
| References & Attribution | All properly listed | Most listed | Some listed | Minimal | None | /5 |
| | | | | | | **T2 Total** | **/50** |

---

### 🏆 Final Mark Summary

| Term | Marks Available | Marks Achieved |
|---|---|---|
| T1 | 50 | /50 |
| T2 | 50 | /50 |
| **Total** | **100** | **/100** |

---

> 📌 **Assessed by:** `[Lecturer Name]`  
> 📅 **Presentation Date:** 20 May 2026, 10:00–15:00 (SAST)  
> 📅 **Final Submission Deadline:** 20 May 2026  
> 🏫 **Institution:** Cape Peninsula University of Technology (CPUT)

---

## 🖼️ Embedding Images in Your README

> 💡 This guide is for all groups — use it to add photos, diagrams, and screenshots to your README.

### Method 1: Upload images to the `images/` folder in your repo ✅ *(Recommended)*

1. In your repository, create a folder called `images/`
2. Upload your image files (`.jpg`, `.png`, `.gif`) into that folder
3. Reference them in your README using a **relative path**:

```markdown
![Alt text describing the image](images/your-image-filename.png)
```

**Example:**
```markdown
![Circuit Diagram](images/circuit_diagram.png)
![Build Step 1](images/build_step1.jpg)
![System Architecture](images/architecture_diagram.png)
```

---

### Method 2: Drag & Drop into a GitHub Issue or PR (then copy the link)

1. Open any **Issue** or **Pull Request** in your repo
2. Drag and drop your image into the text box — GitHub will auto-upload it
3. GitHub generates a URL like:
   ```
   https://user-images.githubusercontent.com/.../.../image.png
   ```
4. Copy that URL and paste it into your README:

```markdown
![My Image](https://user-images.githubusercontent.com/your-generated-link-here.png)
```

---

### Method 3: Use a full GitHub URL (after uploading to the repo)

If your image is already in the repo (e.g., `images/photo.jpg` on the `main` branch):

```markdown
![Photo](https://github.com/cput-it-diploma/cput-it-diploma-iot-project_2026-iot_elective_project_2026-IoT_2026/blob/main/images/photo.jpg?raw=true)
```

> ⚠️ Always add `?raw=true` at the end when using a full GitHub blob URL, otherwise the image won't render.

---

### ✅ Image Embedding Checklist

- [ ] Image file is uploaded to the `images/` folder in your repo
- [ ] File name has **no spaces** (use underscores: `circuit_diagram.png` ✅, not `circuit diagram.png` ❌)
- [ ] You used the correct Markdown syntax: `![Alt text](path/to/image.png)`
- [ ] The path is correct (check uppercase/lowercase — GitHub paths are case-sensitive)
- [ ] Image renders correctly when you preview the README

---

### 📐 Resizing Images (optional)

Markdown doesn't support resizing natively, but you can use HTML inside your README:

```html
<img src="images/circuit_diagram.png" alt="Circuit Diagram" width="600"/>
```

This sets the image width to 600px. Adjust as needed.

---

*Documented using Markdown on GitHub — CPUT IT Diploma IoT Elective 2026* 🚀

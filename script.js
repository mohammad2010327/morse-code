const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
  'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
  'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
  'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....',
  '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

const reverseMorseCode = Object.entries(morseCode).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

function convertToMorse() {
  const input = document.getElementById("input").value.toUpperCase();
  const output = input.split('').map(char => morseCode[char] || '').join(' ');
  document.getElementById("output").innerText = output;
}

function convertToText() {
  const input = document.getElementById("input").value.trim();
  const output = input.split(' ').map(code => reverseMorseCode[code] || '').join('');
  document.getElementById("output").innerText = output;
}

function speakMorse() {
  const output = document.getElementById("output").innerText;
  if (!output) {
    alert("لا يوجد شيفرة مورس لتحويلها إلى صوت.");
    return;
  }

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const dotDuration = 0.2; // مدة النقطة بالثواني
  const dashDuration = dotDuration * 3; // مدة الشرطة
  const gapDuration = dotDuration; // الفجوة بين النقاط والشرطات
  const letterGapDuration = dotDuration * 3; // الفجوة بين الحروف
  const wordGapDuration = dotDuration * 7; // الفجوة بين الكلمات

  let currentTime = audioContext.currentTime;

  function playBeep(duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration);
    currentTime += duration + gapDuration;
  }

  for (const char of output) {
    if (char === ".") {
      playBeep(dotDuration); // نقطة
    } else if (char === "-") {
      playBeep(dashDuration); // شرطة
    } else if (char === " ") {
      currentTime += letterGapDuration; // فجوة بين الحروف
    } else if (char === "/") {
      currentTime += wordGapDuration; // فجوة بين الكلمات
    }
  }
}

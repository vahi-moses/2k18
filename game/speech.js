var synth = window.speechSynthesis;

say_n_word = function() {
  var utterThis = new SpeechSynthesisUtterance("Say n word und szpilen хуй");
  utterThis.voice = synth.getVoices()[17];
  utterThis.pitch = 1;
  utterThis.rate = 1;
  synth.speak(utterThis);
}

say_n_word()
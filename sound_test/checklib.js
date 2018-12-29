window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {

    //Synth.generate(sound, note, octave, duration);
    var piano = Synth.createInstrument('edm');
    piano.play('C', 4, 2); // plays C4 for 2s using the 'piano' sound profile
  });
}
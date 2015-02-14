(function (document, Tone) { 'use strict';

    //create one of Tone's built-in synthesizers
    var synth = new Tone.MonoSynth();
    var synth2 = new Tone.MonoSynth();
    var synth3 = new Tone.MonoSynth();

    var elem = {
        body : document.body,
        toggle : document.getElementById('btn_playToggle'),
        playA : document.getElementById('btn_playA'),
        playB : document.getElementById('btn_playB'),
        playC : document.getElementById('btn_playC'),
        playD : document.getElementById('btn_playD')
    };

    var bgOn = false;
    var play = false;

    var toggleBackground = function () {
        bgOn = !bgOn;
        if (bgOn) {
            elem.body.style.backgroundColor = '#ddd';
        } else {
            elem.body.style.backgroundColor = 'white';
        }
    };

    var togglePlayback = function () {
        play = !play;
        if (play) {
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
        console.log(play);
    };

    elem.toggle.addEventListener('click', function () {
        togglePlayback();
    });
    elem.playA.addEventListener('mousedown', function () {
        synth.triggerAttack('C2');
    });
    elem.playB.addEventListener('mousedown', function () {
        synth.triggerAttack('E2');
    });
    elem.playC.addEventListener('mousedown', function () {
        synth.triggerAttack('G2');
    });
    elem.playD.addEventListener('mousedown', function () {
        synth.triggerAttack('C3');
    });


    document.addEventListener('mouseup', function () {
        synth.triggerRelease();
    });



    // SINGLE REPEATING NOTE
    // ----------------------------------------------------------------------------

    // connect the synth to the master output channel
    synth.toMaster();
    synth2.toMaster();
    synth3.toMaster();

    //create a callback which is invoked every quarter note
    Tone.Transport.setInterval(function(time){
        synth.triggerAttackRelease('C2', '64n', time);
        synth2.triggerAttackRelease('E2', '64n', time);
        synth3.triggerAttackRelease('G2', '64n', time);
        toggleBackground();
    }, '4n');

    //start the transport
    //Tone.Transport.start();



    // OSCILLATOR
    // ----------------------------------------------------------------------------

    /*
    var osc = new Tone.Oscillator(110, "sine");
    //connect it to the master output
    osc.toMaster();
    osc.start();

    */




/*    
    // ArpeggiatorEffect
    // ----------------------------------------------------------------------------

    var synth = new Tone.MonoSynth();
    var filter = new Tone.Filter();

    synth.connect(filter);
    filter.toMaster();

    var lfo = new Tone.LFO("16n", 100, 1400);
    lfo.connect(filter.frequency);
    lfo.sync();

    var notes = ["C4", "E4", "G4", "A4"];
    var position = 0;

    var synth = new Tone.MonoSynth();
    synth.toMaster();

    Tone.Transport.setInterval(function(time){
        var note = notes[position++];
        position = position % notes.length;
        synth.triggerAttackRelease(note, "8n", time);
    }, "32n");

    //Tone.Transport.start();
    
*/
})(document, Tone);
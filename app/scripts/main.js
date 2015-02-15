(function (document, Tone) { 'use strict';

    var elem = {
        body : document.body,
        toggle : document.getElementById('btn_playToggle'),
        btnA : document.getElementById('btn_playA'),
        btnB : document.getElementById('btn_playB'),
        btnC : document.getElementById('btn_playC'),
        btnD : document.getElementById('btn_playD')
    };

    // SYNTHS
    // ----------------------------------------------------------------------------
    //create one of Tone's built-in synthesizers
    var synth1 = new Tone.MonoSynth();
    var synth2 = new Tone.MonoSynth();
    var synth3 = new Tone.MonoSynth();
    var synth4 = new Tone.MonoSynth();
    synth1.toMaster();
    synth2.toMaster();
    synth3.toMaster();
    synth4.toMaster();

    // OSCILLATORS
    // ----------------------------------------------------------------------------
    var osc1 = new Tone.Oscillator(30, "triangle");
    var osc2 = new Tone.Oscillator(32, "triangle");
    var osc3 = new Tone.Oscillator(34, "triangle");
    var osc4 = new Tone.Oscillator(36, "triangle");
    osc1.toMaster();
    osc2.toMaster();
    osc3.toMaster();
    osc4.toMaster();

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



    var playback = false;
    var synth1Active = false;
    var synth2Active = false;
    var synth3Active = false;
    var synth4Active = false;

    var togglePlayback = function () {
        playback = !playback;
        if (playback) {
            osc1.start();
            osc2.start();
            osc3.start();
            osc4.start();
        } else {
            osc1.stop();
            osc2.stop();
            osc3.stop();
            osc4.stop();
        }
    };

    var playA = function () {
        if (synth1Active) return;
        synth1Active = true;
        synth1.triggerAttack('C2');
    };
    var playB = function () {
        if (synth2Active) return;
        synth2Active = true;
        synth2.triggerAttack('E2');
    };
    var playC = function () {
        if (synth3Active) return;
        synth3Active = true;
        synth3.triggerAttack('G2');
    };
    var playD = function () {
        if (synth4Active) return;
        synth4Active = true;
        synth4.triggerAttack('C3');
    };
    var stopPlay = function () {
        if (synth1Active) {
            synth1.triggerRelease();
            synth1Active = false;
        }
        if (synth2Active) {
            synth2.triggerRelease();
            synth2Active = false;
        }
        if (synth3Active) {
            synth3.triggerRelease();
            synth3Active = false;
        }
        if (synth4Active) {
            synth4.triggerRelease();
            synth4Active = false;
        }
    };

    /* DOM BINDING */
    elem.toggle.addEventListener('click', function () {
        togglePlayback();
    });
    elem.btnA.addEventListener('mousedown', playA);
    elem.btnB.addEventListener('mousedown', playB);
    elem.btnC.addEventListener('mousedown', playC);
    elem.btnD.addEventListener('mousedown', playD);
    document.addEventListener('mouseup', stopPlay);


    Mousetrap.bind('q', playA, 'keypress');
    Mousetrap.bind('w', playB, 'keypress');
    Mousetrap.bind('e', playC, 'keypress');
    Mousetrap.bind('r', playD, 'keypress');
    Mousetrap.bind(['q', 'w', 'e', 'r'], stopPlay, 'keyup');


    window.osc1 = osc1;
    window.osc2 = osc2;
    window.osc3 = osc3;
    window.osc4 = osc4;

})(document, Tone);
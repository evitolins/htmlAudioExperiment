(function (document, Tone) { 'use strict';

    var elem = {
        toggle : document.getElementById('btn_playToggle'),
        btnA : document.getElementById('btn_playA'),
        btnB : document.getElementById('btn_playB'),
        btnC : document.getElementById('btn_playC'),
        btnD : document.getElementById('btn_playD'),
        osc1Freq : document.getElementById('osc1_freq'),
        osc2Freq : document.getElementById('osc2_freq'),
        osc3Freq : document.getElementById('osc3_freq'),
        osc4Freq : document.getElementById('osc4_freq')
    };

    // SYNTHS
    // ----------------------------------------------------------------------------
    //create one of Tone's built-in synthesizers
    var synth1 = new Tone.AMSynth();
    var synth2 = new Tone.AMSynth();
    var synth3 = new Tone.AMSynth();
    var synth4 = new Tone.AMSynth();
    synth1.toMaster();
    synth2.toMaster();
    synth3.toMaster();
    synth4.toMaster();

    // OSCILLATORS
    // ----------------------------------------------------------------------------
    var osc1 = new Tone.Oscillator(47, "sine");
    var osc2 = new Tone.Oscillator(50, "sine");
    var osc3 = new Tone.Oscillator(62, "sine");
    var osc4 = new Tone.Oscillator(63, "sine");
    osc1.toMaster();
    osc2.toMaster();
    osc3.toMaster();
    osc4.toMaster();

    
    // ArpeggiatorEffect
    // ----------------------------------------------------------------------------

/*    var synth = new Tone.MonoSynth();
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
    }, "8n");

    Tone.Transport.start();*/
    




    var synth1Active = false;
    var synth2Active = false;
    var synth3Active = false;
    var synth4Active = false;

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
    elem.btnA.addEventListener('mousedown', playA);
    elem.btnB.addEventListener('mousedown', playB);
    elem.btnC.addEventListener('mousedown', playC);
    elem.btnD.addEventListener('mousedown', playD);
    document.addEventListener('mouseup', stopPlay);


    elem.osc1Freq.addEventListener('change', function () {
       osc1.setFrequency(this.value);
    });
    elem.osc2Freq.addEventListener('change', function () {
       osc2.setFrequency(this.value);
    });
    elem.osc3Freq.addEventListener('change', function () {
       osc3.setFrequency(this.value);
    });
    elem.osc4Freq.addEventListener('change', function () {
       osc4.setFrequency(this.value);
    });


    $("input[name=inlineRadioOptions1]").change(function () {
        osc1.setType(this.value);
    });
    $("input[name=inlineRadioOptions2]").change(function () {
        osc2.setType(this.value);
    });
    $("input[name=inlineRadioOptions3]").change(function () {
        osc3.setType(this.value);
    });
    $("input[name=inlineRadioOptions4]").change(function () {
        osc4.setType(this.value);
    });

    $("input[name=osc1_on]").change(function () {
        if (this.value === "on") {
            osc1.start();
        } else {
            osc1.stop();
        }
    });
    $("input[name=osc2_on]").change(function () {
        if (this.value === "on") {
            osc2.start();
        } else {
            osc2.stop();
        }
    });
    $("input[name=osc3_on]").change(function () {
        if (this.value === "on") {
            osc3.start();
        } else {
            osc3.stop();
        }
    });
    $("input[name=osc4_on]").change(function () {
        if (this.value === "on") {
            osc4.start();
        } else {
            osc4.stop();
        }
    });



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
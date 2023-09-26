const csoundjs = "./csound.js";
let csound = null;

let isLoaded = false;
let isOn = false;
let isStarted = false;
//const csd = './csoundTestFile.csd'

export async function loadCsdFromString(string) {
    await loadCsound();
    await copyStringToLocal(string, "local.csd");
    isLoaded = true;
}

export async function start() {
    await loadCsound();
    if (isLoaded && !isStarted) {
        await csound.compileCsd("local.csd");
        // await copyUrlToLocal(csd, csd); // are there not supposed to be semicolons here?
        // await csound.compileCsd(csd);
        await csound.start();
        isOn = true;
        isStarted = true;
    }
    if (!isOn) {
        await csound.resume();
        isOn = true;
    }
}

let count = 0;
async function loadCsound() {
    if (csound == null) {
        const { Csound } = await import(csoundjs);
        csound = await Csound();
        await csound.on("message", handleMessage);
    }
}

function handleMessage(message) {
    let element = document.getElementById('console');
    element.value += message + '\n';
    element.scrollTop = 99999;
    if (count == 1000) {
        count = 0;
        element.value == "";
    }
    count += 1;
};

// async function copyUrlToLocal(src, dest) {
//     // fetch the file
//     let srcfile = await fetch(src)
//     // get the file data as an array
//     let dat = await srcfile.arrayBuffer();
//     // write the data as a new file in the filesystem
//     await csound.fs.writeFile(dest, new Uint8Array(dat));
// }

async function copyStringToLocal(string, dest) {
    let dat = new TextEncoder().encode(string);
    // write the data as a new file in the filesystem
    await csound.fs.writeFile(dest, new Uint8Array(dat));
}

export async function pause() {
    if (csound != null) {
        if (isOn) {
            await csound.pause();
            isOn = false;
        } else {
            await csound.resume();
            isOn = true;
        }
    }
}

export async function rewind() {
    if (csound != null) {
        await csound.rewindScore(); // for CsScore statements 
        isStarted = false;
    }
}

export function generateCsd(instr, score = "") {
    return `
    <CsoundSynthesizer>
    <CsOptions>
    -odac -d
    </CsOptions>
    <CsInstruments>
    
    sr = 44100
    ksmps = 32
    nchnls = 2
    0dbfs = 1
    
    ${instr}
    
    </CsInstruments>
    <CsScore>
    ${score}
    </CsScore>
    </CsoundSynthesizer>
    `
}
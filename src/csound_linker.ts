import { Csound, CsoundObj } from "@csound/browser";
let csound: CsoundObj | null = null;

let isLoaded = false;
let isOn = false;
let isStarted = false;
//const csd = './csoundTestFile.csd'

export async function loadCsdFromString(string: string) {
    await loadCsound(true);
    await copyStringToLocal(string, "local.csd");
    isLoaded = true;
}

// TODO: redo start() function to be clearer
export async function start() {
    await loadCsound();
    if (isLoaded && !isStarted) {
        await csound.compileCsd("local.csd");
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
async function loadCsound(forceReload = false) {
    if (csound == null || forceReload) {
        isOn = false;
        isLoaded = false;
        isStarted = false;
        csound = await Csound();
        await csound.on("message", handleMessage);
        handleMessage("\n================\nCsound loaded\n================");
    }
}

function handleMessage(message: string) {
    let element = document.getElementById('console') as HTMLTextAreaElement;
    element.value += message + '\n';
    element.scrollTop = 99999;
    if (count == 1000) {
        count = 0;
        element.value == "";
    }
    count += 1;
};

async function copyStringToLocal(string: string, dest: string) {
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

export function generateCsd(instr: string, score = "") {
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
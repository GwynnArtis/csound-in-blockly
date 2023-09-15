const csoundjs = "./csound.js";
let csound = null;

let isOn = false;
const csd = './csoundTestFile.csd'

async function start() {
    if (csound == null) {
        const { Csound } = await import(csoundjs);
        csound = await Csound();
        await copyUrlToLocal(csd, csd) // are there not supposed to be semicolons here?
        await csound.compileCsd(csd)
        await csound.on("message", handleMessage); // handles csound messages - will handle later
        await csound.start();
        isOn = true;
    }
    if (!isOn) {
        await csound.resume();
        isOn = true;
    }
}

let count = 0;
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

async function copyUrlToLocal(src, dest) {
    // fetch the file
    let srcfile = await fetch(src)
    // get the file data as an array
    let dat = await srcfile.arrayBuffer();
    // write the data as a new file in the filesystem
    await csound.fs.writeFile(dest, new Uint8Array(dat));
}

async function pause() {
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

// const code = `
// instr 1
//     out linenr(oscili(p4, p5), 0.01, 0.5, 0.01)
// endin
// schedule(1, 0, 1, 0.5, 440)
// `;

// async function play() {
//     if(csound == null) {
//         const {Csound} = await import(csoundjs);
//         csound = await Csound();
//         await csound.setOption("-odac");
//         await csound.compileOrc(code);
//         await csound.start();
//     }
//     else await csound.inputMessage(`i1 0 1 0.2 440`);
// }
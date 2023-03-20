const tips = [
    "Asking the gods for permission...",
    "UwU",
    "OwO",
    "༼ つ ◕_◕ ༽つ",
    "o((>ω< ))o",
    "ヽ( ͡° ͜ʖ ͡°)ﾉ",
    "ヽ༼ຈل͜ຈ༽ﾉ",
    "O.O",
    "(☞ﾟヮﾟ)☞"
];

let usedTips = [];

let iteration = 0;


// ! BETA CODE

async function createTip(id = "loadingModal") {

    console.log("Creating tip");
    const modal = document.getElementById(id);
    console.log("Looking for modal with id " + id + "");

    if (!modal) throw new Error("No modal with that ID exists");

    console.log("Modal found");
    console.log("Setting up tipper");
    setInterval(() => {
        // Check if the iterations are over 6, if so, close the modal
        if (iteration > 6) {
            modal.style.display = "none";
            return;
        }
        console.log("Getting random tip");
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        console.log("Got random tip: " + randomTip);
        console.log("Checking if tip has been used");
        if (usedTips.includes(randomTip)) {
            return;
        }
        console.log("Tip has not been used");
        usedTips.push(randomTip);
        console.log("Pushed tip to used tips");
        
        console.log("Setting tip text");
        const tipTxt = modal.querySelector("#tips-txt");

        tipTxt.innerHTML = randomTip;
        iteration++;

        console.log(`Updated tip text to ${randomTip}`)
    }, 2000);

}



createTip();
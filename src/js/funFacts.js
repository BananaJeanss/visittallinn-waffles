const tallinnFacts = [
    "Tallinn's Old Town is one of the best-preserved medieval cities in Europe and is a UNESCO World Heritage Site.",
    "Tallinn was the European Capital of Culture in 2011, sharing the title with Turku, Finland.",
    "The city's name 'Tallinn' means 'Danish Castle' in Estonian, referencing its founding by Danish crusaders in 1219.",
    "Tallinn is home to Skype - the popular video calling service was developed here in 2003.",
    "The city has more startups per capita than any other European city, earning it the nickname 'Silicon Valley of Europe'.",
    "Tallinn's medieval city walls are still 85% intact, with 26 of the original 46 defense towers still standing.",
    "The Alexander Nevsky Cathedral was built in 1894-1900 and is the largest Orthodox cathedral in Estonia.",
    "Tallinn offers free public Wi-Fi throughout the entire city center - one of the first cities in the world to do so.",
    "The city is only 80km (50 miles) south of Helsinki, Finland, making it easily accessible by ferry.",
    "Tallinn's Toompea Hill is where the Estonian Parliament meets in the pink Toompea Castle.",
    "The city's medieval Town Hall dates back to the 13th century and still hosts concerts and events.",
    "Tallinn is one of the world's most digitally advanced cities - 99% of government services are available online.",
    "The Tallinn Song Festival Grounds can hold up to 100,000 people and hosts the famous Song Festival every 5 years.",
    "Kadriorg Palace was built by Peter the Great of Russia for his wife Catherine I in 1718.",
    "Tallinn's Viru Gates are the only remaining gates of the original 6 that led into the medieval Old Town.",
    "The city has been continuously inhabited for over 5,000 years, with archaeological evidence dating back to 3000 BC.",
    "Tallinn is home to the world's first Christmas tree market, which began in the Town Hall Square in 1441.",
    "The city's public transport system is completely free for all residents - a pioneering initiative started in 2013.",
    "Telliskivi Creative City is a former industrial complex turned into the largest creative hub in Estonia.",
    "Tallinn's medieval merchants' houses often had colorful facades to help illiterate people identify different businesses."
];

let lastFactIndex = -1;

function generateRandomFact() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * tallinnFacts.length);
    } while (randomIndex === lastFactIndex && tallinnFacts.length > 1);

    lastFactIndex = randomIndex;
    return tallinnFacts[randomIndex];
}

function displayFunFact() {
    const factText = document.getElementById('fun-fact-text');
    const generateBtn = document.getElementById('generate-fun-fact');
    const factDisplay = document.getElementById('fun-fact-display');

    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;
    factDisplay.classList.add('loading');

    setTimeout(() => {
        const newFact = generateRandomFact();
        factText.textContent = newFact;

        generateBtn.textContent = 'Generate Another Fun Fact';
        generateBtn.disabled = false;
        factDisplay.classList.remove('loading');
        factDisplay.classList.add('fact-revealed');

        setTimeout(() => {
            factDisplay.classList.remove('fact-revealed');
        }, 500);

    }, 800);
}

document.addEventListener('DOMContentLoaded', function () {
    const generateBtn = document.getElementById('generate-fun-fact');
    if (generateBtn) {
        generateBtn.addEventListener('click', displayFunFact);
    }
});
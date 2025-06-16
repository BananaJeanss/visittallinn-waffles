const attractions = {
    history: [
        "Tallinn Old Town Tour",
        "Toompea Castle",
        "Alexander Nevsky Cathedral",
        "Town Hall Square",
        "Medieval City Walls",
        "Estonian History Museum"
    ],
    food: [
        "Traditional Estonian Restaurant",
        "Tallinn Food Tour",
        "Local Market Visit",
        "Craft Beer Tasting",
        "Medieval Banquet",
        "Street Food Walking Tour"
    ],
    nature: [
        "Kadriorg Park",
        "Tallinn Botanic Garden",
        "Pirita Beach",
        "Lahemaa National Park Day Trip",
        "Naissaar Island Ferry",
        "Toompea Hill Walk"
    ],
    nightlife: [
        "Old Town Pub Crawl",
        "Telliskivi Creative City",
        "Rooftop Bar Experience",
        "Live Music Venues",
        "Night Photography Walk",
        "Estonian Sauna Experience"
    ],
    shopping: [
        "Viru Centre Shopping",
        "Tallinn Creative Hub",
        "Antique Shopping in Old Town",
        "Local Craft Markets",
        "Estonian Design Shops",
        "Souvenir Hunting"
    ]
};

function setplanwarning(warning) {
    const warningElement = document.getElementById('plan-warning');
    warningElement.textContent = warning;
}

function generateTripPlan() {
    const duration = parseInt(document.getElementById('trip-duration').value);
    const budget = parseInt(document.getElementById('budget-range').value);
    const interests = Array.from(document.querySelectorAll('.interest-checkbox:checked')).map(cb => cb.value);

    if (interests.length === 0) {
        setplanwarning('Please select at least one interest to generate your trip plan!');
        return;
    }
    setplanwarning('');

    const resultsContainer = document.getElementById('planner-results');

    let planHTML = '<div class="trip-plan"><h3>Your Personalized Trip Plan</h3>';
    planHTML += `<div class="budget-summary" style="margin-bottom: 20px;"><strong>Estimated Budget: €${budget * duration} total</strong></div></div>`;

    for (let day = 1; day <= duration; day++) {
        planHTML += `<div class="day-plan"><h4>Day ${day}</h4>`;

        const dayActivities = generateDayActivities(interests, budget);

        dayActivities.forEach(activity => {
            planHTML += `<div class="activity">• ${activity}</div>`;
        });

        planHTML += '</div>';
    }

    resultsContainer.innerHTML = planHTML;
}

function updateBudgetDisplay() {
    const budgetRange = document.getElementById('budget-range');
    const budgetDisplay = document.getElementById('budget-display');

    budgetRange.addEventListener('input', function () {
        budgetDisplay.textContent = '€' + this.value;

        if (this.value < 50) {
            budgetDisplay.style.color = '#27ae60'; // green
        } else if (this.value < 100) {
            budgetDisplay.style.color = '#f39c12'; // orange
        } else {
            budgetDisplay.style.color = '#e74c3c'; // red
        }
    });
}

function resetTripPlanner() {
    // reset
    document.getElementById('trip-duration').value = '1';
    document.getElementById('budget-range').value = '80';
    document.getElementById('budget-display').textContent = '€80';
    document.getElementById('budget-display').style.color = '#e74c3c';

    document.querySelectorAll('.interest-checkbox').forEach(cb => {
        cb.checked = false;
    });

    const resultsContainer = document.getElementById('planner-results');
    resultsContainer.innerHTML = `
        <div class="results-placeholder">
            <h3>Your personalized trip plan will appear here!</h3>
            <p>Fill out the form and click "Generate Trip Plan" to get started.</p>
        </div>
    `;

    const resetButton = document.getElementById('reset-plan');
    setplanwarning('');
    const originalText = resetButton.textContent;
    resetButton.textContent = 'Reset!';
    resetButton.style.background = '#27ae60';

    setTimeout(() => {
        resetButton.textContent = originalText;
        resetButton.style.background = '#95a5a6';
    }, 500);
}

function generateDayActivities(interests, budget) {
    const activities = [];
    const activitiesPerDay = budget > 100 ? 4 : budget > 60 ? 3 : 2;

    interests.forEach(interest => {
        if (attractions[interest]) {
            const randomActivity = attractions[interest][Math.floor(Math.random() * attractions[interest].length)];
            activities.push(randomActivity);
        }
    });

    while (activities.length < activitiesPerDay && activities.length < 4) {
        const randomInterest = interests[Math.floor(Math.random() * interests.length)];
        const randomActivity = attractions[randomInterest][Math.floor(Math.random() * attractions[randomInterest].length)];

        if (!activities.includes(randomActivity)) {
            activities.push(randomActivity);
        }
    }

    return activities.slice(0, activitiesPerDay);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate-plan').addEventListener('click', generateTripPlan);
    document.getElementById('reset-plan').addEventListener('click', resetTripPlanner);

    updateBudgetDisplay();
});
exports.calculateWeight = function(key) {
    var ref = global.db.ref('intake/' + key);

    ref.once('value', function(data) {
        var responses = data.responses;
        var weight = 0; // start
        // handle keys manually

        if (responses['onStreets'].answer > 24 || responses['housedHomeless'].answer > 4) {
            weight++;
        }

        if ((parseInt(responses['emergencyRoom'].answer) +
                parseInt(responses['police'].answer) +
                parseInt(responses['ambulance'].answer) +
                parseInt(responses['crisisService'].answer) +
                parseInt(responses['hospitalized'].answer)) >= 4) {
            weight++;
        }

        if (responses['attacked'].answer || responses['threatened'].answer) {
            weight++;
        }

        if (responses['legalStuff'].answer) {
            weight++;
        }

        if (responses['forceOrTrick'].answer ||
            responses['riskyThings'].answer ||
            responses['sleepLocation'].answer !== 'shelter') {
            weight++;
        }

        if (responses['oweMoney'].answer ||
            !responses['moneyIncome'].answer ||
            !responses['meetExpenses'].answer) {
            weight++;
        }

        if (!responses['plannedActivities'].answer) {
            weight++;
        }

        if (responses['friendsOrFamilyDislike'].answer ||
            responses['friendsOrFamilySteal'].answer) {
            weight++;
        }

        if (responses['healthcareLocation'].answer === 'Do not go for healthcare') {
            weight++;
        }

        var medical = false;
        if (responses['kidneyDisease'].answer) {
            medical = true;
            weight++;
        }

        if (responses['frostbite'].answer) {
            medical = true;
            weight++;
        }

        if (responses['liverDisease'].answer) {
            medical = true;
            weight++;
        }

        if (responses['hivAids'].answer) {
            medical = true;
            weight++;
        }

        // Model the "mark X"
        var additionalMedical = false;
        if (responses['heatStroke'].answer ||
            responses['heartDisease'].answer ||
            responses['emphysema'].answer ||
            responses['diabetes'].answer ||
            responses['asthma'].answer ||
            responses['cancer'].answer ||
            responses['hepatitisC'].answer) {
            additionalMedical = true;
        }

        var substanceUse = false;
        if (responses['drugAlcoholAbuse'].answer ||
            responses['drugUsageLastMonth'].answer ||
            responses['injectionDrugs'].answer ||
            responses['relapse'].answer ||
            responses['nonBeverageAlcohol'].answer ||
            responses['blackOut'].answer) {
            substanceUse = true;
            weight++;
        }

        var mentalHealth = false;
        if (responses['mentalHospitalAgainstWill'].answer ||
            responses['emergencyRoom'].answer ||
            responses['psychiatrist'].answer ||
            responses['brainInjury'].answer ||
            responses['learningDisablity'].answer ||
            responses['problemsConcentrating'].answer) {
            mentalHealth = true;
            weight++;
        }

        if (medical || additionalMedical || substanceUse || mentalHealth) {
            weight++;
        }

        if (responses['medicinesNotTaken'].answer) {
            weight++;
        }

        if (responses['abuseCausedHomelessness'].answer) {
            weight++;
        }

        data.weight = weight;

        ref.set(data);
    });
}

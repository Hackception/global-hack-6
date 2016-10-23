var enums = require('./enums');

module.exports = [{ // 0
    question: {
        text: 'After the tone, say your first name',
        type: enums.questionTypes.TEXT,
        maxLength: 60,
        key: 'firstName'
    },
    next: 1
}, { // 1
    question: {
        text: 'After the tone, say your last name',
        type: enums.questionTypes.TEXT,
        maxLength: 60,
        key: 'lastName'
    },
    next: 2
}, { // 2
    question: {
        text: 'After the tone, say your nick name',
        type: enums.questionTypes.TEXT,
        maxLength: 60,
        key: 'nickName'
    },
    next: 3
}, { // 3
    question: {
        text: 'Enter your social security number',
        type: enums.questionTypes.INPUT,
        timeout: 15,
        key: 'social'
    },
    next: 4
}, { // 4
    question: {
        text: 'Enter your age in years',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'age'
    },
    next: 5
}, { // 5
    question: {
        text: 'Enter the year of your birth',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'birthYear'
    },
    next: 6
}, { // 6
    question: {
        text: 'Enter the month of your birth',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'birthMonth'
    },
    next: 7
}, { // 7
    question: {
        text: 'Enter the day of your birth',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'birthDay'
    },
    next: 8
}, { // 8
    question: {
        text: 'Enter the total amount of time you have lived on the streets or in shelters, in months',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'onStreets'
    },
    next: 9
}, { // 9
    question: {
        text: 'Enter the total amount of time you have been housed and then homeless again in the past three years',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'housedHomeless'
    },
    next: 10
}, { // 10
    question: {
        text: 'Enter the total amount of times you have been to the emergency room in the past six months',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'emergencyRoom'
    },
    next: 11
}, { // 11
    question: {
        text: 'Enter the total amount of times you have had an interaction with the police in the past six months',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'police'
    },
    next: 12
}, { // 12
    question: {
        text: 'Enter the total amount of times you have been taken to the hospital in an ambulance in the past six months',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'ambulance'
    },
    next: 13
}, { // 13
    question: {
        text: 'Enter the total amount of times you have used a crisis service like a distress center or suicide prevention hotline in the past six months',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'crisisService'
    },
    next: 14
}, { // 14
    question: {
        text: 'Enter the total amount of times you have been hospitalized as an in-patient, including mental health hospitals in the past six months',
        type: enums.questionTypes.INPUT,
        timeout: 10,
        key: 'hospitalized'
    },
    next: 15
}, { // 15
    question: {
        text: 'have you been attacked or beaten up since becoming homeless?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'attacked'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 16
        },
        '2': {
            name: 'no',
            store: false,
            next: 16
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 16
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 17
        }
    }
}, { // 16
    question: {
        text: 'have you threatened to or tried to harm yourself or anyone else in the last year?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'threatened'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 17
        },
        '2': {
            name: 'no',
            store: false,
            next: 17
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 17
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 17
        }
    }
}, { // 17
    question: {
        text: 'Do you have any legal stuff going on right now that may result in you being locked up or having to pay fines?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'legalStuff'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 18
        },
        '2': {
            name: 'no',
            store: false,
            next: 18
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 18
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 18
        }
    }
}, { // 18
    question: {
        text: 'Does anybody force or trick you to do things you might not want to do?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'forceOrTrick'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 19
        },
        '2': {
            name: 'no',
            store: false,
            next: 19
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 19
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 20
        }
    }
}, { // 19
    question: {
        text: 'Do you ever do things that may be considered to be risky like exchanging sex for money, running drugs for someone, have unprotected sex with someone you don\'t really know, share a needle, or anything like that?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'riskyThings'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 20
        },
        '2': {
            name: 'no',
            store: false,
            next: 20
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 20
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 20
        }
    }
}, { // 20
    question: {
        text: 'Of the following options, please select the one you sleep at most often.',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'sleepLocation'
    },
    values: {
        '1': {
            name: 'shelter',
            store: 'shelter',
            next: 22
        },
        '2': {
            name: 'streetcar, sidewalk, or doorway',
            store: 'streetcar, sidewalk, or doorway',
            next: 22
        },
        '3': {
            name: 'car, van, or RV',
            store: 'car, van, or RV',
            next: 22
        },
        '4': {
            name: 'Bus or subway',
            store: 'Bus or subway',
            next: 22
        },
        '5': {
            name: 'Beach, riverbed, or park',
            store: 'Beach, riverbed, or park',
            next: 22
        },
        '6': {
            name: 'Other',
            store: 'Other',
            next: 21
        }
    }
}, { // 21
    question: {
        text: 'Would you please specify which other location?',
        type: enums.questionTypes.TEXT,
        maxLength: 60,
        key: 'otherLocationSleep'
    },
    next: 22
}, { // 22
    question: {
        text: 'Is there anybody that thinks you owe them money?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'oweMoney'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 23
        },
        '2': {
            name: 'no',
            store: false,
            next: 23
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 23
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 25
        }
    }
}, { // 23
    question: {
        text: 'Do you have any money coming in on a regular basis, like a job or government benefits or even working under the table, binning or bottle collecting, sex work, odd jobs, day labor, or anything like that?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'moneyIncome'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 24
        },
        '2': {
            name: 'no',
            store: false,
            next: 24
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 24
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 25
        }
    }
}, { // 24
    question: {
        text: 'Do you have enough money to meet all your expenses on a monthly basis?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'meetExpenses'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 25
        },
        '2': {
            name: 'no',
            store: false,
            next: 25
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 25
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 25
        }
    }
}, { // 25
    question: {
        text: 'Do you have planned activities each day other than just surviving that bring you happiness and fulfillment?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'plannedActivities'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 26
        },
        '2': {
            name: 'no',
            store: false,
            next: 26
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 26
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 26
        }
    }
}, { // 26
    question: {
        text: 'Do you have any friends, family, or other people in your life out of convenience or necessity, but you do not like their company?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'friendsOrFamily'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 27
        },
        '2': {
            name: 'no',
            store: false,
            next: 27
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 27
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 28
        }
    }
}, { // 27
    question: {
        text: 'Do any friends, family, or other people in your life ever take your money, borrow cigarettes, use your drugs, drink your alcohol, or get you to do things you don\'t really want to do?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'friendsOrFamily'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 28
        },
        '2': {
            name: 'no',
            store: false,
            next: 28
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 28
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 28
        }
    }
}, { // 28
    question: {
        text: 'Of the following options, Where do you usually go for healthcare or when you\'re not feeling well?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'healthcareLocation'
    },
    values: {
        '1': {
            name: 'hospital',
            store: 'hospital',
            next: 30
        },
        '2': {
            name: 'clinic',
            store: 'clinic',
            next: 30
        },
        '3': {
            name: 'VA',
            store: 'VA',
            next: 30
        },
        '4': {
            name: 'Do not go for healthcare',
            store: 'Do not go for healthcare',
            next: 30
        },
        '5': {
            name: 'Other',
            store: 'Other',
            next: 29
        }
    }
}, { // 29
    question: {
        text: 'Would you please specify which other location?',
        type: enums.questionTypes.TEXT,
        maxLength: 60,
        key: 'otherLocationHealthcare'
    },
    next: 30
}, { // 30
    question: {
        text: 'Do you have now, have you ever had, or has a healthcare provider ever told you that you have any of the following medical conditions? Kidney disease, End stage renal disease, or dialysis',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'kidneyDisease'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 31
        },
        '2': {
            name: 'no',
            store: false,
            next: 31
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 31
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 34
        }
    }
}, { // 31
    question: {
        text: 'history of frostbite, hypothermia, or immersion foot',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'frostbite'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 32
        },
        '2': {
            name: 'no',
            store: false,
            next: 32
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 32
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 34
        }
    }
}, { // 32
    question: {
        text: 'Liver disease, Cirrhosis, or end stage liver disease',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'liverDisease'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 33
        },
        '2': {
            name: 'no',
            store: false,
            next: 33
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 33
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 34
        }
    }
}, { // 33
    question: {
        text: 'H I V or AIDS',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'hivAids'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 34
        },
        '2': {
            name: 'no',
            store: false,
            next: 34
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 34
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 34
        }
    }
}, { // 34
    question: {
        text: 'Do you have now, have you ever had, or has a healthcare provider ever told you that you have any of the following medical conditions? History of heat stroke or heat exhaustion',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'heatStroke'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 35
        },
        '2': {
            name: 'no',
            store: false,
            next: 35
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 35
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 35
    question: {
        text: 'Heart disease, Arrhythmia, or irregular heartbeat',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'heartDisease'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 36
        },
        '2': {
            name: 'no',
            store: false,
            next: 36
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 36
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 36
    question: {
        text: 'Emphysema',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'emphysema'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 37
        },
        '2': {
            name: 'no',
            store: false,
            next: 37
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 37
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 37
    question: {
        text: 'Diabetes',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'diabetes'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 38
        },
        '2': {
            name: 'no',
            store: false,
            next: 38
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 38
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 38
    question: {
        text: 'Asthma',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'asthma'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 39
        },
        '2': {
            name: 'no',
            store: false,
            next: 39
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 39
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 39
    question: {
        text: 'Cancer',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'cancer'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 40
        },
        '2': {
            name: 'no',
            store: false,
            next: 40
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 40
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 40
    question: {
        text: 'Hepatitis C',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'hepatitisC'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 41
        },
        '2': {
            name: 'no',
            store: false,
            next: 41
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 41
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 41
    question: {
        text: 'Tuberculosis',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'tuberculosis'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 42
        },
        '2': {
            name: 'no',
            store: false,
            next: 42
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 42
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 42
        }
    }
}, { // 42
    question: {
        text: 'Have you ever had problematic drug or alcohol use, abused drugs or alcohol, or been told you do?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'drugAlcoholAbuse'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 43
        },
        '2': {
            name: 'no',
            store: false,
            next: 43
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 43
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 48
        }
    }
}, { // 43
    question: {
        text: 'Have you consumed alcohol and or drugs almost every day or every day for the past month?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'drugUsageLastMonth'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 44
        },
        '2': {
            name: 'no',
            store: false,
            next: 44
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 44
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 48
        }
    }
}, { // 44
    question: {
        text: 'Have you ever used injection drugs or shots in the past six months?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'injectionDrugs'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 45
        },
        '2': {
            name: 'no',
            store: false,
            next: 45
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 45
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 48
        }
    }
}, { // 45
    question: {
        text: 'Have you ever been treated for drug or alcohol problems and returned to drinking or using drugs?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'relapse'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 46
        },
        '2': {
            name: 'no',
            store: false,
            next: 46
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 46
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 48
        }
    }
}, { // 46
    question: {
        text: 'Have you used non beverage alcohol like cough syrup, mouthwash, rubbing alcohol, cooking wine, or anything like that in the past six months?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'nonBeverageAlcohol'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 47
        },
        '2': {
            name: 'no',
            store: false,
            next: 47
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 47
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 48
        }
    }
}, { // 47
    question: {
        text: 'Have you blacked out because of your alcohol or drug use in the past month?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'blackOut'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 48
        },
        '2': {
            name: 'no',
            store: false,
            next: 48
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 48
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 48
        }
    }
}, { // 48
    question: {
        text: 'Have you ever been taken to a hospital against your will for a mental health reason?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'mentalHospitalAgainstWill'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 49
        },
        '2': {
            name: 'no',
            store: false,
            next: 49
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 49
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 55
        }
    }
}, { // 49
    question: {
        text: 'Have you ever gone to the emergency room because you weren\'t feeling one hundred percent well emotionally or because of your nerves?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'emergencyRoom'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 50
        },
        '2': {
            name: 'no',
            store: false,
            next: 50
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 50
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 55
        }
    }
}, { // 50
    question: {
        text: 'Have you ever spoken with a psychiatrist or other mental health professional in the last six months because of your mental health, whether that was voluntary or because somebody insisted that you do so?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'psychiatrist'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 51
        },
        '2': {
            name: 'no',
            store: false,
            next: 51
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 51
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 55
        }
    }
}, { // 51
    question: {
        text: 'Have you ever had a serious brain injury or head trauma?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'brainInjury'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 52
        },
        '2': {
            name: 'no',
            store: false,
            next: 52
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 52
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 55
        }
    }
}, { // 52
    question: {
        text: 'Have you ever been told you have a learning disability or developmental disability?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'learningDisablity'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 53
        },
        '2': {
            name: 'no',
            store: false,
            next: 53
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 53
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 55
        }
    }
}, { // 54
    question: {
        text: 'Do you have any problems concentrating or remembering things?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'problemsConcentrating'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 55
        },
        '2': {
            name: 'no',
            store: false,
            next: 55
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 55
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 55
        }
    }
}, { // 55
    question: {
        text: 'Have you had any medicines prescribed by a doctor that you did not take, sold, had stolen, misplaced, or where the prescription were never filled?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'medicinesNotTaken'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: 56
        },
        '2': {
            name: 'no',
            store: false,
            next: 56
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: 56
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: 56
        }
    }
}, { // 56
    question: {
        text: 'Have you experienced any emotional, physical, psychological, sexual, or other type of abuse or trauma in your life which you have not sought help for and or which has caused your homelessness?',
        type: enums.questionTypes.SWITCH,
        timeout: 10,
        key: 'abuseCausedHomelessness'
    },
    values: {
        '1': {
            name: 'yes',
            store: true,
            next: null
        },
        '2': {
            name: 'no',
            store: false,
            next: null
        },
        '3': {
            name: 'refuse to answer',
            store: null,
            next: null
        },
        '#': {
            name: 'skip to next section',
            store: null,
            next: null
        }
    }
}];

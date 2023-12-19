export const returnDefaultIfFieldEmpty = (value) => {
    return value === '' ? '' : value;
};

export function getDate() {
    const date = new Date();
    return date.toDateString();
}

export function displayValues(teamValues) {
    var returnList = [];

    if (teamValues === undefined || teamValues.length === 0) {
        return
    }

    for (var i = 0; i < teamValues.length; i++) {
        returnList.push({ title: teamValues[i].title + ' - ' + teamValues[i].description, id: teamValues[i].id });
    }

    return returnList;
}

export function preselectedValues(values, teamValues) {
    var returnList = [];

    if (teamValues === undefined || teamValues.length === 0) {
        return
    }

    for (var i = 0; i < teamValues.length; i++) {
        for (var j = 0; j < values.length; j++) {
            if (teamValues[i].id === values[j]) {
                returnList.push({ title: teamValues[i].title + ' - ' + teamValues[i].description, id: teamValues[i].id });
            }
        }
    }

    return returnList;
}
export const returnDefaultIfFieldEmpty = (value) => {
    return value === '' ? '' : value;
};

export function getDate() {
    const date = new Date();
    return date.toDateString();
}

export function displayTeamLeads(teamLeads) {
    var returnList = [];

    if (teamLeads === undefined || teamLeads.length === 0) {
        return;
    }

    for (var i = 0; i < teamLeads.length; i++) {
        returnList.push({ title: teamLeads[i].first_name + ' ' + teamLeads[i].surname + ' - ' + teamLeads[i].username, id: teamLeads[i].id });
    }

    return returnList;
}

export function displayTeamMembers(teamMembers) {
    var returnList = [];

    if (teamMembers === undefined || teamMembers.length === 0) {
        return;
    }

    for (var i = 0; i < teamMembers.length; i++) {
        returnList.push({ title: teamMembers[i].first_name + ' ' + teamMembers[i].surname + ' - ' + teamMembers[i].username, id: teamMembers[i].id });
    }

    return returnList;
}

export function displayValues(teamValues) {
    var returnList = [];

    if (teamValues === undefined || teamValues.length === 0) {
        return;
    }

    for (var i = 0; i < teamValues.length; i++) {
        returnList.push({ title: teamValues[i].title + ' - ' + teamValues[i].description, id: teamValues[i].id });
    }

    return returnList;
}

export function preselectedValues(values, teamValues) {
    var returnList = [];

    if (teamValues === undefined || teamValues.length === 0) {
        return;
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

export function displayTeamTags(teamTags) {
    var returnList = [];

    if (teamTags === undefined || teamTags.length === 0) {
        return;
    }

    for (var i = 0; i < teamTags.length; i++) {
        returnList.push({ title: teamTags[i].title + ' - ' + teamTags[i].description, id: teamTags[i].id });
    }

    return returnList;
}

export function preselectedTags(tags, teamTags) {
    var returnList = [];

    if (teamTags === undefined || teamTags.length === 0) {
        return;
    }

    for (var i = 0; i < teamTags.length; i++) {
        for (var j = 0; j < tags.length; j++) {
            if (teamTags[i].id === tags[j]) {
                returnList.push({ title: teamTags[i].title + ' - ' + teamTags[i].description, id: teamTags[i].id });
            }
        }
    }

    return returnList;
}

export function displayEpics(epics) {
    var returnList = [];

    for (var i = 0; i < epics.length; i++) {
        returnList.push({ title: epics[i].title, id: epics[i].epic_id });
    }

    return returnList;
}

export function currentEpic(epic, epics) {
    var returnList = [];

    for (var i = 0; i < epics.length; i++) {
        if (epics[i].epic_id === epic) {
            returnList.push({ title: epics[i].title, id: epics[i].id });
        }
    }

    return returnList;
}

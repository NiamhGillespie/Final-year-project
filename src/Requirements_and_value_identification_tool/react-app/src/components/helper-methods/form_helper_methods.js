export const returnDefaultIfFieldEmpty = (value) => {
    return value === '' ? '' : value;
};

export function getDate() {
    const date = new Date();
    return date.toDateString();
}

export function displayTeams(teams) {
    var returnList = [];

    if (teams === undefined || teams.length === 0) {
        return;
    }

    for (var i = 0; i < teams.length; i++) {
        returnList.push({ title: teams[i].team_name + ' - #' + teams[i].id, id: teams[i].id });
    }

    return returnList;
}

export function preselectedTeams(teams, orgTeams) {
    var returnList = [];

    if (orgTeams === undefined || orgTeams.length === 0) {
        return;
    }

    for (var i = 0; i < orgTeams.length; i++) {
        for (var j = 0; j < teams.length; j++) {
            if (orgTeams[i].id === teams[j]) {
                returnList.push({ title: orgTeams[i].team_name + ' - #' + orgTeams[i].id, id: orgTeams[i].id });
            }
        }
    }

    return returnList;
}

export function preselectedTeamLeads(leads, orgLeads) {
    var returnList = [];

    if (orgLeads === undefined || orgLeads.length === 0) {
        return;
    }

    for (var i = 0; i < orgLeads.length; i++) {
        for (var j = 0; j < leads.length; j++) {
            if (orgLeads[i].id === leads[j]) {
                returnList.push({ title: orgLeads[i].first_name + ' ' + orgLeads[i].surname + ' - ' + orgLeads[i].username, id: orgLeads[i].id });
            }
        }
    }

    return returnList;
}

export function preselectedTeamMembers(members, orgMembers) {
    var returnList = [];

    if (orgMembers === undefined || orgMembers.length === 0) {
        return;
    }

    for (var i = 0; i < orgMembers.length; i++) {
        for (var j = 0; j < members.length; j++) {
            if (orgMembers[i].id === members[j]) {
                returnList.push({
                    title: orgMembers[i].first_name + ' ' + orgMembers[i].surname + ' - ' + orgMembers[i].username,
                    id: orgMembers[i].id
                });
            }
        }
    }

    return returnList;
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

export function displayPriority(priority) {
    var priorityText = '';
    var priorityIcon;
    var priorityColour;

    if (priority === 'LOW') {
        priorityText = 'LOW';
        priorityIcon = '';
        priorityColour = 'green';
    } else if (priority === 'MEDIUM') {
        priorityText = 'MEDIUM';
        priorityIcon = '';
        priorityColour = 'orange';
    } else {
        priorityText = 'HIGH';
        priorityIcon = '';
        priorityColour = 'red';
    }

    return (
        <div>
            <p style={{ color: priorityColour }} className="priority-text">
                {priorityText} {priorityIcon}
            </p>
        </div>
    );
}

export function displayTags(tags, teamTags) {
    var returnList = [];
    for (var i = 0; i < tags.length; i++) {
        var tag = getTagTitleFromId(tags[i], teamTags);
        if (tag !== undefined) {
            returnList.push(
                <p className="details-tag" style={{ backgroundColor: '#' + tag.colour }}>
                    {tag.title}
                </p>
            );
        }
    }
    return returnList;
}

export function displaySmallTags(tags, teamTags) {
    var returnList = [];
    for (var i = 0; i < tags.length; i++) {
        var tag = getTagTitleFromId(tags[i], teamTags);
        if (tag !== undefined) {
            returnList.push(
                <p className="details-tag-small" style={{ backgroundColor: '#' + tag.colour }}>
                    {tag.title}
                </p>
            );
        }
    }
    return returnList;
}

export function getTagTitleFromId(id, teamTags) {
    for (var i = 0; i < teamTags.length; i++) {
        if (teamTags[i].id === id) {
            return teamTags[i];
        }
    }
}
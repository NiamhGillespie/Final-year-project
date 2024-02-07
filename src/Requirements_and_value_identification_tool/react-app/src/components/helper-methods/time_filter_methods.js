export function getDateInBounds(editedDate, timeFilter) {
    var comparisonDate = new Date();
    comparisonDate.setDate(comparisonDate.getDate() - timeFilter);
    editedDate = Date.parse(editedDate);

    return comparisonDate <= editedDate;
}

export function storiesEdited24Hours(stories) {
    return stories.filter((stories) => getDateInBounds(stories.last_edited, 1));
}

export function storiesEdited48Hours(stories) {
    return stories.filter((stories) => getDateInBounds(stories.last_edited, 2));
}

export function storiesEdited72Hours(stories) {
    return stories.filter((stories) => getDateInBounds(stories.last_edited, 3));
}


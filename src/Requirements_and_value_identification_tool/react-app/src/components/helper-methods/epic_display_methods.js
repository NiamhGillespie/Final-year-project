

export function displaySmallValues(values, teamValues) {
    var returnList = [];
    for (var i = 0; i < values.length; i++) {
        var value = getValueTitleFromId(values[i], teamValues);
        if (value !== undefined) {
            returnList.push(
                <p className="details-value-small" style={{ backgroundColor: '#' + value.colour }}>
                    {value.title}
                </p>
            );
        }
    }
    return returnList;
}

export function getValueTitleFromId(id, teamValues) {
    for (var i = 0; i < teamValues.length; i++) {
        if (teamValues[i].id === id) {
            return teamValues[i];
        }
    }
}
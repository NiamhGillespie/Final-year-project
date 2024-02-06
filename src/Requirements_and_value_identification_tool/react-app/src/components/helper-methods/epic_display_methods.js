import { Tooltip } from 'react-tooltip';

export function displaySmallValues(values, teamValues) {
    var returnList = [];
    for (var i = 0; i < values.length; i++) {
        var value = getValueTitleFromId(values[i], teamValues);
        if (value !== undefined) {
            var tooltip_message = 'No description provided';
            if (value.description.length !== 0) {
                tooltip_message = value.description;
            }
            returnList.push(
                <>
                    <a id={value.title.split(' ')[0]} className="details-value-small" style={{ backgroundColor: '#' + value.colour }}>
                        {value.title}
                    </a>
                    <Tooltip
                        anchorSelect={'#' + value.title.split(' ')[0]}
                        content={tooltip_message}
                        className="delay-tooltip"
                        data-tooltip-delay-show={0.5}
                    />
                </>
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

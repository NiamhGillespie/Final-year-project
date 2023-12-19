function dateInWeek(createdDate) {
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    createdDate = Date.parse(createdDate);

    return weekAgo <= createdDate;
}

export function epicsAddedThisWeek(epics) {
    return (
        <div style={{ display: 'inline-block' }}>
            <p style={{ clear: 'both' }} className="epic-stat">
                {epics.filter((epic) => dateInWeek(epic.time_created)).length}
            </p>

            <p style={{ fontSize: '2vh' }} className="epic-stat">
                Epics added this week
            </p>
        </div>
    );
}

export function storiesAddedThisWeek(stories) {
    return (
        <div style={{ display: 'inline-block' }}>
            <p style={{ clear: 'both' }} className="epic-stat">
                {stories.filter((story) => dateInWeek(story.time_created)).length}
            </p>

            <p style={{ fontSize: '2vh' }} className="epic-stat">
                Stories added this week
            </p>
        </div>
    );
}

export function highPriorityStories(stories) {
    return (
        <div style={{ display: 'inline-block' }}>
            <p style={{ clear: 'both' }} className="epic-stat">
                {stories.filter((story) => story.priority === 'HIGH').length}
            </p>
            <p style={{ fontSize: '2vh' }} className="epic-stat">
                High priority stories
            </p>
        </div>
    );
}
import axios from 'axios';
import { API_URL_STORY_DETAILS, API_URL_TRACKING_COLUMN_DETAILS } from '../../constants';

export async function updateStory(story_id, column, non_completed_stories) {
    var story = non_completed_stories.filter((story) => story.id === parseInt(story_id))[0];
    story.state = column.title.toString();

    const date = new Date();
    story.last_edited = date.toDateString();

    //UPDATE THIS IN FUTURE
    story.last_edited_by = "Update me once users exist :)"

    if (column.mark_as_complete === true) {
        console.log("marking as complete...")
        story.completed = true;
    } else {
        console.log("marking as incomplete...")
        story.completed = false;
    }
    await axios.put(API_URL_STORY_DETAILS + story_id + '/details', story);
}

export async function updateNewColumn(story_id, column_id, new_index, columns) {
    var column = columns.filter((column) => column.id === parseInt(column_id))[0];

    var ordered_ids = [];
    if (column.stories.length >= 1) {
        var ordered = column.story_list.split(',');
        for (var i = 0; i < ordered.length; i++) {
            ordered_ids.push(parseInt(ordered[i]));
        }
        ordered_ids.splice(new_index, 0, parseInt(story_id));
    } else {
        ordered_ids.push(parseInt(story_id));
    }

    column.stories = ordered_ids;
    column.story_list = ordered_ids.toString();
    await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
    return column;
}

export async function updateOldColumn(story_id, column_id, columns) {
    var column = columns.filter((column) => column.id === parseInt(column_id))[0];

    var ordered = column.story_list.split(',');
    var ordered_ids = [];
    for (var i = 0; i < ordered.length; i++) {
        ordered_ids.push(parseInt(ordered[i]));
    }

    if (ordered_ids.length !== 0) {
        const index = ordered_ids.indexOf(parseInt(story_id));

        if (index > -1) {
            ordered_ids.splice(index, 1);
        }
    } else {
        ordered_ids.push(parseInt(story_id));
    }
    column.stories = ordered_ids;
    column.story_list = ordered_ids.toString();

    await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
    return;
}

export async function updateColumStoryOrder(column_id, story_id, new_index, old_index, columns) {
    var column = columns.filter((column) => column.id === parseInt(column_id))[0];

    if (column.stories.length >= 1) {
        var ordered = column.story_list.split(',');
        var ordered_ids = [];

        for (var i = 0; i < ordered.length; i++) {
            ordered_ids.push(parseInt(ordered[i]));
        }
        ordered_ids.splice(old_index, 1);
        ordered_ids.splice(new_index, 0, parseInt(story_id));
    } else {
        ordered_ids.push(parseInt(story_id));
    }

    column.stories = ordered_ids;
    column.story_list = ordered_ids.toString();

    await axios.put(API_URL_TRACKING_COLUMN_DETAILS + column_id, column);
}

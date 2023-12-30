import { google } from 'googleapis';

const corsHeader = {
    'Access-Control-Allow-Origin': process.env.PORT ? 'https://zs-loot-tracker.netlify.app' : 'http://localhost:8888',
};

const serviceEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets';
const sheetId = process.env.SHEET_ID;
const sheetName = 'QUESTS';
const keys = JSON.parse(process.env.GOOG_CREDENTIALS);

const client = google.auth.fromJSON(keys);
client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const mapSheetData = (data) => {
    return data.map((row) => {
        const title = row[0];
        const body = JSON.parse(row[1]);

        const quest = {
            name: title,
            id: '', // ids are generated upon cloning a quest in the client, no need to assign here
            items: mapItemsInQuest(body),
            editing: false,
        };
        return quest;
    });
};

const mapItemsInQuest = (itemsObject) => {
    return Object.entries(itemsObject).map(([key, value], i) => {
        return {
            name: key,
            id: i,
            count: value,
            completed: false,
            editing: false,
        };
    });
};

exports.handler = async function (event, context) {
    try {
        // A1 notation https://developers.google.com/sheets/api/guides/concepts#cell
        const range = `${sheetName}!A2:B500`;
        const options = {
            url: `${serviceEndpoint}/${sheetId}/values/${range}`,
        };

        const res = await client.request(options);
        const quests = mapSheetData(res.data.values);

        return {
            statusCode: 200,
            headers: corsHeader,
            body: JSON.stringify(quests),
        };
    } catch (error) {
        console.error(err);
        return {
            headers: corsHeader,
            statusCode: 500,
        };
    }
};

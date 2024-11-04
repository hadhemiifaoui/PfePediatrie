const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID, 
  process.env.CLIENT_SECRET, 
  process.env.REDIRECT_URI 
);

fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) return getAccessToken(oAuth2Client);
  oAuth2Client.setCredentials(JSON.parse(token));
});

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
}

const generateMeetLink = async () => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const event = {
      summary: 'Consultation with Pediatrician',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(new Date().getTime() + 30 * 60000).toISOString(), 
        timeZone: 'America/Los_Angeles',
      },
      conferenceData: {
        createRequest: {
          requestId: "sample123",
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    });

    const meetLink = response.data.hangoutLink;
    console.log(`Meet link created: ${meetLink}`);
    return meetLink;
  } catch (error) {
    console.error('Error creating Google Meet link:', error);
    return null;
  }
};

module.exports = { generateMeetLink };

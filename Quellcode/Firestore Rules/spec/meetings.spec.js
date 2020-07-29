const { setup, teardown } = require('./helper.');
const { firestore } = require('@firebase/testing');

describe('Meeting rules', () => {
    
    const mockData = {
        // AuthedUser
        'users/testID123': {
            publicInfo: {
                id: "testID123",
                forename: "testforename1",
                name: "testname1"
            }
        },
        // AuthedUser has Friend
        'users/testID123/friends/testID321': {
            id: "testID321"
        },
        // AuthedUser has meeting
        'users/testID123/meetings/testID123': {
            datetime: '01.01.2020, 12:00', 
            location: 'testort', 
            activity: 'testaktivitaet'
        },
        // Friend
        'users/testID321': {
            publicInfo: {
                id: "testID321",
                forename: "testforename2",
                name: "testname2"
            }
        },
        // Friend with AuthedUser as Friend
        'users/testID321/friends/testID123': {
            id: "testID123"
        },
         // Friend has meeting
        'users/testID321/meetings/testID321': {
            datetime: '01.01.2020, 12:00', 
            location: 'testort', 
            activity: 'testaktivitaet'
        },
         // unknown user
         'users/testID231': {
            publicInfo: {
                id: "testID231",
                forename: "testforename3",
                name: "testname3"
            }
        },
        // unknown user has meeting
        'users/testID231/meetings/testID231': {
            datetime: '01.01.2020, 12:00', 
            location: 'testort', 
            activity: 'testaktivitaet'
        },
    }

    const mockUserId = 'testID123';
    const mockfriendId = 'testID321';
    const mockUnknownUserId = 'testID231';

    const mockMeeting = 
    {
        info:{
            datetime: '01.01.2020, 12:00', 
            location: 'testort', 
            activity: 'testaktivitaet',
            deadline: firestore.Timestamp.now()
        }
    }

    const mockAuth = {
        uid: 'testID123',
        email: 'testMail@angularfirebase.com'
    }

    afterEach(async () => {
        await teardown();
    });

    test('pass reading when is owner', async () => {
        const db = await setup(mockAuth, mockData);
        const meetingRef = db.doc(`users/${mockUserId}/meetings/${mockUserId}`);
        await expect(meetingRef.get()).toAllow();
    });

    test('pass reading when is friend', async () => {
        const db = await setup(mockAuth, mockData);
        const meetingRef = db.doc(`users/${mockfriendId}/meetings/${mockfriendId}`);
        await expect(meetingRef.get()).toAllow();
    });

    test('failed reading when is unknown user', async () => {
        const db = await setup(mockAuth, mockData);
        const meetingRef = db.doc(`users/${mockUnknownUserId}/meetings/${mockUnknownUserId}`);
        await expect(meetingRef.get()).toDeny();
    });

    test('failed creating when is friend', async () => {
        const db = await setup(mockAuth, mockData);
        const meetingRef = db.collection(`users/${mockfriendId}/meetings/`);
        await expect(meetingRef.add(mockMeeting)).toDeny();
    });

    test('pass creating when is owner', async () => {
        const db = await setup(mockAuth, mockData);
        const meetingRef = db.collection(`users/${mockUserId}/meetings/`);
        await expect(meetingRef.add(mockMeeting)).toAllow();
    });

    test('failed deleting when is friend', async () => {
        const db = await setup(mockAuth, mockData);
        const meetingRef = db.doc(`users/${mockfriendId}/meetings/${mockfriendId}`);
        await expect(meetingRef.delete()).toDeny();
    });

    test('pass deleting when is owner', async () => {
        const db = await setup(mockAuth, mockData);
        const meetingRef = db.doc(`users/${mockUserId}/meetings/${mockUserId}`);
        await expect(meetingRef.delete()).toAllow();
    });
});
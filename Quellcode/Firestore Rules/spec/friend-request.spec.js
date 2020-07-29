const { setup, teardown } = require('./helper.');

describe('FriendRequests rules', () => {
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
        // AuthedUser has a friendRequest
        'users/testID123/friendRequests/testID312': {
            id: "testID312"
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
        // User who want to be friend with AuthedUser
        'users/testID312': {
            publicInfo: {
                id: "testID312",
                forename: "testforename3",
                name: "testname3"
            }
        },
        // AuthedUser want to be friend with this User
        'users/testID213': {
            publicInfo: {
                id: "testID213",
                forename: "testforename4",
                name: "testname4"
            }
        },
        // FriendRequest of AuthedUser to user above
        'users/testID213/friendRequests/testID123': {
            id: "testID123"
        },
        // unknown user
        'users/testID231': {
            publicInfo: {
                id: "testID213",
                forename: "testforename4",
                name: "testname4"
            }
        },
         // unknown user has a random friend request
         'users/testID213/friendRequests/testID1234': {
            id: "testID1234"
        },
    }

    const mockUserId = 'testID123';
    const mockfriendId = 'testID321';
    const mockHasFriendRequestUserId = 'testID312';
    const mockMadeFriendRequestUserId = 'testID213';
    const mockUnknownUserId = 'testID231';
    const mockRandomUserReqId = 'testID1234';

    const mockAuth = {
        uid: 'testID123',
        email: 'testMail@angularfirebase.com'
    }

    afterEach(async () => {
        await teardown();
    });

    test('failed reading when is friend', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.collection(`users/${mockfriendId}/friendRequests`);
        await expect(userRef.get()).toDeny();
    });

    test('failed create when is friend', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockfriendId}/friendRequests/${mockUserId}`);
        await expect(userRef.set({id: mockUserId})).toDeny();
    });

    test('failed create when is owner', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockUserId}/friendRequests/${mockUserId}`);
        await expect(userRef.set({id: mockUserId})).toDeny();
    });

    test('failed create when is already requested', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockMadeFriendRequestUserId}/friendRequests/${mockUserId}`);
        await expect(userRef.set({id: mockUserId})).toDeny();
    });

    test('failed create when already requested from other side', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockHasFriendRequestUserId}/friendRequests/${mockUserId}`);
        await expect(userRef.set({id: mockUserId})).toDeny();
    });

    test('pass create when unknown user', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockUnknownUserId}/friendRequests/${mockUserId}`);
        await expect(userRef.set({id: mockUserId})).toAllow();
    });

    test('pass delete when requested user', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockMadeFriendRequestUserId}/friendRequests/${mockUserId}`);
        await expect(userRef.delete()).toAllow();
    });

    test('pass delete when owner', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockUserId}/friendRequests/${mockHasFriendRequestUserId}`);
        await expect(userRef.delete()).toAllow();
    });

    test('failed delete when not requested user', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockHasFriendRequestUserId}/friendRequests/${mockRandomUserReqId}`);
        await expect(userRef.delete()).toDeny();
    });
});
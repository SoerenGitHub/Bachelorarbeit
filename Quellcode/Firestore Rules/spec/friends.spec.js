const { setup, teardown } = require('./helper.');

describe('Friend rules', () => {



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
    }

    const mockUserId = 'testID123';
    const mockfriendId = 'testID321';
    const mockHasFriendRequestUserId = 'testID312';
    const mockMadeFriendRequestUserId = 'testID213';

    const mockAuth = {
        uid: 'testID123',
        email: 'testMail@angularfirebase.com'
    }

    afterEach(async () => {
        await teardown();
    });

    test('fail reading when is not a user', async () => {
        const db = await setup();
        const userRef = db.collection(`users/${mockUserId}/friends`);
        await expect(userRef.get()).toDeny();
    });

    test('failed reading when is friend', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.collection(`users/${mockfriendId}/friends`);
        await expect(userRef.get()).toDeny();
    });

    test('pass reading when is Owner', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.collection(`users/${mockUserId}/friends`);
        await expect(userRef.get()).toAllow();
    });

    test('fail writing in own data when is no request to be friend', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockUserId}/friends/${mockMadeFriendRequestUserId}`);
        await expect(userRef.set({id: mockMadeFriendRequestUserId})).toDeny();
    });

    test('fail writing in other data when friend request not approved', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockMadeFriendRequestUserId}/friends/${mockUserId}`);
        await expect(userRef.set({id: mockUserId})).toDeny();
    });

    test('pass approve friend request', async () => {
        const db = await setup(mockAuth, mockData);
        const userRef = db.doc(`users/${mockHasFriendRequestUserId}/friends/${mockUserId}`);
        const ownUserRef = db.doc(`users/${mockUserId}/friends/${mockHasFriendRequestUserId}`);
        const userReq = db.doc(`users/${mockUserId}/friendRequests/${mockHasFriendRequestUserId}`);

        const batch = db.batch();

        batch.set(ownUserRef, {
            id: mockHasFriendRequestUserId
        })
        batch.set(userRef, {
            id: mockUserId
        })
        batch.delete(userReq)

        await expect(batch.commit()).toAllow();
    });



    

});
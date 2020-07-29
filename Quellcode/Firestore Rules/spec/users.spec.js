const { setup, teardown } = require('./helper.');

describe('User rules', () => {

    const mockUser = {
        'users/testID123': {
            publicInfo: {
                id: "testID123",
                forename: "testforename",
                name: "testname"
            }
        }
    }

    const mockUserId = "testID123";

    const mockAuth = {
        uid: "testID123",
        email: "testMail@angularfirebase.com"
    }

    afterEach(async () => {
        await teardown();
    });

    test('fail reading when not authenticated', async () => {
        const db = await setup();
        const userRef = db.collection('users');
        await expect(userRef.get()).toDeny();
    });

    test('fail reading when authenticated but not a common user', async () => {
        const db = await setup(mockAuth);
        const userRef = db.collection('users');
        await expect(userRef.get()).toDeny();
    });

    test('fail updating when authenticated and is common user', async () => {
        const db = await setup(mockAuth, mockUser);
        const userRef = db.doc(`users/${mockUserId}`);
        await expect(userRef.set({
            publicInfo: {
                id: "testID123",
                forename: "testforename",
                name: "testname"
            }
        })).toDeny();
    });

    test('fail creating when authenticated but not a common user', async () => {
        const db = await setup(mockAuth);
        const userRef = db.collection('users');
        await expect(userRef.add({
            publicInfo: {
                id: "testID123",
                forename: "testforename",
                name: "testname"
            }
        })).toDeny();
    });

    test('pass reading when authenticated and is common user', async () => {
        const db = await setup(mockAuth, mockUser);
        const userRef = db.collection('users');
        await expect(userRef.get()).toAllow();
    });
});
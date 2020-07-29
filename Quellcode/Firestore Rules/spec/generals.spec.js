const { setup, teardown } = require('./helper.');

describe('General rules', () => {
    let db;
    let ref;

    beforeAll(async () => {
        db = await setup();
        ref = db.collection('non-existent');
    });

    afterAll(async () => {
        await teardown();
    });

    test('fail reading when reading/writing an unauthorized collection', async () => {
        await expect(ref.get()).toDeny();
    });
});
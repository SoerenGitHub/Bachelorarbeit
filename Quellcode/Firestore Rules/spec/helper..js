const firebase = require('@firebase/testing');
const fs = require('fs');

module.exports.setup = async (auth, data) => {
    const projectId = `rules-spec-${Date.now()}`;
    const app = await firebase.initializeTestApp({
        projectId,
        auth
    });

    const adminAPP = firebase.initializeAdminApp({
        projectId,
        auth
    });

    const db = app.firestore();
    const adminDB = adminAPP.firestore();

    if (data) {
        for (const key in data) {
            const ref = adminDB.doc(key);
            await ref.set(data[key]);
        }
    }

    await firebase.loadFirestoreRules({
        projectId,
        rules: fs.readFileSync('firestore.rules', 'utf8')
    });

    return db;
}

module.exports.teardown = async () => {
    Promise.all(firebase.apps().map(app => app.delete()));
};

expect.extend({
    async toAllow(x) {
        let pass = false;
        try {
            await firebase.assertSucceeds(x);
            pass = true;
        } catch (err) {}

        return {
            pass,
            message: () => 'Expected Firebase operation to be allowed, but it failed'
        };
    }
});

expect.extend({
    async toDeny(x) {
        let pass = false;
        try {
            await firebase.assertFails(x);
            pass = true;
        } catch (err) {}

        return {
            pass,
            message: () => 'Expected Firebase operation to be denied, but it was allowed'
        };
    }
});
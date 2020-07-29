import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// App initialisieren
// Wichtig => Sicherheit: Environments in Firebase hinterlegen!
//admin.initializeApp(functions.config().app.env);

// Trigger => neue Freundesanfrage
export const newFriendRequest = functions.firestore
.document('users/{userId}/friendRequests/{requestId}')
.onCreate((snapshot, context) => {
    return new Promise<void>((resolve, reject) => {
        const data = snapshot.data();
        // Parameter müssen valide sein
        if (data && data.id && snapshot.id) {
            // ID der Person, welcher ein Freund werden soll
            const friendId: string = context.params.userId;
            getFullname(String(data.id)).then(fullname => {
                console.log('id: ', snapshot.id, 'friendid: ', friendId, 'name: ', fullname);
                // Sende eine Notifikation an die Person, welche als Freund angefragt wurde
                sendAddFriendNotification(data.id, friendId, fullname);
                resolve();
            })
            .catch(err => {
                console.error(err);
                reject();
            });
        } else {
            console.error('no data! data: ' + data ? JSON.stringify(data) : 'undefined');
            reject();
        }
    });
});

export const newMeeting = functions.firestore
.document('users/{userId}/meetings/{meetingId}')
.onCreate((snapshot, context) => {
    return new Promise<void>((resolve, reject) => {
        const userId = context.params.userId;
        if(userId) {
            admin.firestore()
            .collection(`/users/${userId}/friends`)
            .get()
            .then(snap => {
                return snap.docs.map( doc => doc.data().id);
            })
            .then( friendIds => {
                friendIds.forEach(friendId => {
                    sendNewMeetingNotification(friendId);
                })
                resolve();
            })
            .catch(err => {
                console.error(err);
                reject();
            })
        } else {
            console.error('No Id!');
            reject();
        }
    });
});

function sendNewMeetingNotification(friendId: string): void {
    const payload = {  
        data: {  
           title: 'Neuer Termin',
           body: 'Ihr Freund hat ein neuen Termin erstellt'
        },
        notification: {  
            title: 'Neuer Termin',
            body: 'Ihr Freund hat ein neuen Termin erstellt',
           icon: "assets/icons/logo-192x192.png",
           content_available: 'true'
        }
     };
    admin.firestore()
    .doc(`/pushEndpoint/${friendId}`)
    .get().then(endpoint => {
        const subscription = endpoint?.data()?.subscription;
        if (subscription) {
            console.log('Notification to Endpoint: ', subscription);
            admin.messaging().sendToDevice(subscription, payload)
            .then(() => {
                console.log('Notification sended to Endpoint: ', subscription);
            })
            .catch(err => console.error(err));
        } else {
            console.error('no Subscription!')
        }
    })
    .catch(err => console.log(err));
}

function sendAddFriendNotification(id: string, friendId: string, fullname: string): void {
    const payload = {  
        data: {  
           id,
           title: 'Freundschaftsanfrage',
           body: fullname + ' möchte Sie als Freund hinzufügen'
        },
        notification: {  
           title: 'Freundschaftsanfrage',
           body: fullname + ' möchte Sie als Freund hinzufügen',
           icon: "assets/icons/logo-192x192.png",
           content_available: 'true'
        }
     };
    admin.firestore()
    .doc(`/pushEndpoint/${friendId}`)
    .get().then(endpoint => {
        const subscription = endpoint?.data()?.subscription;
        if (subscription) {
            console.log('Notification to Endpoint: ', subscription);
            admin.messaging().sendToDevice(subscription, payload)
            .then(() => {
                console.log('Notification sended to Endpoint: ', subscription);
            })
            .catch(err => console.error(err));
        } else {
            console.error('no Subscription!')
        }
    })
    .catch(err => console.log(err));
}

function getFullname(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        admin.firestore()
        .doc(`/users/${id}`)
        .get().then(user => {
            const data = user.data();
            if(data && data.publicInfo && data.publicInfo.forename && data.publicInfo.name){
                resolve(data.publicInfo.forename + ' ' + data.publicInfo.name);
            } else {
                console.error('userdata incorrect: ' + data?.forename + ' ' + data?.name);
                reject('userdata incorrect!');
            }
        })
        .catch(err => {
            console.error(err);
            reject(err);
        });
    });
}

export const setPushEndpoint = functions.https.onCall((data, context) => {
    const uid = context.auth?.uid;
    if (uid && data) {
        return admin.firestore()
        .doc(`/pushEndpoint/${uid}`)
        .set({ 
            subscription: String(data)
         })
         .then(() => true)
         .catch(() => false);
    } else {
        console.log(uid + ', ' + data?.id);
        throw new functions.https.HttpsError('failed-precondition', 'missing params! ');
        return false;
    }
})

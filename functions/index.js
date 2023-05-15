const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();

const functionDatabase = functions.database;
const adminDatabase = admin.database();


// Send notification on JOB post
exports.sendNotifiation = functionDatabase.ref('/notifications/{notificationId}')
.onCreate(async (change, context) => {
    const notificationId = context.params.notificationId;
    const notification = change.val();
    logger.log(`Notification ID: ${notificationId} notification type: ${notification.type}`);

    if(notification.type != 'jobs' && notification.type != 'freelance') {
        logger.log("sending notification to user...");
        await sendNotificationToUser(notification, notificationId);
    }else {
        logger.log("sending notification to pilot...");
        await sendPilotNotifiation(notification, notificationId);
    }
})

async function sendNotificationToUser(notification, notificationId) {
    const toUid = notification.type;
    logger.log(`path: users/${toUid}/notification`)
    const notificationIds = (await adminDatabase.ref(`users/${toUid}/notification`).get()).val()
    var arr = null;
    if(notificationIds == null) {
        arr = [];
    }else {
        arr = Object.values(notificationIds);
    }
    arr.push(notificationId);
    adminDatabase.ref(`users/${toUid}/notification`).update(arr);
}

async function sendPilotNotifiation(notification, notificationId) {

    // List of pilots...
    var usersListSnap = (await adminDatabase.ref('users/').once('value')).val();
    var usersList = Object.values(usersListSnap)
    var pilotsList = [];
    for(const data in usersList) {
        if(usersList[data].userType == 'pilot') {
            pilotsList.push(usersList[data]);
        }
    }

    if(pilotsList.length == 0) {
        return logger.log(
            'There are no pilots'
          );
    }

    // Add the notification id to pilotsId/notification.
    for(const pilot in pilotsList) {
        const uid = pilotsList[pilot].userId;
        logger.log(`path: users/${uid}/notification`)
        const notificationIds = (await adminDatabase.ref(`users/${uid}/notification`).get()).val()
        var arr = null;
        if(notificationIds == null) {
            arr = [];
        }else {
            arr = Object.values(notificationIds);
        }
        arr.push(notificationId);
        adminDatabase.ref(`users/${uid}/notification`).update(arr);
    }

    logger.log('All Notifications inserted to pilot id. ');

    // Send notification to topic. Notification details.
    const payload = {
        notification: {
            title: notification.title,
            body: notification.body
        }
    };

    // TODO: for not jobs == freelance
    admin.messaging().sendToTopic('Jobs', payload);
    logger.log('Notification sent to jobs...');
}
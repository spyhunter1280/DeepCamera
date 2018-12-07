const config=require('config')
const Minio=require('minio')

var mcConfig = config.get('config');
// Allocate a new minio-js client.
if (mcConfig.endPoint === '<endpoint>') {
    console.log('Please configure your endpoint in \"config/webhook.json\".');
    process.exit(1);
}
var mc = new Minio.Client(mcConfig)

let poller = mc.listenBucketNotification('sharpai', '', '', ['s3:ObjectCreated:*'])
poller.on('notification', record => {
    console.log('New object: %s/%s (size: %d)', record.s3.bucket.name,
                record.s3.object.key, record.s3.object.size)

    // Now that we've received our notification, we can cancel the listener.
    // We could leave it open if we wanted to continue to receive notifications.
    //poller.stop()
})

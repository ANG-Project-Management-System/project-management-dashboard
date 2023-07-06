import { MongoClient, ServerApiVersion, GridFSBucket } from 'mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
    console.log("Received request", req.method, req.query);
    console.log(req.headers);

    const id = req.query.id; // contractor id
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB);

        // Get the contractor document
        const contractor = await db.collection('contractors').findOne({ _id: new ObjectId(id) });

        if (!contractor || !contractor.timesheets || contractor.timesheets.length === 0) {
            return res.status(404).json({ error: 'Contractor or timesheets not found' });
        }

        // Fetch timesheet files information
        const bucket = new GridFSBucket(db, {
            bucketName: 'timesheets'
        });

        if (req.method === 'GET') {
            const timesheetFiles = [];
            for (const timesheetId of contractor.timesheets) {
                const timesheetFile = await bucket.find({ _id: new ObjectId(timesheetId) }).next();

                if (!timesheetFile) {
                    console.error(`Timesheet file not found: ${timesheetId}`);
                    continue;
                }

                timesheetFiles.push({
                    id: timesheetFile._id,
                    length: timesheetFile.length,
                    chunkSize: timesheetFile.chunkSize,
                    uploadDate: timesheetFile.uploadDate,
                    filename: timesheetFile.filename
                });
            }

            res.status(200).json(timesheetFiles);
        } else if (req.method === 'DELETE') {
            const fileId = req.query.fileId; // timesheet file id
            if (!fileId) {
                return res.status(400).json({ error: 'No file id provided' });
            }

            await bucket.delete(new ObjectId(fileId));
            // Removing fileId from contractor's timesheets
            await db.collection('contractors').updateOne({ _id: new ObjectId(id) }, { $pull: { timesheets: fileId } });

            res.status(200).json({ message: 'File deleted successfully' });
        } else {
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        client.close();
        return res.status(500).json({ error: 'Error connecting to db', details: error.message });
    } finally {
        client.close();
    }
};

export default handler;

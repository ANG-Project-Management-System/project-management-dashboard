import { MongoClient, ServerApiVersion } from 'mongodb';

const handler = async (req, res) => {
    const { method } = req;
    const id = req.query.id;
    const body = req.body;
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
        const collection = db.collection('project');

        switch (method) {
            case 'GET':
                const projects = await collection.find().toArray();
                return res.status(200).json(projects);

            case 'POST':
                const createResult = await collection.insertOne(body);
                return res.status(201).json(createResult.ops[0]);

            case 'PUT':
                const updateResult = await collection.updateOne(
                    { _id: new MongoClient.ObjectId(id) },
                    { $set: body }
                );
                if (updateResult.matchedCount === 0) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.status(200).json(body);

            case 'DELETE':
                const deleteResult = await collection.deleteOne(
                    { _id: new MongoClient.ObjectId(id) }
                );
                if (deleteResult.deletedCount === 0) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.status(200).json({ message: 'Project deleted' });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error connecting to db', details: error });
    } finally {
        if (client) {
            client.close();
        }
    }
}

export default handler;
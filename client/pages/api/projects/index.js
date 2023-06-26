import { MongoClient, ServerApiVersion } from 'mongodb';

const handler = async (req, res) => {
    const { method } = req;
    let id = req.query.id;
    if (method === 'DELETE' || method === 'PUT') {
        id = JSON.parse(id);
    }
    const body = req.body;
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    switch (method) {
        case 'GET':
            try {
                await client.connect();
                const projectDocument = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .findOne({ _id: 'project' });
                const project = projectDocument ? projectDocument.data : [];
                return res.status(200).json(project);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error connecting to db', details: error });
            }
            break;

        case 'POST':
            try {
                await client.connect();
                const result = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .updateOne(
                        { _id: 'project' },
                        { $push: { data: body } },
                        { upsert: true }
                    );
                return res.status(201).json(body);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error connecting to db', details: error });
            }
            break;

        case 'PUT':
            try {
                await client.connect();
                const result = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .updateOne(
                        { _id: 'project', "data.Project_Number": body.Project_Number },
                        { $set: { "data.$": body } }
                    );
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.status(200).json(body);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error connecting to db', details: error });
            }
            break;
            
        // case 'DELETE':
        //     try {
        //         await client.connect();
        
        //         // Remove a contractor from the contractors array of the specified project.
        //         const result = await client.db(process.env.MONGO_DB)
        //             .collection('project')
        //             .updateOne(
        //                 { _id: 'project', 'data.Project_Number': body.Project_Number },
        //                 { $pull: { 'data.$.Contractors': { Contractor_Name: body.Contractor_Name } } }
        //             );
        
        //         if (result.matchedCount === 0) {
        //             return res.status(404).json({ error: 'Project or Contractor not found' });
        //         }
        
        //         return res.status(200).json({ message: 'Contractor deleted from project' });
        //     } catch (error) {
        //         console.error(error);
        //         return res.status(500).json({ error: 'Error connecting to db', details: error });
        //     }
        //     break;
            
        case 'DELETE':
            try {
                await client.connect();
                const result = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .updateOne(
                        { _id: 'project' },
                        { $pull: { data: { Project_Number: id } } }
                    );
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: 'Project not found' });
                }
                return res.status(200).json({ message: 'Project deleted' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error connecting to db', details: error });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }

    if (client) {
        client.close();
    }
}

export default handler;

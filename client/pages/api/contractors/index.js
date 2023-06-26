import { MongoClient, ServerApiVersion } from 'mongodb';

const handler = async (req, res) => {
    const { method } = req;
    let id = req.query.id;
    // If it's DELETE or PUT method, parse the id from JSON format.
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

                // Get the contractors document.
                const contractorsDocument = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .findOne({ _id: 'contractors' });

                // Extract contractors data from the document or return empty array.
                const contractors = contractorsDocument ? contractorsDocument.data : [];

                return res.status(200).json(contractors);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error connecting to db', details: error });
            }
            break;

        case 'POST':
            try {
                await client.connect();
        
                // Insert a new contractor in the data array of the contractors document.
                const result = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .updateOne(
                        { _id: 'contractors' },
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
        
                // Update a contractor in the data array of the contractors document.
                const result = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .updateOne(
                        { _id: 'contractors', "data.Contractor_Name": body.Contractor_Name },
                        { $set: { "data.$": body } }
                    );
        
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: 'Contractor not found' });
                }
        
                return res.status(200).json(body);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error connecting to db', details: error });
            }
            break;
            
        case 'DELETE':
            try {
                await client.connect();
        
                // Remove a contractor from the data array of the contractors document.
                const result = await client.db(process.env.MONGO_DB)
                    .collection('proj')
                    .updateOne(
                        { _id: 'contractors' },
                        { $pull: { data: { Contractor_Name: id } } }
                    );
        
                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: 'Contractor not found' });
                }
        
                return res.status(200).json({ message: 'Contractor deleted' });
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
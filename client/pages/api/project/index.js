// pages/api/project.js
import { MongoClient, ServerApiVersion } from 'mongodb';

const handler = async (req, res) => {
    if(req.method === 'GET') {
        const projectNumber = req.query.number;

        if(!projectNumber) {
            return res.status(400).json({ error: 'Missing "number" parameter' });
        }

        try {
            const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`;

            const client = new MongoClient(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });

            await client.connect();
            
            const project = await client.db(process.env.MONGO_DB)
                .collection('proj')
                .findOne({ "project.Project Number:": projectNumber });

            if(!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            return res.status(200).json(project);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error connecting to db', details: error });
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }  
}

export default handler;
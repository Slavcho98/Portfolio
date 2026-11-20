import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'velvora';
const COLLECTION_NAME = 'products';

async function checkProducts() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Get total count
    const totalCount = await collection.countDocuments();
    console.log(`\n📊 Total products: ${totalCount}`);

    // Get sample product to see fields
    const sampleProduct = await collection.findOne();
    if (sampleProduct) {
      console.log('\n📋 Sample product structure:');
      console.log(JSON.stringify(sampleProduct, null, 2));
    }

    // Get all unique field names
    const pipeline = [
      {
        $project: {
          fields: { $objectToArray: '$$ROOT' }
        }
      },
      {
        $unwind: '$fields'
      },
      {
        $group: {
          _id: '$fields.k'
        }
      },
      {
        $sort: { _id: 1 }
      }
    ];

    const fields = await collection.aggregate(pipeline).toArray();
    console.log('\n🔑 All fields in products:');
    fields.forEach(f => console.log(`   - ${f._id}`));

    // Check for brand, source, client, type fields
    console.log('\n🏷️  Field value samples:');

    const fieldsToCheck = ['brand', 'source', 'client', 'type', 'origin'];
    for (const field of fieldsToCheck) {
      const samples = await collection.distinct(field).catch(() => []);
      if (samples.length > 0) {
        console.log(`   ${field}: ${samples.slice(0, 5).join(', ')}${samples.length > 5 ? '...' : ''}`);
      }
    }

    console.log('\n✅ Check complete! Use the fields above to identify which field indicates the client/source.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

checkProducts();

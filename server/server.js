import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { getSecret } from './secrets';
import ContentSubmission from './models/contentsubmission';

// Note: more or less pulling this from https://medium.com/@bryantheastronaut/ok-here-we-go-b9f683c5a00c

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res) => {
    res.json({ message: "Hello, word!" });
});

app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

router.get('/images', (req, res) => {
    ContentSubmission.find((err, content) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: content });
    });
});
router.post('/images', (req, res) => {
    const content = new ContentSubmission();
    const { data } = req.body;
    if (!data) {
        return res.json({
            success: false,
            error: "invalid input data"
        });
    }
    content.data = data;
    content.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, message: "foo bar blarg" });
    });
});


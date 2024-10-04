

const user = require('./models/userModel');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    {
        console.log(`Server is running on port ${PORT}`);
    }
)
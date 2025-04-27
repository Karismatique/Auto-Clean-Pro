import express from 'express';
import { ClientsCreate, ClientsGetById, ClientsDelete, ClientsUpdate} from './Controller/Client.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Client
app.post('/auto-clean-pro/client-create', ClientsCreate);
app.get('/auto-clean-pro/client-getById', ClientsGetById);
app.patch('/auto-clean-pro/client-updateById', ClientsUpdate);
app.delete('/auto-clean-pro/client-deleteById', ClientsDelete);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
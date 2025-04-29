import express from 'express';
import bodyParser from 'body-parser';
import { ClientsCreate, ClientsGetById, ClientsDelete, ClientsUpdate } from './Controller/Client.js';
import { VehiclesCreate, VehiclesGetById, VehiclesDelete, VehiclesUpdate } from './Controller/Vehicle.js';
import { AgenciesCreate, AgenciesGetById, AgenciesDelete, AgenciesUpdate } from './Controller/Agency.js';
import { EmployeesCreate, EmployeesGetById, EmployeesDelete, EmployeesUpdate } from './Controller/Employee.js';
import { ShiftsCreate, ShiftsGetById, ShiftsUpdateById, ShiftsDeleteById } from './Controller/Shift.js';
import { AppointmentsCreate, AppointmentsGetById, AppointmentsUpdate, AppointmentsDelete } from './Controller/Appointment.js';
import { CleaningTypesCreate, CleaningTypesGetById, CleaningTypesUpdate, CleaningTypesDelete } from './Controller/CleaningType.js';
import { ProductsCreate, ProductsGetById, ProductsUpdate, ProductsDelete } from './Controller/Product.js';
import { SoldProductsCreate, SoldProductsGetById, SoldProductsUpdate, SoldProductsDelete } from './Controller/SoldProduct.js';
import { BlogPostCreate, BlogPostGetById, BlogPostUpdate, BlogPostDelete } from './Controller/BlogPost.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Clients
app.post('/auto-clean-pro/client-create', ClientsCreate);
app.get('/auto-clean-pro/client-getById', ClientsGetById);
app.patch('/auto-clean-pro/client-updateById', ClientsUpdate);
app.delete('/auto-clean-pro/client-deleteById', ClientsDelete);

// Vehicles
app.post('/auto-clean-pro/vehicle-create', VehiclesCreate);
app.get('/auto-clean-pro/vehicle-getById', VehiclesGetById);
app.patch('/auto-clean-pro/vehicle-updateById', VehiclesUpdate);
app.delete('/auto-clean-pro/vehicle-deleteById', VehiclesDelete);

// Agencies
app.post('/auto-clean-pro/agency-create', AgenciesCreate);
app.get('/auto-clean-pro/agency-getById', AgenciesGetById);
app.patch('/auto-clean-pro/agency-updateById', AgenciesUpdate);
app.delete('/auto-clean-pro/agency-deleteById', AgenciesDelete);

// Employees
app.post('/auto-clean-pro/employee-create', EmployeesCreate);
app.get('/auto-clean-pro/employee-getById', EmployeesGetById);
app.patch('/auto-clean-pro/employee-updateById', EmployeesUpdate);
app.delete('/auto-clean-pro/employee-deleteById', EmployeesDelete);

// Shifts
app.post('/auto-clean-pro/shift-create', ShiftsCreate);
app.get('/auto-clean-pro/shift-getById', ShiftsGetById);
app.patch('/auto-clean-pro/shift-updateById', ShiftsUpdateById);
app.delete('/auto-clean-pro/shift-deleteById', ShiftsDeleteById);

// Appointments
app.post('/auto-clean-pro/appointment-create', AppointmentsCreate);
app.get('/auto-clean-pro/appointment-getById', AppointmentsGetById);
app.patch('/auto-clean-pro/appointment-updateById', AppointmentsUpdate);
app.delete('/auto-clean-pro/appointment-deleteById', AppointmentsDelete);

// Cleaning Types
app.post('/auto-clean-pro/cleaning-type-create', CleaningTypesCreate);
app.get('/auto-clean-pro/cleaning-type-getById', CleaningTypesGetById);
app.patch('/auto-clean-pro/cleaning-type-updateById', CleaningTypesUpdate);
app.delete('/auto-clean-pro/cleaning-type-deleteById', CleaningTypesDelete);

// Products
app.post('/auto-clean-pro/product-create', ProductsCreate);
app.get('/auto-clean-pro/product-getById', ProductsGetById);
app.patch('/auto-clean-pro/product-updateById', ProductsUpdate);
app.delete('/auto-clean-pro/product-deleteById', ProductsDelete);

// Sold Products
app.post('/auto-clean-pro/sold-product-create', SoldProductsCreate);
app.get('/auto-clean-pro/sold-product-getById', SoldProductsGetById);
app.patch('/auto-clean-pro/sold-product-updateById', SoldProductsUpdate);
app.delete('/auto-clean-pro/sold-product-deleteById', SoldProductsDelete);

// Blog Posts
app.post('/auto-clean-pro/blog-post-create', BlogPostCreate);
app.get('/auto-clean-pro/blog-post-getById', BlogPostGetById);
app.patch('/auto-clean-pro/blog-post-updateById', BlogPostUpdate);
app.delete('/auto-clean-pro/blog-post-deleteById', BlogPostDelete);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

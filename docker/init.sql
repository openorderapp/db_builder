create database openorder_db;
CREATE ROLE openorder_backend_user WITH LOGIN PASSWORD 'dummypassword';
ALTER ROLE openorder_backend_user LOGIN;
GRANT CREATE, CONNECT ON DATABASE openorder_db TO openorder_backend_user;
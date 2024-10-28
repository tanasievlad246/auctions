CREATE SCHEMA IF NOT EXISTS transport_auctions;
GRANT ALL ON SCHEMA transport_auctions TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions GRANT ALL ON TABLES TO postgres;
CREATE SCHEMA IF NOT EXISTS transport_auctions;
GRANT ALL ON SCHEMA transport_auctions TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions GRANT ALL ON TABLES TO postgres;

CREATE SCHEMA IF NOT EXISTS transport_auctions_users;
GRANT ALL ON SCHEMA transport_auctions_users TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions_users GRANT ALL ON TABLES TO postgres;

CREATE SCHEMA IF NOT EXISTS transport_auctions_notifications;
GRANT ALL ON SCHEMA transport_auctions_notifications TO postgres;
ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions_notifications GRANT ALL ON TABLES TO postgres;

-- CREATE FOR FREIGHTS SERVICE
-- CREATE SCHEMA IF NOT EXISTS transport_auctions_freights;
-- GRANT ALL ON SCHEMA transport_auctions_freights TO postgres;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions_freights GRANT ALL ON TABLES TO postgres;

-- CREATE FOR CHAT SERVICE
-- CREATE SCHEMA IF NOT EXISTS transport_auctions_chat;
-- GRANT ALL ON SCHEMA transport_auctions_chat TO postgres;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions_chat GRANT ALL ON TABLES TO postgres;

-- CREATE FOR TRANSPORTS CMS ORDERS SERVICE
-- CREATE SCHEMA IF NOT EXISTS transport_auctions_orders;
-- GRANT ALL ON SCHEMA transport_auctions_orders TO postgres;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions_orders GRANT ALL ON TABLES TO postgres;

-- CREATE FOR TRANSPORTS CMS FLEET SERVICE
-- CREATE SCHEMA IF NOT EXISTS transport_auctions_fleet;
-- GRANT ALL ON SCHEMA transport_auctions_fleet TO postgres;
-- ALTER DEFAULT PRIVILEGES IN SCHEMA transport_auctions_fleet GRANT ALL ON TABLES TO postgres;

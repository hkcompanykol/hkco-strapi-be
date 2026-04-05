const { parse } = require("pg-connection-string");

module.exports = ({ env }) => {
    const databaseUrl = env("DATABASE_URL");

    if (databaseUrl) {
        const config = parse(databaseUrl);

        return {
            connection: {
                client: "postgres",
                connection: {
                    host: config.host,
                    port: Number(config.port || 5432),
                    database: config.database,
                    user: config.user,
                    password: config.password,
                    ssl: env.bool("DATABASE_SSL", false)
                        ? {
                              rejectUnauthorized: env.bool(
                                  "DATABASE_SSL_REJECT_UNAUTHORIZED",
                                  false
                              ),
                          }
                        : false,
                },
                pool: {
                    min: env.int("DATABASE_POOL_MIN", 2),
                    max: env.int("DATABASE_POOL_MAX", 20),
                },
                schema: env("DATABASE_SCHEMA", "public"),
            },
            settings: {
                forceMigration: true,
                runMigrations: true,
            },
        };
    }

    return {
        connection: {
            client: "postgres",
            connection: {
                host: env("DATABASE_HOST", "127.0.0.1"),
                port: env.int("DATABASE_PORT", 5432),
                database: env("DATABASE_NAME", "postgres"),
                user: env("DATABASE_USERNAME", "postgres"),
                password: env("DATABASE_PASSWORD", "postgres"),
                ssl: env.bool("DATABASE_SSL", false)
                    ? {
                          rejectUnauthorized: env.bool(
                              "DATABASE_SSL_REJECT_UNAUTHORIZED",
                              false
                          ),
                      }
                    : false,
            },
            pool: {
                min: env.int("DATABASE_POOL_MIN", 2),
                max: env.int("DATABASE_POOL_MAX", 20),
            },
        },
    };
};

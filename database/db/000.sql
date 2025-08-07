USE murphyshome;

-- Schema Version Table
CREATE TABLE IF NOT EXISTS schema_version (
    `version` VARCHAR(4) NOT NULL,
    `dateUpdated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`version`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO schema_version (version) VALUES ('0');
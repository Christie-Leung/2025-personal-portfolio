USE murphyshome;

CREATE TABLE conversations (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  id CHAR(36) NOT NULL PRIMARY KEY,
  conversation_id CHAR(36),
  role ENUM('user', 'assistant', 'system') NOT NULL,
  content JSON NOT NULL,                  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  token_count INT,
  message_index INT,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);


UPDATE `schema_version` SET `version` = 1, `dateUpdated` = NOW();
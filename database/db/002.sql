USE murphyshome;

-- Companies 
CREATE TABLE companies (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  website VARCHAR(255),
  industry VARCHAR(100),
  location_text VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Experiences
CREATE TABLE experiences (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  id CHAR(36) PRIMARY KEY,
  company_id CHAR(36) NULL,
  title VARCHAR(255) NOT NULL,
  employment_type ENUM('full_time','part_time','internship','freelance','volunteer') 
    NOT NULL DEFAULT 'full_time',
  location_text VARCHAR(255),
  location_type ENUM('onsite','hybrid','remote'),
  start_date DATE NOT NULL,
  end_date DATE NULL,
  is_current BOOLEAN DEFAULT FALSE,
  summary TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_experience_company FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- Rich bullets/blocks per experience (store as JSON to support tables, code, etc.)
CREATE TABLE experience_bullets (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  id CHAR(36) PRIMARY KEY,
  experience_id CHAR(36) NOT NULL,
  order_index INT NOT NULL,
  block JSON NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bullets_experience FOREIGN KEY (experience_id) REFERENCES experiences(id),
  UNIQUE (experience_id, order_index)
);

-- Optional: links/refs to portfolios, PRs, apps, papers
CREATE TABLE experience_links (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  id CHAR(36) PRIMARY KEY,
  experience_id CHAR(36) NOT NULL,
  label VARCHAR(100),
  url VARCHAR(512) NOT NULL,
  order_index INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_links_experience FOREIGN KEY (experience_id) REFERENCES experiences(id)
);

-- Skills taxonomy
CREATE TABLE skills (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  UNIQUE (name)
);

-- M:N mapping
CREATE TABLE experience_skills (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  experience_id CHAR(36) NOT NULL,
  skill_id CHAR(36) NOT NULL,
  PRIMARY KEY (experience_id, skill_id),
  CONSTRAINT fk_xs_experience FOREIGN KEY (experience_id) REFERENCES experiences(id),
  CONSTRAINT fk_xs_skill FOREIGN KEY (skill_id) REFERENCES skills(id)
);

-- (Optional) attach specific experiences to a message in a custom order
-- if you sometimes want to hand-pick which experiences appear in a given message
CREATE TABLE messages_experiences (
  autoId INT AUTO_INCREMENT PRIMARY KEY,
  message_id CHAR(36) NOT NULL,
  experience_id CHAR(36) NOT NULL,
  order_index INT NOT NULL,
  PRIMARY KEY (message_id, experience_id),
  CONSTRAINT fk_me_msg FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
  CONSTRAINT fk_me_exp FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE
);

-- Helpful indexes
CREATE INDEX idx_experiences_company ON experiences(company_id);
CREATE INDEX idx_experiences_dates ON experiences(start_date, end_date);
CREATE INDEX idx_bullets_exp_order ON experience_bullets(experience_id, order_index);


UPDATE `schema_version` SET `version` = 2, `dateUpdated` = NOW();
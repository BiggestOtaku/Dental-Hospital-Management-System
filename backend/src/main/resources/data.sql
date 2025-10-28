INSERT INTO human_resource (hr_type, capacity)
SELECT 'Doctor', 50
WHERE NOT EXISTS (SELECT 1 FROM human_resource WHERE hr_type = 'Doctor');

INSERT INTO human_resource (hr_type, capacity)
SELECT 'Nurse', 100
WHERE NOT EXISTS (SELECT 1 FROM human_resource WHERE hr_type = 'Nurse');

INSERT INTO human_resource (hr_type, capacity)
SELECT 'Technician', 30
WHERE NOT EXISTS (SELECT 1 FROM human_resource WHERE hr_type = 'Technician');

INSERT INTO human_resource (hr_type, capacity)
SELECT 'Administrator', 10
WHERE NOT EXISTS (SELECT 1 FROM human_resource WHERE hr_type = 'Administrator');

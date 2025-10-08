INSERT INTO patients (first_name, middle_name, last_name, pincode, state, city, phone_number, email_id, dob, sex)
VALUES
('Lakshya', 'Kumar', 'Singhal', 110011, 'Delhi', 'New Delhi', '+919876543210', 'lakshya@example.com', '2003-05-15', 'Male'),
('Amit', NULL, 'Sharma', 560001, 'Karnataka', 'Bangalore', '+919800112233', 'amit.sharma@example.com', '1995-07-20', 'Male'),
('Priya', NULL, 'Verma', 400001, 'Maharashtra', 'Mumbai', '+919812345678', 'priya.verma@example.com', '1998-03-10', 'Female'),
('Rohan', NULL, 'Das', 700001, 'West Bengal', 'Kolkata', '+919933221100', 'rohan.das@example.com', '2000-11-05', 'Male'),
('Sneha', 'Rani', 'Kapoor', 600001, 'Tamil Nadu', 'Chennai', '+919811223344', 'sneha.kapoor@example.com', '1997-02-25', 'Female'),
('Arjun', NULL, 'Mehta', 380001, 'Gujarat', 'Ahmedabad', '+919844556677', 'arjun.mehta@example.com', '1996-09-15', 'Male'),
('Neha', NULL, 'Singh', 201301, 'Uttar Pradesh', 'Noida', '+919899001122', 'neha.singh@example.com', '1999-12-01', 'Female'),
('Vikram', 'Raj', 'Chopra', 122001, 'Haryana', 'Gurgaon', '+919822334455', 'vikram.chopra@example.com', '1994-04-18', 'Male');


INSERT INTO human_resource (hr_type, capacity) VALUES
('Doctor', 50),
('Nurse', 100),
('Technician', 30),
('Administrator', 10);

INSERT INTO employees (
    employee_type, first_name, middle_name, last_name, city, state,
    pincode, dob, phone_numbers, email_id, hr_type,
    joining_date, supervisor_id, sex
) VALUES
('Doctor', 'Amit', NULL, 'Sharma', 'Delhi', 'Delhi', '110001',
 '1985-06-15', '+919812345678', 'amit.sharma@hospital.com', 'Doctor',
 '2020-03-01', NULL, 'Male'),

('Doctor', 'Priya', NULL, 'Menon', 'Bangalore', 'Karnataka', '560001',
 '1990-09-10', '+919876543210', 'priya.menon@hospital.com', 'Doctor',
 '2021-05-15', NULL, 'Female'),

('Doctor', 'Ravi', 'Kumar', 'Patel', 'Ahmedabad', 'Gujarat', '380001',
 '1982-12-05', '+919834567890', 'ravi.patel@hospital.com', 'Doctor',
 '2019-11-20', NULL, 'Male');

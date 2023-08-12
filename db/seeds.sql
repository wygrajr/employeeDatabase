INSERT INTO departments (department_name)
VALUES ("IT"),
       ("HR"),
       ("Ops"),
       ("Sales");

INSERT INTO roles (department_id, title, salary)
VALUES (1, "Chief IT Rockstar", 10),
       (2, "Frontdesk", 5),
       (1, "Specialist", 6),
       (3, "Wizard", 1000),
       (4, "Sales Manager", 100);
       
INSERT INTO employees (role_id, first_name, last_name, manager_id)
VALUES (1, "Gabe", "Ur", 2),
       (2, "Wy", "cli", NULL);
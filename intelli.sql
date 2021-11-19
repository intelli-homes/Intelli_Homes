CREATE TABLE userstb( userid SERIAL, firstname VARCHAR(32), lastname VARCHAR(32), 
				   DOB VARCHAR(64), gender VARCHAR(32), password text, password2 text,
				   email text unique, phone text, userole text, avator bytea);
				
				
INSERT INTO userstb( firstname, lastname, DOB, gender, password, password2, email, phone, userole, avator) 
VALUES('Ramahadi', 'Moheane', ' 3 may', 'male', '1234', '1234', 'moheanerj@gmail', '0788356810', 'Admin', 'C:/Users/Lenovo-User/Pictures/Screenshots/1.jpg'); 


CREATE TABLE updatestb( updateid SERIAL, tittle VARCHAR(32), post_content VARCHAR(2000), created_on timestamp without time zone DEFAULT now(), image bytea);
				
		
INSERT INTO updatestb(tittle, post_content, image) 
VALUES('Cops kills a crimimnal', ' vehicle and three armed men got out and approached the vehicle.', 'C:/Users/Lenovo-User/Pictures/Screenshots/2.jpg'); 





select * from updatestb

select * from userstb

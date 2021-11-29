CREATE TABLE userstb( userid SERIAL PRIMARY KEY, firstname VARCHAR(32), lastname VARCHAR(32), 
				   DOB VARCHAR(64), gender VARCHAR(32), provinces VARCHAR(50), password text, password2 text,
				   email text unique, phone text, userole text, avator bytea);
				
				
INSERT INTO userstb( firstname, lastname, DOB, gender, provinces, password, password2, email, phone, userole, avator) 
VALUES('Ramahadi', 'Moheane', ' 3 may', 'male','Gauteng', '1234', '1234', 'moheanerj@gmail.com', '0788356810', 'Admin', 'C:/Users/Lenovo-User/Pictures/Screenshots/1.jpg'); 


CREATE TABLE updatestb( updateid SERIAL PRIMARY KEY, tittle VARCHAR(32), post_content VARCHAR(2000), created_on timestamp without time zone DEFAULT now(), image bytea);
				
		
INSERT INTO updatestb(tittle, post_content, image) 
VALUES('Cops kills a crimimnal', ' vehicle and three armed men got out and approached the vehicle.', 'C:/Users/Lenovo-User/Pictures/Screenshots/2.jpg'); 


CREATE TABLE poststb( postid SERIAL PRIMARY KEY, userid  INTEGER REFERENCES userstb(userid), tittle VARCHAR(50), 
				    postmedia bytea, postcontent VARCHAR(6400));
				
				
INSERT INTO poststb values (1,1,'Crimes in Windburg', 'C:/Users/Lenovo-User/Pictures/Screenshots/1.jpg', ' suspect appeared in the Randburg Magistrate’s Court on 29 June after detectives charged him with fraud.

According to Sandton Police Station spokesperson Captain Granville Meyer, the 47-year-old male suspect allegedly tried to purchase a cell phone with a fraudulent shopping card at a retail store in Sandton on 27 June.' ); 





CREATE TABLE userstb( userid integer PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(32), lastname VARCHAR(32), 
				   DOB VARCHAR(64), gender VARCHAR(32), provinces VARCHAR(50), password text, password2 text,
				   email text unique, phone text, userole text, avator BLOB);
				
				
INSERT INTO userstb( firstname, lastname, DOB, gender, provinces, password, password2, email, phone, userole, avator) 
VALUES('Ramahadi', 'Moheane', ' 3 may', 'male','Gauteng', '1234', '1234', 'moheanerj@gmail.com', '0788356810', 'Admin', 'C:/Users/Lenovo-User/Pictures/Screenshots/1.jpg'); 


CREATE TABLE updatestb(updateid integer PRIMARY KEY AUTOINCREMENT, tittle text, post_content text, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, image BLOB);
				
		
INSERT INTO updatestb(tittle, post_content, image) 
VALUES('Cops kills a crimimnal', ' vehicle and three armed men got out and approached the vehicle.', 'C:/Users/Lenovo-User/Pictures/Screenshots/2.jpg'); 


CREATE TABLE poststb(postid integer PRIMARY KEY AUTOINCREMENT, userid  INTEGER REFERENCES userstb(userid), tittle text, post_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
				    postmedia BLOB, postcontent text);
				
				
INSERT INTO poststb(userid, tittle, postmedia, postcontent) values (1,'Crimes in Windburg', 'C:/Users/Lenovo-User/Pictures/Screenshots/1.jpg', ' suspect appeared in the Randburg Magistrate’s Court on 29 June after detectives charged him with fraud.

According to Sandton Police Station spokesperson Captain Granville Meyer, the 47-year-old male suspect allegedly tried to purchase a cell phone with a fraudulent shopping card at a retail store in Sandton on 27 June.' ); 





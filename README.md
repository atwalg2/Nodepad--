# Group Name: Nodepad--

# Edmonton Public Library Ticketing System

## Group Members:
* [Jack Staples](https://github.com/JackStaples)
* [Brett Anderson](https://github.com/Brett-A-T-Anderson)
* [Jordan Hewko](https://github.com/jordanhewko)
* [Sunny Atwal](https://github.com/atwalg2)

## Requirements:
This web applications was built to run best with the following tools:
* [Node.JS Version 6.9.4](https://nodejs.org/download/release/v6.9.4/)
* [Ubuntu Linux Version 16.04 LTS](http://releases.ubuntu.com/16.04/)
* [Google Chrome](https://www.google.com/chrome/)
* [MySQL Version 5.7.17](https://www.mysql.com/)
## Installation by Command Line
1. Clone the repository with <pre>git clone https://github.com/macewanCS/Nodepad--</pre>
2. Navigate into the root of the repository
3. Install all dependencies using <pre>npm install</pre>
4. Install MySQL and create a user named temp with the command <pre>CREATE USER 'temp'@'localhost' IDENTIFIED BY '1234';</pre>
5. Give that user permissions with the command <pre>GRANT ALL PRIVILEGES ON * . * TO 'temp'@'localhost';</pre>
6. Initialize the database with <pre>node src/scripts/create_database.js</pre>
7. Launch the application using <pre>node src/main.js</pre>
8. The web application should now run at <pre>localhost:8080</pre>
9. Login using one of the user accounts listed below


## Seeded Users
| Account Type  |  Username | Password  | Branch  |
|---|---|---|---|
| Library User  | jack  | 1234  | Mill Woods  |
| Library User  | brett  | 1234  | Mill Woods  |
| Library User  | jordan  | 1234  | Calder  |
| Library User  | sunny  | 1234  | Grant MacEwan LM  |
| IT User  | cam  | 1234  | IT  |
| HR User  | max  | package  | HR  |

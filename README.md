# Belajar NFT Part 1
 Belajar Compile Contract, Deploy Contract, dan Minting Token.
 
# DB Setup
- Note that this app use MySQL DB for saving metadata, so make sure you have one.
- Heads over your MySQL Phpmyadmin.
- Create a new DB.
- Import the sql file. (DB SQL.sql)
 
# How to Use (Locally)
- Clone this repository.
- Run 'npm install'.
- Rename the config file example from ".env.example" to ".env".
- Fill in your config file such as DB_HOST and etc.
- Run the index.js using node (node app/index.js).
- App will run at http://localhost:3000.

# How to Deploy
- Clone this repository.
- Rename the config file example from ".env.example" to ".env".
- Fill in your config file such as DB_HOST and etc.
- Pack or Compress the cloned repository.
- Upload the packed file to the httpdocs on your hosting service.
- Extract and move all the file inside to the root of your httpdocs.
- Modify the app port at "app/index.js -> app.listen((process.env.PORT || 3000))" from 3000 to 8080 or else that your server can hold.
- Configure your server's node js setting, make sure that make sure that the App Startup File is "app/index.js".
- Run NPM Install and Restart your Server.

# How to Deploy on Heroku
- Clone this repository.
- Make sure you have heroku-cli installed.
- Create a new heroku project. "heroku create project-name".
- Perform "git add ."
- Make your first commit, "git commit -m <message>".
- Push the repository to heroku "git push heroku master".
- Wait until the process is done.
- Heads over to your heroku project dashboard.
- Click on settings.
- Go to "Config Vars", tap "Reveal Config".
- Enter your config file just like the ".env.example".
- You're Done.

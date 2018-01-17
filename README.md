# BeeStock Admin Dashboard
Admin Dashboard is a project for managing users, photos, and everything else on the BeeStock project.


## Getting Started For Development
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


* **Prerequisites**
  - [node.js-v8.x](https://nodejs.org/en/download/)
  - [git-v2.x](https://git-scm.com/downloads)


  * **Install Dependencies**
  
```bash
git clone https://github.com/almasry/beestock-admin-dashboard.git
cd beestock-admin-dashboard
npm install
```
 

  * **Running The project**
  
```bash
npm run dev
``` 


## Getting Started For Production
These instructions will get you a copy of the project up and running on Ubuntu 16.04 for production.




* **Prerequisites**
  - [node.js-v8.x](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
  - [forever](https://www.npmjs.com/package/forever#installation)
  - [git-v2.x](https://git-scm.com/download/linux)
  
```bash
# Install node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
```

```bash
# Install forever
npm install -g forever
forever --version
```

```bash
# Install git
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt -y install git
git --version
```

  
  * **Prepare The Project Structure**
  
```bash
mkdir -p ~/project/logs
cd ~/project
```

  * **Configure `express.js` To Serve The App**
```
npm install express --save
cat <<EOF > ~/project/server.js
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

let app = express();
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port ' + port)
});
EOF
```


  * **Clone/Build *develop* Branch Then Install Dependencies**
```bash
cd ~
git clone -b develop https://github.com/almasry/beestock-admin-dashboard.git
cd beestock-admin-dashboard
npm install
npm run build
```


  * **Configure The Firewall To Redirect From 80 To 8080**
```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

  * **Create Aliases for Start/Stop/Restart
```bash
alias start_app='forever start ~/project/server.js'
alias restart_app='forever restart ~/project/server.js'
alias stop_app='forever stop ~/project/server.js'
```

  * **Start/Stop/Restart The project**
```bash
start_app
restart_app
stop_app
```

## Built With
* [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
* [Node.js](https://nodejs.org/en/) - The JavaScript runtime

## Versioning
Still under development

## License
This project is licensed under the MIT License.
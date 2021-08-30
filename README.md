# TopologyGenerator

A topology generator built using angular and Flask. Nodes can be created either by text commands or drag and drop. Similarly, they can be linked by clicking on the nodes or by text commands. Nodes can also be renamed to custom names.  

## Docker Deployment
A docker image can be built using the following commands after cloning the repository
```bash
cd <path-to-repository>
docker build -t <tagname> .
docker run -p <port>:80 <tagname>
```
The app can be viewed in the URL `http://localhost:<port>/`

## Local setup

Please install the following:
- nodejs
- npm
- python3
- pip

Install angular
```bash
 npm install -g @angular/cli 
```

Install flask
```bash
python3 -m pip install flask
```

Build the angular project
```bash
ng build  --base-href=/topology-generator/
```

Run flask server
```bash
export FLASK_APP=hello
flask run
```
The app can be viewed in the URL `http://localhost:5000/`

## How to use ?

### Graphic view
 - New nodes can be created by dragging from the circle in the top right corner.
 - Two nodes can be linked by clicking them one after the other
 - The nodes can be dragged anywhere
 - A node can be renamed by right clicking on it

### Text view
 - Command for creating new node is `node <nodeName>`
 - Command for creating a link is `Link <nodeName> <nodeName>`


Please refer the video explaining the working of the software



https://user-images.githubusercontent.com/21989232/131310003-d35fe248-0647-45d1-b174-76b774387600.mp4







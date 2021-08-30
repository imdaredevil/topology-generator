FROM ubuntu

RUN apt update
RUN apt install -y curl gcc g++ make python3 python3-pip
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install nodejs
RUN npm install -g @angular/cli
RUN python3 -m pip install flask gunicorn


WORKDIR /app
COPY . .
RUN ng build  --base-href=/topology-generator/
ENV FLASK_APP=hello
EXPOSE 80
CMD ["gunicorn","-w","4","-b","0.0.0.0:80","hello:app"]
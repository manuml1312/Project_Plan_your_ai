FROM node:18.13
ENV VIRTUAL_ENV=/app/venv PATH="$VIRTUAL_ENV/bin:$PATH"
RUN apt install --fix-broken && apt-get \
 update && apt-get -y --force-yes install python3 \
 python3-venv python3-pip build-essential libssl-dev libffi-dev \
 python3-dev && python3 -m venv $VIRTUAL_ENV
WORKDIR /app/venv/bin
COPY requirements.txt .
ENV PATH="/app/venv/bin:$PATH"
RUN . /app/venv/bin/activate && pip3 install -r requirements.txt 
COPY . /app/
WORKDIR /app
RUN npm install
EXPOSE 5000
CMD /app/venv/python3 /app/mongo_V1.py

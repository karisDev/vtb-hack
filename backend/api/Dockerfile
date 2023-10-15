FROM python:3.11

WORKDIR /backend

RUN python3 -m venv venv
RUN . venv/bin/activate
# Install dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

ENV PYTHONPATH="."

# Run your app
COPY . .
CMD [ "python3", "-m", "app" ]

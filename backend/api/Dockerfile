FROM python:3.11

WORKDIR /backend

RUN python3 -m venv venv
RUN . venv/bin/activate
# Install dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN pip3 install torch torchvision torchaudio -f https://download.pytorch.org/whl/cu111/torch_stable.html

RUN pip3 install git+https://github.com/Adapter-Hub/adapter-transformers.git



ENV PYTHONPATH="."

# Run your app
COPY . .
CMD [ "python3", "-m", "app" ]

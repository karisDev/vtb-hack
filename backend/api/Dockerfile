FROM nvidia/cuda:12.0.0-base-ubuntu20.04

ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
        git \
        python3-pip \
        python3-dev \
        python3-opencv \
        libglib2.0-0

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Install PyTorch, torchvision and adapter-transformers
RUN pip3 install torch torchvision torchaudio -f https://download.pytorch.org/whl/cu111/torch_stable.html

RUN pip3 install git+https://github.com/Adapter-Hub/adapter-transformers.git

WORKDIR /backend

COPY requirements.txt ./
RUN pip install -r requirements.txt

ENV PYTHONPATH="."

# Run your app
COPY . .
CMD [ "python3", "-m", "app" ]

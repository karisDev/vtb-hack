"""
    Установки:
        1)  pip install git+https://github.com/Adapter-Hub/adapter-transformers.git
        2)  pip install torch
"""

import json
import os

import requests
from transformers import RobertaConfig, RobertaModelWithHeads, TrainingArguments, \
    RobertaTokenizer, TextClassificationPipeline
import torch
import warnings

warnings.filterwarnings("ignore")

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(device)

training_args = TrainingArguments(
    learning_rate=5e-5,
    num_train_epochs=30,
    per_device_train_batch_size=64,
    per_device_eval_batch_size=64,
    logging_steps=20,
    output_dir="./training_output",
    overwrite_output_dir=False,
    # The next line is important to ensure the dataset labels are properly passed to the model
    remove_unused_columns=True,
)



class Adapter:
    def __init__(self, base_path):
        # self.prepare_model()
        self.path = base_path
        self.classifier = TextClassificationPipeline(model=Adapter.load_model(self),
                                                     tokenizer=Adapter.load_tokenizer(self))

    def load_config(self):
        config = RobertaConfig.from_pretrained(
            self.path+'config.json',
            num_labels=2,
        )
        return config

    def load_model(self):
        model = RobertaModelWithHeads.from_pretrained(
            self.path+'pytorch_model.bin',
            config=Adapter.load_config(self)
        )
        model.set_active_adapters("vika")
        return model

    def load_tokenizer(self):
        tokenizer = RobertaTokenizer.from_pretrained('ai-forever/ruRoberta-large')
        return tokenizer

    def get_response(self, text: str) -> list:
        label = self.classifier(text)[0]['label']
        return label
    """
    def prepare_model(self):
        if not os.path.exists('pytorch_model.bin'):
            response = requests.get('https://7399718814.obj-storage.com/models/pytorch_model.bin')
            open('pytorch_model.bin', "wb").write(response.content)
        if not os.path.exists('config.json'):
            response = requests.get('https://7399718814.obj-storage.com/models/config.json')
            open('config.json', "wb").write(response.content)
        if not os.path.exists('generation_config.json'):
            response = requests.get('https://7399718814.obj-storage.com/models/generation_config.json')
            open('generation_config.json', "wb").write(response.content)
        if not os.path.exists('merges.txt'):
            response = requests.get('https://7399718814.obj-storage.com/models/merges.txt')
            open('merges.txt', "wb").write(response.content)
        if not os.path.exists('special_tokens_map.json'):
            response = requests.get('https://7399718814.obj-storage.com/models/special_tokens_map.json')
            open('special_tokens_map.json', "wb").write(response.content)
        if not os.path.exists('tokenizer_config.json'):
            response = requests.get('https://7399718814.obj-storage.com/models/tokenizer_config.json')
            open('tokenizer_config.json', "wb").write(response.content)
        if not os.path.exists('vocab.json'):
            response = requests.get('https://7399718814.obj-storage.com/models/vocab.json')
            open('vocab.json', "wb").write(response.content)
"""

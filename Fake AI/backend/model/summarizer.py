from transformers import pipeline
import re

summarizer = pipeline(
    "summarization",
    model="google/pegasus-cnn_dailymail"
)

def remove_discourse_markers(text):
    patterns = [
        r'\bon one hand\b',
        r'\bon the other hand\b',
        r'\bfurthermore\b',
        r'\bmoreover\b',
        r'\bin conclusion\b'
    ]
    for p in patterns:
        text = re.sub(p, '', text, flags=re.I)
    return re.sub(r'\s+', ' ', text).strip()

def summarize_text(text, max_length=80, min_length=35):
    if len(text.split()) < 60:
        return text

    cleaned_text = remove_discourse_markers(text)

    result = summarizer(
        cleaned_text,
        max_length=max_length,
        min_length=min_length,
        do_sample=False,
        no_repeat_ngram_size=4,
        length_penalty=1.4,
        truncation=True
    )

    summary = result[0]["summary_text"]
    summary = summary.replace("<n>", " ")
    summary = re.sub(r'\s+', ' ', summary).strip()

    return summary

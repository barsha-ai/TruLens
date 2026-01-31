from flask import Flask, request, jsonify
from flask_cors import CORS
from model.keyword_extractor import extract_keywords_tfidf
from model.fake_news import detect_fake_news
from model.sentiment import analyze_sentiment
from model.summarizer import summarize_text
import re

app = Flask(__name__)
CORS(app)

# ---------------- KEYWORD EXTRACTION ----------------
@app.route('/extract', methods=['POST'])
def extract():
    data = request.get_json()
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"error": "No text provided"}), 400
    keywords = extract_keywords_tfidf(text)
    return jsonify({"keywords": keywords})


def clean_text(text):
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    words = [w for w in text.split() if len(w) > 2]
    return " ".join(words)

@app.route('/')
def home():
    return "Welcome to the Text Analysis API"

@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    cleaned = clean_text(text)
    n = data.get("n", 10)
    keywords = extract_keywords_tfidf(cleaned, n)

    return jsonify({"keywords": keywords})


# ---------------- FAKE NEWS ----------------
@app.route('/fake-news', methods=['POST'])
def fake_news_api():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    result = detect_fake_news(text)
    return jsonify(result)


# ---------------- SENTIMENT ----------------
@app.route('/sentiment', methods=['POST'])
def sentiment():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    result = analyze_sentiment(text)
    return jsonify(result)


# ---------------- SUMMARIZATION ----------------
@app.route('/summarize', methods=['POST'])
def summarize_api():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    summary = summarize_text(text)
    return jsonify({"summary": summary})


# ---------------- RUN APP (LAST LINE) ----------------
if __name__ == '__main__':
    app.run(debug=True)

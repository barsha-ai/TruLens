import joblib
import re

vectorizer = joblib.load("model/fake_vectorizer.pkl")
model = joblib.load("model/fake_news_model.pkl")

def clean_text(text):
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    text = text.lower()
    return text

def detect_fake_news(text):
    text = clean_text(text)
    vector = vectorizer.transform([text])
    prediction = model.predict(vector)[0]
    confidence = model.predict_proba(vector).max()
    if prediction == 0 and confidence > 0.8:
        label = "Fake"
    else:
        label = "True"

    return {
        "label": label,
        "confidence": round(float(confidence), 3)
    }

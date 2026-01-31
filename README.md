# TruLens
# TruLens – Real‑Time Fake News Analysis Platform

## 1. Problem Statement
The rapid spread of misinformation through news websites and social media platforms has made it difficult for users to distinguish between **credible information** and **fake or misleading content**. Existing solutions are often fragmented, slow, or non‑transparent.

**TruLens** addresses this problem by providing a unified system that helps users:
- Detect whether a news article is **FAKE or TRUE**
- Understand the **sentiment** behind the content
- Get a **concise summary** of long articles
- Extract **important keywords** for quick understanding

The solution is delivered as:
- A **Chrome Extension** (real‑time analysis while browsing)
- A **Web Application** (manual input & analysis)
- A set of **REST APIs** (reusable and extensible)

---

## 2. Solution Overview
TruLens is a full‑stack AI‑powered analysis system that performs **news credibility assessment and text analytics** using modern NLP techniques.

### Core Capabilities
- **Fake News Detection** (Binary classification: TRUE / FAKE)
- **Sentiment Analysis** (Positive / Neutral / Negative)
- **Text Summarization** (Abstractive summarization)
- **Keyword Extraction** (TF‑IDF based)

The system is designed to be:
- Modular
- Reproducible
- Hackathon‑ready
- Easy to deploy locally

---

## 3. System Architecture

**High‑level Flow:**

User (Browser / Website)
→ Chrome Extension or Web UI
→ Flask Backend APIs
→ NLP / ML Models
→ Structured JSON Response
→ Visual Indicators (FAKE / TRUE, Summary, Sentiment)
```bash
+----------------------+
|        User          |
| (Browser / Website) |
+----------+-----------+
           |
           v
+------------------------------+
|   Chrome Extension / Web UI  |
|  - Article Capture           |
|  - Manual Text Input         |
+----------+-------------------+
           |
           v
+------------------------------+
|      Flask Backend APIs      |
|  - /fake-news                |
|  - /sentiment                |
|  - /summarize                |
|  - /keywords                 |
+----------+-------------------+
           |
           v
+------------------------------+
|     NLP / ML Models Layer    |
|  - Fake News Classifier      |
|  - Sentiment Analyzer        |
|  - PEGASUS Summarizer        |
|  - TF-IDF Keyword Extractor  |
+----------+-------------------+
           |
           v
+------------------------------+
|   Structured JSON Response   |
|  - TRUE / FAKE               |
|  - Sentiment                 |
|  - Summary                   |
|  - Keywords                  |
+----------+-------------------+
           |
           v
+------------------------------+
|     Visual Indicators UI     |
|  - FAKE / TRUE Badge         |
|  - Sentiment Tag             |
|  - Summary View              |
|  - Highlighted Keywords      |
+------------------------------+

```
Each feature is exposed as an independent API and can also be accessed through a unified workflow.

---

## 4. Tech Stack

### Frontend
- HTML, CSS, JavaScript
- Chrome Extension APIs

### Backend
- Python 3.11
- Flask + Flask‑CORS

### AI / ML
- Hugging Face Transformers
- Pretrained Fake News Classifier (BERT‑based)
- PEGASUS (CNN/DailyMail) for summarization
- VADER for sentiment analysis
- TF‑IDF (scikit‑learn) for keyword extraction

### Tools
- Postman (API testing)
- GitHub (version control)

---

## 5. Features & APIs

### 5.1 Fake News Detection API
**Endpoint:**
```
POST /fake-news
```
**Input:**
```json
{ "text": "News article text" }
```
**Output:**
```json
{ "label": "FAKE" }
```

Model is loaded from Hugging Face and uses dynamic label mapping from the model configuration.

---

### 5.2 Sentiment Analysis API
**Endpoint:**
```
POST /sentiment
```
**Output:**
```json
{ "sentiment": "Negative" }
```

---

### 5.3 Text Summarization API
**Endpoint:**
```
POST /summarize
```
Uses PEGASUS CNN/DailyMail model for abstractive summarization.

---

### 5.4 Keyword Extraction API
**Endpoint:**
```
POST /api
```
Uses TF‑IDF to extract top keywords from cleaned text.

---

## 6. Prompt Engineering


```
You are an AI assistant acting as a senior full-stack and NLP engineer.


Your goals:
- Design a clean, modular AI system
- Prefer reproducible, free, or open-source solutions where possible
- Avoid hallucinated facts
- Clearly explain technical trade-offs
- Generate production-ready Python code


Constraints:
- Use Flask for backend APIs
- Prefer Hugging Face models over proprietary ones
- Ensure code is hackathon-ready and reproducible
```

```
I require a recommendation for the best Hugging Face model for a fake news detection system that I am building for a hackathon. The response should include the following details:  
1. Name of the recommended model  
2. Explanation of why this model is suitable for binary classification (FAKE / TRUE)  
3. Overview of the model's performance metrics (accuracy, F1 score, etc.) if available  
4. Instructions on how to deploy the model in a Flask backend  

Ensure that the recommendation adheres to the following criteria:  
- The model must be free to use with no paid APIs involved  
- It should be reliable when applied to news-style text  
- The deployment process must be straightforward for integration with a Flask backend  

For context, I have experience in software development but limited knowledge of natural language processing (NLP) techniques. This model will be utilized in a competitive environment, so I need clear justifications and deployment steps that are easy to follow.
```
```
I am building a fake news detection system for a hackathon.


Requirements:
- Binary classification (FAKE / TRUE)
- Free to use (no paid APIs)
- Reliable on news-style text
- Easy to deploy in a Flask backend


Recommend the best Hugging Face model and explain why it is suitable.
```
```
I am building a fake news detection system for a hackathon.


Requirements:
- Binary classification (FAKE / TRUE)
- Free to use (no paid APIs)
- Reliable on news-style text
- Easy to deploy in a Flask backend


Recommend the best Hugging Face model and explain why it is suitable.
```


```
I want my fake news detection system to be explainable.


Task:
- Propose simple, rule-based explanations
- Avoid retraining the model
- Keep explanations understandable for non-technical users


Provide a Python-based approach.
```

```
I need to summarize long news articles.


Requirements:
- Abstractive summarization
- Free and open-source model
- Suitable for news articles
- Should avoid copying sentences directly


Recommend a Hugging Face model and provide example code.
```
```
Design a sentiment analysis API for news articles.


Requirements:
- Classify sentiment as Positive / Neutral / Negative
- Lightweight and fast
- Suitable for factual news text


Provide implementation guidance.
```
```
I want to extract important keywords from news articles.


Constraints:
- No deep learning
- Reproducible and fast
- Suitable for long text


Suggest a classical NLP approach with Python implementation.
```


```
Design a high-level system architecture for an AI-powered fake news analysis platform.


Requirements:
- Chrome Extension + Web App
- Flask backend
- Modular AI services
- Hackathon-ready and demo-friendly


Return a simple architecture diagram and explanation.
```
This prompt design:
- Is reusable across LLMs (ChatGPT, Claude, Gemini)
- Avoids model‑specific tokens
- Ensures deterministic output

---

## 7. Setup Instructions (Reproducibility – Mandatory)

### Prerequisites
- Python 3.11
- pip

### Installation
```bash
pip install -r requirements.txt
```

### Run Backend
```bash
python app.py
```

Backend runs at:
```
http://127.0.0.1:5000
```

---

## 8. How to Run Locally (For Judges)
1. Clone the repository
2. Install dependencies
3. Run `app.py`
4. Test APIs using Postman or Chrome Extension

All models are automatically downloaded on first run.

---

## 9. Innovation & Problem Solving
- Combines **classification + summarization + sentiment** in one platform
- Provides **real‑time browser‑level analysis** via extension
- Uses **free, reproducible AI models**
- Avoids black‑box outputs by keeping logic transparent

---

## 10. Demo Instructions

The demo video shows:
- Chrome Extension analyzing live news
- Website input & output
- API testing via Postman
- GitHub repository structure

---

## 11. Limitations & Future Scope

### Current Limitations
- Binary fake news classification
- No live web browsing

### Future Enhancements
- Multi‑claim extraction
- Source credibility scoring
- Cross‑language support
- Real‑time fact verification with external sources

---

## 12. Conclusion
TruLens demonstrates how AI can be responsibly applied to fight misinformation by combining **NLP models, clean architecture, and reproducible design**. The system is practical, extensible, and aligned with real‑world challenges.

---

**Project Name:** TruLens  
**Team Name:** Team InnoVentures \
**Category:** AI / NLP / Misinformation Detection  
**Hackathon:** Vibecraft

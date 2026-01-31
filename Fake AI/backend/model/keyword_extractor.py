from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS


def extract_keywords_tfidf(text, top_n=10, extra_stopwords=None):
   

    if extra_stopwords:
        stop_words = set(ENGLISH_STOP_WORDS).union(set(extra_stopwords))
    else:
        stop_words = 'english'

    tfidf = TfidfVectorizer(stop_words=stop_words)
    tfidf_matrix = tfidf.fit_transform([text])
    feature_names = tfidf.get_feature_names_out()
  
    scores = tfidf_matrix.toarray()[0]

    
    term_scores = [(w, float(s)) for w, s in zip(feature_names, scores) if s > 0]

    term_scores.sort(key=lambda x: x[1], reverse=True)
    top_terms = [w for w, s in term_scores[:top_n]]
    return top_terms

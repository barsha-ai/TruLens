// ================= EXISTING CODE (UNCHANGED) =================
document.getElementById("extract").addEventListener("click", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "extract_text" },
            async (response) => {

                if (chrome.runtime.lastError) {
                    document.getElementById("keywords").innerHTML =
                        "<p style='color:red;'>Error: " + chrome.runtime.lastError.message + "</p>";
                    return;
                }

                if (!response || !response.text) {
                    document.getElementById("keywords").innerHTML =
                        "<p style='color:red;'>Failed to extract text.</p>";
                    return;
                }

                const apiUrl = "http://127.0.0.1:5000/api";
                const n = Number(document.getElementById("count").value) || 10;

                try {
                    const res = await fetch(apiUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            text: response.text,
                            n: n        
                        })
                    });

                    const data = await res.json();

                    const container = document.getElementById("keywords");
                    container.innerHTML = "";
                    document.getElementById("keywordCount").textContent = data.keywords.length;

                    data.keywords.forEach(word => {
                        const tag = document.createElement("span");
                        tag.className = "tag";
                        tag.textContent = word;
                        tag.style.cursor = "pointer";

                        tag.addEventListener("click", () => {
                            chrome.tabs.sendMessage(tabs[0].id, {
                                action: "highlight",
                                keyword: word
                            });
                        });

                        container.appendChild(tag);
                    });

                } catch (err) {
                    document.getElementById("keywords").innerHTML =
                        "<p style='color:red;'>Error: " + err.message + "</p>";
                }

                // ⚠️ Keeping your sentiment logic but FIXING endpoint to match backend
                const sentimentUrl = "http://127.0.0.1:5000/sentiment";

                const sentimentRes = await fetch(sentimentUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: response.text })
                });

                const sentimentData = await sentimentRes.json();

                const box = document.getElementById("sentiment-box");
                const result = document.getElementById("sentiment-result");

                if (sentimentData.sentiment) {
                    box.style.display = "block";
                    result.textContent = sentimentData.sentiment;
                }

            }
        );
    });
});

// ================= ADDED FEATURES BELOW =================


// ---------- SUMMARIZATION ----------
document.getElementById("summarize").addEventListener("click", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "extract_text" },
            async (response) => {

                if (!response || !response.text) return;

                const res = await fetch("http://127.0.0.1:5000/summarize", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: response.text })
                });

                const data = await res.json();

                const box = document.getElementById("summary-box");
                const text = document.getElementById("summary-text");

                box.style.display = "block";
                text.textContent = data.summary;
            }
        );
    });
});


// ---------- FAKE NEWS DETECTION ----------
document.getElementById("fakeNews").addEventListener("click", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "extract_text" },
            async (response) => {

                if (!response || !response.text) return;

                const res = await fetch("http://127.0.0.1:5000/fake-news", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: response.text })
                });

                const data = await res.json();

                const box = document.getElementById("fake-box");
                const result = document.getElementById("fake-result");

                box.style.display = "block";
                result.textContent = data.label || JSON.stringify(data);
            }
        );
    });
});


// ---------- SENTIMENT (BUTTON-BASED TRIGGER) ----------
document.getElementById("sentiment").addEventListener("click", () => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            { action: "extract_text" },
            async (response) => {

                if (!response || !response.text) return;

                const res = await fetch("http://127.0.0.1:5000/sentiment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: response.text })
                });

                const data = await res.json();

                const box = document.getElementById("sentiment-box");
                const result = document.getElementById("sentiment-result");

                box.style.display = "block";
                result.textContent = data.sentiment;
            }
        );
    });
});

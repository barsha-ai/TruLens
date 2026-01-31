const style = document.createElement("style");
style.textContent = `
    mark.keyword-highlight {
        background: yellow;
        padding: 2px 4px;
        border-radius: 4px;
    }
`;
document.head.appendChild(style);


function highlightKeyword(keyword) {
    if (!keyword) return;

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
        textNodes.push(node);
    }

    const regex = new RegExp(`(${keyword})`, "gi");

    textNodes.forEach(textNode => {
        if (regex.test(textNode.nodeValue)) {
            const span = document.createElement("span");

            span.innerHTML = textNode.nodeValue.replace(
                regex,
                `<mark class="keyword-highlight">$1</mark>`
            );

            if (textNode.parentNode) {
                textNode.parentNode.replaceChild(span, textNode);
            }
        }
    });

    const first = document.querySelector("mark.keyword-highlight");
    if (first) {
        first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "extract_text") {

        try {
            const article = new Readability(document.cloneNode(true)).parse();

            const text = article?.textContent || document.body.innerText;

            sendResponse({ text });

        } catch (err) {
            console.error("Readability failed:", err);
            sendResponse({ text: document.body.innerText });
        }

        return true; 
    }


    if (request.action === "highlight") {
        highlightKeyword(request.keyword);
    }
});

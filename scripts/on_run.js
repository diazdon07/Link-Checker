const site = window.location.hostname;
const path = window.location.pathname;
const sitePath = path.split('/')[1] || "";

if (site.includes("webbuilder.localsearch.com.au")) {

    switch (sitePath) {
        case "site": // duda preview link
            linkChecker(); // No need for await if you don't need to wait
            break;

        case "": // duda actual live website
            break;

        case "home": // duda actual builder
            break;

        default:
            break;
    }
}

async function linkChecker() {
    const links = Array.from(document.querySelectorAll('a[href*="/site/"]'))
        .filter(link => !link.href.startsWith("tel:") && !link.href.startsWith("mailto:"));

    const results = [];
    const batchSize = 10;
    const delayBetweenBatches = 100;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function processBatch(batchLinks) {
        const fetchPromises = batchLinks.map(async (link) => {
            let url = link.href.split('/').pop();
            let baseUrl = url.split('?')[0];

            if (!baseUrl) {
                baseUrl = 'home';
            }

            try {
                const response = await fetch(link.href);
                if (response.ok) {
                    if (link.href.includes('#')) {
                        const hashPart = url.split('#')[1];
                        results.push(`${link.href} - Anchor link detected`);

                        const text = await response.text();
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(text, 'text/html');

                        // Fix here: Loop through anchor elements and check if the data-anchor matches
                        const anchors = Array.from(doc.querySelectorAll('[data-anchor]'));
                        const matchingAnchor = anchors.find(anchor => anchor.getAttribute('data-anchor') === hashPart);

                        const anchorid = Array.from(doc.querySelectorAll('[id]'));
                        const matchingid = anchorid.find(anchorid => anchorid.id === hashPart);

                        if (matchingAnchor || matchingid) {
                            results.push(`${link.href} - Good Link`);
                            styleBrokenLink(link, `⚓ ${baseUrl}#${hashPart}`, "orange");
                        } else {
                            results.push(`${link.href} - Broken (Status: ${response.status})`);
                            styleBrokenLink(link, "⚓ Broken Anchor Link", "red");
                        }
                    } else {
                        results.push(`${link.href} - Good Link`);
                        if (baseUrl === "home") {
                            styleBrokenLink(link, `🏠 ${baseUrl}`, "dodgerblue");
                        } else {
                            styleBrokenLink(link, `${baseUrl}`, "green");
                        }
                    }
                } else {
                    results.push(`${link.href} - Broken (Status: ${response.status})`);
                    styleBrokenLink(link, "⛓️‍💥 Broken Link", "red");
                }
            } catch (error) {
                results.push(`${link.href} - Broken (Error: ${error.message})`);
                styleBrokenLink(link, "⛓️‍💥 Broken Link", "red");
            }
        });

        await Promise.all(fetchPromises);
    }

    for (let i = 0; i < links.length; i += batchSize) {
        const batchLinks = links.slice(i, i + batchSize);
        await processBatch(batchLinks);
        await delay(delayBetweenBatches);
    }
}

function styleBrokenLink(link, content, color) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('link-bar');
    divContainer.textContent = content;
    divContainer.style.backgroundColor = color;
    link.appendChild(divContainer);
    handlerFirst();
}

function handlerFirst(){
    chrome.storage.sync.get("keyState", (data) => {
        toggleDisplay(data.keyState === "show");
    });
    
    chrome.runtime.onMessage.addListener((message) => {
        toggleDisplay(message.action === "show");
    });
}

function toggleDisplay(show) {
    const targetBlank = document.querySelectorAll('a[target="_blank"]'); //targeting a tag creating new tab
    const dmButtonLink = document.querySelectorAll('.dmButtonLink'); 
    const linkElements = document.getElementsByClassName("link-bar");
    const graphicWidgetLinks = document.querySelectorAll('.graphicWidget a');

    graphicWidgetLinks.forEach(link => {
        if (show) {
            link.style.display = 'flex';
            link.style.flexDirection = 'row';
            link.style.flexWrap = 'wrap';
            link.style.alignContent = 'center';
            link.style.justifyContent = 'center';
            link.style.alignItems = 'center';
        } else {
            link.style.display = '';
        }
    });

    targetBlank.forEach(target => {
        if (show) {
            target.style.border = "3px dashed red";  // Apply border if 'show' is true
        } else {
            target.style.border = "";  // Remove the border if 'show' is false
        }
    });

    dmButtonLink.forEach(dmButton => {
        if (show) {
            dmButton.classList.add('custom-adjustment');
        } else {
            dmButton.classList.remove('custom-adjustment');
        }
    });

    for (let element of linkElements) {
        element.style.display = show ? "block" : "none";
    }
}

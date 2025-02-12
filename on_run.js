const site = window.location.hostname;
const path = window.location.pathname;
const sitePath = path.split('/')[1] || "";

const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

function Create_Custom_Element(tag, attr_tag, attr_name, value) {
    const custom_element = document.createElement(tag);
    custom_element.setAttribute(attr_tag, attr_name);
    custom_element.innerHTML = value;
    document.body.append(custom_element);
}

// console.log(site);
// console.log(sitePath);

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
                        
                        styleBrokenLink(link, `⚓ ${baseUrl}#${hashPart}`, "orange");

                        // const text = await response.text();
                        // const parser = new DOMParser();
                        // const doc = parser.parseFromString(text, 'text/html');

                        // // Fix here: Loop through anchor elements and check if the data-anchor matches
                        // const anchors = Array.from(doc.querySelectorAll('[data-anchor]'));
                        // const matchingAnchor = anchors.find(anchor => anchor.getAttribute('data-anchor') === hashPart);

                        // if (matchingAnchor) {
                        //     results.push(`${link.href} - Good Link`);
                        //     styleBrokenLink(link, `⚓ ${baseUrl}#${hashPart}`, "orange");
                        // } else {
                        //     results.push(`${link.href} - Broken (Status: ${response.status})`);
                        //     styleBrokenLink(link, "⚓ Broken Anchor Link", "red");
                        // }
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
    chrome.storage.sync.get("toggleState", (data) => {
        toggleDisplay(data.toggleState);
    });
    
    chrome.runtime.onMessage.addListener((message) => {
        toggleDisplay(message.action === "show");
    });
}

function toggleDisplay(show) {
    const linkElements = document.getElementsByClassName("link-bar");
    for (let element of linkElements) {
        element.style.display = show ? "block" : "none";
    }
}

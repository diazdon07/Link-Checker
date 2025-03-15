if (site.includes("lsearch.lightning.force.com")) {
    switch (sitePath) {
        case "lightning": // salesforce website
            chrome.runtime.onMessage.addListener((message) => {
                if(message.action === "scoping"){
                    create_tab_display();
                }
            });
            break;
    }
}

function create_tab_display(){

            let questions = document.querySelectorAll('.questionsection');
            let answers = document.querySelectorAll('.answerSection');

            let qaArray = [];

            const labelsToMatch = [
                        "Business Name",
                        "Website Action",
                        "ABN",
                        "ACN",
                        "Address",
                        "How would you like your address shown on your website/profile?",
                        "Primary Business Phone Number",
                        "Secondary Business Phone Number",
                        "Business Email Address",
                        "Would you like your email address displayed on your website?",
                        "Additional Email Address/es",
                        "Trading Hours",
                        "Do you have any offers or deals you'd like showcased?",
                        "How would you like the deal or offers shown on your website?",
                        "Do you have any memberships, accreditations and/or licenses?",
                        "Please provide your existing website URL",
                        "Please provide the link to your Facebook page",
                        "Please provide the link to your Instagram",
                        "Please provide the link to your Localsearch Business Profile",
                        "Please provide the link to your Google Business Profile",
                        "Please provide the link to your YouTube channel",
                        "Please provide the link to your TikTok profile",
                        "Please provide any other social links",
                        "Website image source",
                        "Website stock image guide",
                        "Would you like any brands or companies highlighted on every page?",
                        "Do you have your frequently asked questions ready?",
                        "Please provide your frequently asked questions",
                        "Do you have testimonials?",
                        "Would you like the testimonials shown on your Website to be automatically updated?",
                        "Where would you like us to get the testimonials from?",
                        "Use Google as live testimonial source",
                        "Use Localsearch as live testimonial source",
                        "Use Facebook as live testimonial source",
                        "Use TripAdvisor as live testimonial source",
                        "Do you want to choose any specific stock images for your site?",
                        "Are there multiple locations?",
                        "If there are multiple location pages, do all locations offer the same services, products & facilities?",
                        "If there are multiple locations please advise of any differences in contact details",
                        "If there are multiple location pages, how would you like your address shown on the location pages?",
                        "Notes for the Developer",
                        "301 Redirects",
                        "Primary Accent Colour Hex Code",
                        "Secondary Accent Colour Hex Code",
                        "Tertiary Accent Colour Hex Code",
                        "Website Theme",
                        "Is the client having dynamic pages?",
                        "If a CSV is not being provided prior to build please list one product details below",
                        "What payment options do you offer?",
                        "Does the client want prices shown on their catalogue store?",
                        "Is the client having Localsearch Chat?",
                        "Email for chat",
                        "Display name for chat",
                        "Collect contact info: Name",
                        "Collect contact info: Phone Number",
                        "Collect contact info: Email",
                        "Is the client having Localsearch Bookings?",
                        "Bookings",
                        "Number of booking users needed",
                        "Booking Primary Users Full Name",
                        "Bookings Primary Users Email",
                        "Booking Primary Users Hours",
                        "Number of booking types",
                        "Is the client having dynamic pages?",
                        "What locations do you deliver to?",
                        "Do you offer in-store pick up?",
                        "What shipping options do you offer?",
                        "What payment options do you offer?",
                        "Do you want a date and time calendar shown at checkout for pickup or delivery shipping options?",
                        "If a CSV is not being provided prior to build please list one product details below"
            ];

            function querryPush(label, data) {
                qaArray.push([label, data.replace(/"/g, '""')]);
            }
            // Collect question-answer pairs
            questions.forEach((question, index) => {
                let label = question.innerText.trim();
                let data = answers[index]?.innerHTML.trim() || "No answer provided";
                // let date = new Date();

                if (labelsToMatch.includes(label) || label.toLowerCase().includes("item")) {
                    querryPush(label, data);
                }
            });
    
            function create_tab_display(data){ 
                const newTab = window.open('', '_blank');
  
                // Create HTML content (table) in the new tab
                let tableHTML = `
                  <html>
                    <head>
                      <title>Query Results</title>
                      <style>
                        table { width: 100%; border-collapse: collapse; }
                        table, th, td { border: 1px solid black; }
                        th, td { padding: 8px; text-align: left; }
                      </style>
                    </head>
                    <body>
                      <h1>Query Results</h1>
                      <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${data.map(row => `
                            <tr>
                              <td>${row[0]}</td>
                              <td>${row[1]}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </body>
                  </html>
                `;
                
                // Write the table HTML into the new tab
                newTab.document.write(tableHTML);
                newTab.document.close();
            }
            create_tab_display(qaArray);
}

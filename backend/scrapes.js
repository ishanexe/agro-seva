const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012";

async function scrapeSchemes() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let schemes = [];

        $("table tr").each((index, element) => {
            const columns = $(element).find("td");
            if (columns.length >= 2) {
                let schemeName = $(columns[1]).text().trim();
                let schemePurpose = $(columns[2]).text().trim();

                if (schemeName && schemePurpose) {
                    schemes.push({
                        title: schemeName,
                        description: schemePurpose
                    });
                }
            }
        });

        // Save data to JSON file
        fs.writeFileSync("schemes.json", JSON.stringify(schemes, null, 2));
        console.log("Schemes saved to schemes.json ✅");

    } catch (error) {
        console.error("Error scraping:", error.message);
    }
}
    
// Run the scraper
scrapeSchemes();

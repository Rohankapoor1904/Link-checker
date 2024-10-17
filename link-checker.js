const fs = require('fs');
const megaLinkChecker = require('mega-link-checker');

// Read the file 'data.txt' containing links (one per line)
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Split the file data into an array of links, assuming each link is on a new line
    const links = data.split('\n').filter(link => link.trim() !== '');

    // Array to hold working links
    const workingLinks = [];

    // Check each link using megaLinkChecker
    const checkLinks = async () => {
        let count = 1; // To number the working links
        for (let link of links) {
            try {
                const isValid = await megaLinkChecker(link);
                if (isValid) {
                    workingLinks.push(`${count}. ${link}`);
                    count++;
                }
            } catch (error) {
                console.error(`Error checking link ${link}:`, error);
            }
        }

        // Print only the working links
        console.log('Working links:\n' + workingLinks.join('\n'));
    };

    // Execute the link checker
    checkLinks();
});

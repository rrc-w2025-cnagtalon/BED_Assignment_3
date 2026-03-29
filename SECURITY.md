## Helmet.js Configuiration

### Configuration Applied

\`\`\`contentSecurityPolicy: false, crossOriginEmbedderPolicy: false, hsts: { maxAge: 31536000, includeSubDomains: true, preload: true, }, hidePoweredBy: true,
   noSniff: true, frameguard: { action: "deny" },```

### Justification

1. **contentSecurityPolicy: false** - Disabled because this API returns only JSON data and does not serve HTML content. CSP is designed to prevent XSS in browsers rendering HTML
2. **hsts** - cofing sets a maxAge of 1 year. Once teh user connects securely, their browser will refuse to talk to my API over insecure http for the maxAge length.
3. **hidePoweredBy: true** - Removes the x-powered-By header. This is a security best practice to make it harder for attackers to identify that the server is running Express and target version-specific vulnerabilities.
4. **noSniff: true** - Sets the x-content-type header to no sniff. This prevents the browser from "sniffing" a response away from the declared content-type, which mitigates attacks where a malicious file is disguised as JSON.
5. **frameguard: { action: "deny" }** - Mitigates clickjacking attacks by ensuring the API response cannot be loaded inside iframe on other websites.

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/


## CORS Configuration

### Configuration Applied

const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        };
    }

    // Strict origins in production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};

### Justification 

1. **Environment-Based Origin Logic** - The configuration uses the NODE_ENV  variable to differentiate between development and production.
2. **Origin Whitelisting** - In production mode, the API uses a strict whitelist parsed from the ALLOWED_ORIGINS environment variable. This follows the Principle of Least Privilege by ensuring only authorized frontends can access the data.
3. **Method Restriction** - Explicitly defining the methods restricts the HTTP verbs an external site can use. This reduces the attack surface by blocking unnecessary or high-risk methods.
4. **allowedHeaders** - Restricts the headers that can be used during the request to Content-Type and Authorization, preventing attackers from using custom headers to bypass security controls.

### Sources

1. MDN Web Docs: Cross-Origin Resource Sharing (CORS) - [https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
2. OWASP CORS Origin Validation - [https://cheatsheetseries.owasp.org/cheatsheets/Cross-Origin_Resource_Sharing_Cheat_Sheet.html](https://www.google.com/search?q=https://cheatsheetseries.owasp.org/cheatsheets/Cross-Origin_Resource_Sharing_Cheat_Sheet.html)

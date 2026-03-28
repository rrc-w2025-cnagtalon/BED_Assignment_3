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

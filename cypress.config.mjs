import { defineConfig } from 'cypress';

export default defineConfig({
    projectId: '[redacted]',
    e2e: {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        setupNodeEvents(_on, _config) {
            // implement node event listeners here
        },
        defaultCommandTimeout: 20000,
        requestTimeout: 20000,
        chromeWebSecurity: false,
        blockHosts:
        [
            'r.lr-in-prod.com',
            'd.adroll.com',
            'app.leadsrx.com',
            'cm.teads.tv',
            'ct.pinterest.com',
            'p.clarity.ms',
            'smetrics.mgmresorts.com',
            'dpm.demdex.net',
            'mgm.tt.omtrdc.net',
            'static.mgmresortc.com',
            'app.launchdarkly.com',
            'events.launchdarkly.com',
            'lasteventf-tm.everesttech.net',
            'preprod-static-mgmresorts.devtest.vegas',
            'capi.mgmresorts.com',
            'session-replay.browser-intake-us5-datadoghq.com',
        ]
    },
});

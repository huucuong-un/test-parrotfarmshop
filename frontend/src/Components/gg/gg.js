import React, { Component } from 'react';

class GoogleTranslate extends Component {
    scriptLoaded = false;

    componentDidMount() {
        if (!this.scriptLoaded) {
            this.loadGoogleTranslateScript();
        } else {
            this.initializeTranslateWidget();
        }
    }

    loadGoogleTranslateScript = () => {
        const scriptSrc = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

        // Check if a script with the same source URL already exists
        if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptSrc;
            script.async = true;
            script.defer = true;
            script.onload = this.initializeTranslateWidget;
            document.head.appendChild(script);
            this.scriptLoaded = true; // Mark the script as loaded
        }
    };

    initializeTranslateWidget = () => {
        // Ensure that the widget is initialized only when the script is fully loaded
        if (window.google && window.google.translate) {
            try {
                const widget = new window.google.translate.TranslateElement(
                    { pageLanguage: 'en' },
                    'google_translate_element',
                );
                widget.showBanner(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    handleTranslateClick = () => {
        if (!this.scriptLoaded) {
            this.loadGoogleTranslateScript();
        } else {
            this.initializeTranslateWidget();
        }
    };

    render() {
        return (
            <div>
                <div id="google_translate_element"></div>
                <button onClick={this.handleTranslateClick}>Translate</button>
            </div>
        );
    }
}

export default GoogleTranslate;

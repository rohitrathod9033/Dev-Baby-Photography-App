import React from 'react';
import { Platform } from 'react-native';
// Standard React Native for Web doesn't have a Head component like Next.js
// But we can manipulate the document in a web-only component or useEffect.
// However, creating a reusable component is cleaner.

export const WebSEO = ({ title, description }: { title: string; description: string }) => {
    if (Platform.OS !== 'web') return null;

    React.useEffect(() => {
        if (title) document.title = title;

        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', description);
        }
    }, [title, description]);

    return null;
};

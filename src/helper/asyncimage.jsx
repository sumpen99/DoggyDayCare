import React from 'react';
const FALLBACK_URL = "/src/assets/notfound.png";
export default function AsyncImage({src}){

    const [loadedSrc, setLoadedSrc] = React.useState(null);
    React.useEffect(() => {
        setLoadedSrc(null);
        if (src) {
            const handleLoad = () => {
                setLoadedSrc(src);
            };
            const fallBack = () =>{
                setLoadedSrc(FALLBACK_URL);
            }
            const image = new Image();
            image.addEventListener('load', handleLoad);
            image.addEventListener('error', fallBack)
            
            image.src = src;
            
            return () => {
                image.removeEventListener('error', fallBack);
                image.removeEventListener('load', handleLoad);
            };
        }
    }, [src]);
    if (loadedSrc === src || loadedSrc === FALLBACK_URL) {
        return (
            <img {...{src:loadedSrc}}/>
            //<img {...props}/>
        );
    }
    return null;
};
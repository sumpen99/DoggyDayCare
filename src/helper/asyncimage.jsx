import React from 'react';
const FALLBACK_URL = "/src/assets/notfound.png";
export default function AsyncImage(props){

    const [loadedSrc, setLoadedSrc] = React.useState(null);
    React.useEffect(() => {
        setLoadedSrc(null);
        if (props.src) {
            const handleLoad = () => {
                setLoadedSrc(props.src);
            };
            const fallBack = () =>{
                setLoadedSrc(FALLBACK_URL);
            }
            const image = new Image();
            image.addEventListener('load', handleLoad);
            image.addEventListener('error', fallBack)
            
            image.src = props.src;
            
            return () => {
                image.removeEventListener('error', handleLoad);
                image.removeEventListener('load', handleLoad);
            };
        }
    }, [props.src]);
    if (loadedSrc === props.src || loadedSrc === FALLBACK_URL) {
        return (
            <img {...{src:loadedSrc}}/>
            //<img {...props}/>
        );
    }
    return null;
};
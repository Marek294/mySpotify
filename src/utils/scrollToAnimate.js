function scrollTo(params) {
    return new Promise((resolve, reject) => {
        const {
            element,
            to,
            duration,
            scrollDirection
        } = params;
    
        var start = element[scrollDirection],
            change = to - start,
            increment = 1000 / 50;
    
        var animateScroll = function(elapsedTime) {       
            elapsedTime += increment;
            var position = (elapsedTime*change)/duration;             
            element[scrollDirection] = position; 
            if (elapsedTime < duration) {
                window.requestAnimationFrame(animateScroll.bind(null, elapsedTime));
            }
            if (elapsedTime >= duration) resolve(element);
        };
    
        window.requestAnimationFrame(animateScroll.bind(null, 0));
    })
}

export default scrollTo;
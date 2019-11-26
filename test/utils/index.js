exports.extractCookies = (res, key) =>{
    const setCookie = res.headers['set-cookie']
    if (!setCookie) { return false};
    
    const cookies = setCookie.map((item)=>{
        let cookie = item.split(";")[0].split('=');
        return {[cookie[0]]:cookie[1]}
    })

    if (key) {
        return cookies.find(element => {
            if (Object.keys(element)[0] === key) {
                
                return element;
            }
        });
        
    } else {
        return cookies;
    }
}
